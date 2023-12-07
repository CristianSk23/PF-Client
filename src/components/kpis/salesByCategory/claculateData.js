const calculateData = (orders, filter) => {
    const monthsText = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
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
          (item) => item.category && item.category === filter.category
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
        const category = item.category || "Uncategorized";
        const totalPrice = item.priceOnSale > 0 ? item.priceOnSale : item.price;
  
        if (!categoryTotals[category]) {
          categoryTotals[category] = 0;
        }
  
        categoryTotals[category] += totalPrice;
        monthTotals[orderMonth] += totalPrice;
  
        // Check if the item meets the filter criteria
        const meetsFilterCriteria =
          (filter.category === "all" || item.category === filter.category) &&
          (filter.year === "all" || orderYear.toString() === filter.year);
  
        if (meetsFilterCriteria) {
          filteredItems.push({
            itemId: item.productId,
            itemName: item.productName,
            itemPrice: totalPrice,
            itemQuantity: item.quantity,
            orderDate: order.orderDate,
          });
        }
      });
    });
  
    const categories = Object.keys(categoryTotals);
    const categoryTotalsArray = categories.map((category) => categoryTotals[category]);
    const monthsTextArray = monthsText.slice(0, monthTotals.length);
  
    const uniqueYears = [...new Set(orders.map(order => new Date(order.orderDate).getFullYear().toString()))];
  
    const barData = {
      labels: monthsTextArray,
      datasets: [
        {
          label: 'Sales',
          data: monthTotals,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };
  
    const pieData = {
      labels: filter.category !== "all" ? [filter.category] : categories,
      datasets: [
        {
          data: filter.category !== "all" ? [categoryTotals[filter.category] || 0] : categoryTotalsArray,
        },
      ],
    };
  
    // Return the data including filtered items
    return { pieData, barData, uniqueYears, filteredItems };
  };
  
  export default calculateData;
  