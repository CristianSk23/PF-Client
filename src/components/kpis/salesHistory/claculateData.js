const calculateData = (orders, filters) => {
  const salesByYear = {};
  const salesByMonth = {};
  const salesByDay = {};
  const itemsData = [];
  const yearsSet = new Set(); 
  const monthsText = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];


  orders.forEach((order) => {
    const orderYear = new Date(order.orderDate).getFullYear().toString();
    const orderMonth = new Date(order.orderDate).getMonth()+1;
    const monthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(order.orderDate));
    const orderDay = new Date(order.orderDate).toISOString().split("T")[0];
    // Check if the order matches the filter conditions for year and month
    const isWithinMonthRange = filters.month === "all" || orderMonth === (parseInt(filters.month)+1);
    const isWithinYear = filters.year === "all" || filters.year === orderYear;

    yearsSet.add(orderYear);

    if (isWithinYear) {
      if (!salesByYear[orderYear]) {
        salesByYear[orderYear] = 0;
      }

      if (isWithinMonthRange) {
        if (!salesByMonth[monthName]) {
          salesByMonth[monthName] = 0;
        }

        if (!salesByDay[orderDay]) {
          salesByDay[orderDay] = 0;
        }
        let itemsCart = JSON.parse(order.itemsCart);
        itemsCart.forEach((item) => {
          const totalPrice = item.priceOnSale > 0 ? item.priceOnSale*item.quantityProd : item.price*item.quantityProd;
          salesByYear[orderYear] += totalPrice;
          salesByMonth[monthName] += totalPrice;
          salesByDay[orderDay] += totalPrice;

          // Check if the order matches the filter conditions
          itemsData.push({
            Id: item.id,
            Year: orderYear,
            Month: monthName,
            Day: orderDay,
            Category: item.category || "Uncategorized",
            ProductName: item.nameProd,
            Quantity: item.quantityProd,
            UnitPrice: item.priceOnSale > 0 ? item.priceOnSale.toFixed(2) : item.price.toFixed(2),
            Total: totalPrice.toFixed(2),
          });
        });
      }
    }
  });

  const years = Array.from(yearsSet).sort();
  const yearsArray = Object.keys(salesByYear).sort();
  const totalSalesArray = yearsArray.map((year) => salesByYear[year]);
  const totalSalesByMonthArray = monthsText.map((month) => salesByMonth[month]);
  const daysArray = Object.keys(salesByDay).sort();
  const totalSalesByDayArray = daysArray.map((day) => salesByDay[day]);

  itemsData.sort((a, b) => {
    if (a.Year === b.Year) {
      if (a.Month === b.Month) {
        return daysArray.indexOf(a.Day) - daysArray.indexOf(b.Day);
      }
      return monthsText.indexOf(a.Month) - monthsText.indexOf(b.Month);
    }
    return yearsArray.indexOf(a.Year) - yearsArray.indexOf(b.Year);
  });


  const yearBarData = {
    labels: yearsArray,
    datasets: [
      {
        label: 'Years',
        data: totalSalesArray,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  const monthBarData = {
    labels: monthsText,
    datasets: [
      {
        label: 'Month',
        data: totalSalesByMonthArray,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: daysArray,
    datasets: [
      {
        label: 'Day',
        data: totalSalesByDayArray,
        fill: true,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return {
    yearBarData,
    monthBarData,
    lineData,
    itemsData,
    years   
  };
};

export default calculateData;
