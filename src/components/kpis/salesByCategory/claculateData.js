const calculateData = (orders, filter) => {
  const monthsText = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const getRandomColor = (category) => {
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
      hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = ((hash & 0x00FFFFFF) | 0x808080).toString(16).toUpperCase();
    return `#${color.slice(-6)}`;
  };

  let filteredOrders = [...orders];

  // Apply year filter if not "all"
  if (filter.year !== "all") {
    filteredOrders = filteredOrders.filter(
      (order) => new Date(order.orderDate).getFullYear().toString() === filter.year
    );
  }

  // Apply category filter if not "all"
  if (filter.category !== "all") {
    filteredOrders = filteredOrders.filter((order) =>
      order.items.some(
        (item) => item.category && item.category.toLowerCase() === filter.category.toLowerCase()
      )
    );
  }

  // Calculate total onSalePrice or price if onSalePrice is 0
  const categoryTotals = {};
  const monthTotals = Array.from({ length: 12 }, () => 0);
  const filteredItems = [];

  filteredOrders.forEach((order) => {
    const orderYear = new Date(order.orderDate).getFullYear();
    const orderMonth = new Date(order.orderDate).getMonth();

    order.items.forEach((item) => {
      if(item.category.toLowerCase()===filter.category.toLowerCase() || filter.category === "all"){
        const category = item.category || "Uncategorized";
        const totalPrice = item.priceOnSale > 0 ? item.priceOnSale : item.price;

        if (!categoryTotals[category]) {
          categoryTotals[category] = Array.from({ length: 12 }, () => 0);
        }

        categoryTotals[category][orderMonth] += totalPrice;
        monthTotals[orderMonth] += totalPrice;

        // Check if the item meets the filter criteria
        const meetsFilterCriteria =
          (filter.category === "all" || item.category.toLowerCase() === filter.category.toLowerCase()) &&
          (filter.year === "all" || orderYear.toString() === filter.year);

        if (meetsFilterCriteria) {
          filteredItems.push({
            itemId: item.productId,
            itemName: item.productName,
            itemCategory: item.category,
            itemPrice: totalPrice,
            itemQuantity: item.quantity,
            orderDate: order.orderDate,
          });
        }
      }
    });
  });

  const categories = Object.keys(categoryTotals);
  const categoryTotalsArray = categories.map((category) => ({
    label: category,
    data: categoryTotals[category],
    backgroundColor: getRandomColor(category),
  }));
  const monthsTextArray = monthsText.slice(0, monthTotals.length);

  const uniqueYears = [...new Set(orders.map(order => new Date(order.orderDate).getFullYear().toString()))].sort((a, b) => a - b);

  const barData = {
    labels: monthsTextArray,
    datasets: categoryTotalsArray,
  };

  const pieData = {
    labels: filter.category !== "all" ? [filter.category] : categories,
    datasets: [
      {
        data: filter.category !== "all" ? [categoryTotals[filter.category].reduce((a, b) => a + b, 0)] : categoryTotalsArray.map(category => category.data.reduce((a, b) => a + b, 0)),
        backgroundColor: categoryTotalsArray.map(category => category.backgroundColor),
      },
    ],
  };

  // Return the data including filtered items
  return { pieData, barData, uniqueYears, filteredItems };
};

export default calculateData;
