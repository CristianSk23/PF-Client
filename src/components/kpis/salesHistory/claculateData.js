const calculateData = (orders, filters) => {
  const salesByYear = {};
  const salesByMonth = {};
  const salesByDay = {};
  const itemsData = [];
  const yearsSet = new Set(); // Using Set to store distinct years


  orders.forEach((order) => {
    const orderYear = new Date(order.orderDate).getFullYear().toString();
    const orderMonth = new Date(order.orderDate).getMonth();
    const monthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(order.orderDate));
    const orderDay = new Date(order.orderDate).toISOString().split("T")[0];
    // Check if the order matches the filter conditions for year and month
    const isWithinMonthRange = filters.month === "all" || orderMonth === parseInt(filters.month);
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

        order.items.forEach((item) => {
          const totalPrice = item.priceOnSale > 0 ? item.priceOnSale : item.price;
          salesByYear[orderYear] += totalPrice;
          salesByMonth[monthName] += totalPrice;
          salesByDay[orderDay] += totalPrice;

          // Check if the order matches the filter conditions
          itemsData.push({
            Id: item.productId,
            Year: orderYear,
            Month: monthName,
            Day: orderDay,
            Category: item.category || "Uncategorized",
            ProductName: item.productName,
            Quantity: item.quantity,
            UnitPrice: item.priceOnSale > 0 ? item.priceOnSale : item.price,
            Total: totalPrice,
          });
        });
      }
    }
  });

  const years = Array.from(yearsSet).sort();
  const yearsArray = Object.keys(salesByYear).sort();
  const totalSalesArray = yearsArray.map((year) => salesByYear[year]);
  const monthsArray = Object.keys(salesByMonth).sort((a, b) => new Date(Date.parse("01 " + a + " 2000")) - new Date(Date.parse("01 " + b + " 2000")));
  const daysArray = Object.keys(salesByDay).sort();
  const totalSalesByDayArray = daysArray.map((day) => salesByDay[day]);

  itemsData.sort((a, b) => {
    if (a.Year === b.Year) {
      if (a.Month === b.Month) {
        return daysArray.indexOf(a.Day) - daysArray.indexOf(b.Day);
      }
      return monthsArray.indexOf(a.Month) - monthsArray.indexOf(b.Month);
    }
    return yearsArray.indexOf(a.Year) - yearsArray.indexOf(b.Year);
  });

  const yearMonthArray = itemsData.map((item) => `${item.Year} - ${item.Month}`);
  const yearMonthTotalsArray = itemsData.reduce((totals, item) => {
    const key = `${item.Year} - ${item.Month}`;
    if (!totals[key]) {
      totals[key] = 0;
    }
    totals[key] += item.Total;
    return totals;
  }, {});

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
    labels: yearMonthArray,
    datasets: [
      {
        label: 'Year/Month',
        data: yearMonthTotalsArray,
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
