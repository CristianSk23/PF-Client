const adminDataCalcs =(orders, filter)=>{
    if (orders.length == 0) return 0;

    console.log('orders');
    console.log(orders);
    let filteredOrders = orders;

    // Filter by year if specified
    if (filter.year !== 'all') {
        filteredOrders = filteredOrders.filter(order => {
            let orderDate = new Date(order.orderDate);
            return orderDate.getFullYear() === filter.year;
        });
    }
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // Filter by month if specified
    if (filter.month !== 'all') {
        // Convert month from short text format to a number
        let monthNumber = monthNames.indexOf(filter.month);
        filteredOrders = filteredOrders.filter(order => {
            let orderDate = new Date(order.orderDate);
            return orderDate.getMonth() === monthNumber;
        });
    }

// Best 5 buyers
    let userTotals = filteredOrders.map(user => {
        let items = JSON.parse(user.itemsCart);
        let total = items.reduce((acc, item) => {
            let price = item.priceOnSale !== null ? item.priceOnSale : item.price;
            return acc + price * item.quantityProd;
        }, 0);
        return { userName: user.userName, total: total };
    });

    userTotals.sort((a, b) => b.total - a.total);
    let topUsers = userTotals.slice(0, 5);
    let userNames = topUsers.map(user => user.userName);
    let userTotalsAmounts = topUsers.map(user => user.total);

//---------------------------------------------------------------------------------------


// Most selled Products based on amounts
    let productTotals = {};
    filteredOrders.forEach(user => {
        let items = JSON.parse(user.itemsCart);
        items.forEach(item => {
            let price = item.priceOnSale !== null ? item.priceOnSale : item.price;
            let total = price * item.quantityProd;
            if (productTotals[item.nameProd]) {
                productTotals[item.nameProd] += total;
            } else {
                productTotals[item.nameProd] = total;
            }
        });
    });

    let productTotalsArray = Object.keys(productTotals).map(nameProd => {
        return { nameProd: nameProd, total: productTotals[nameProd] };
    });

    productTotalsArray.sort((a, b) => b.total - a.total);
    let topProducts = productTotalsArray.slice(0, 5);
    let productNames = topProducts.map(product => product.nameProd);
    let productTotalsAmounts = topProducts.map(product => product.total);

//---------------------------------------------------------------------------------------


// Most quantity product selled
    let productQuantities = {};
    filteredOrders.forEach(user => {
        let items = JSON.parse(user.itemsCart);
        items.forEach(item => {
            let quantity = item.quantityProd;
            if (productQuantities[item.nameProd]) {
                productQuantities[item.nameProd] += quantity;
            } else {
                productQuantities[item.nameProd] = quantity;
            }
        });
    });

    let productQuantitiesArray = Object.keys(productQuantities).map(nameProd => {
        return { nameProd: nameProd, quantity: productQuantities[nameProd] };
    });

    productQuantitiesArray.sort((a, b) => b.quantity - a.quantity);
    let topQuantityProducts = productQuantitiesArray.slice(0, 5);
    let productQuantityNames = topQuantityProducts.map(product => product.nameProd);
    let prodQuantities = topQuantityProducts.map(product => product.quantity);


//---------------------------------------------------------------------------------------



// Most sold category and best month based on amounts
    let categoryTotals = {};
    let salesByMonth = {};

    filteredOrders.forEach(user => {
        let items = JSON.parse(user.itemsCart);

        items.forEach(item => {
            let price = item.priceOnSale !== null ? item.priceOnSale : item.price;
            let total = price * item.quantityProd;

            // Calculate total sales by category
            if (!categoryTotals[item.category]) {
                categoryTotals[item.category] = 0;
            }
            categoryTotals[item.category] += total;

            // Calculate total sales by month
            let orderMonth = new Date(user.orderDate).getMonth();
            if (!salesByMonth[orderMonth]) {
                salesByMonth[orderMonth] = 0;
            }
            salesByMonth[orderMonth] += total;
        });
    });

    // Find the most sold category based on amounts
    
    let mostSoldCategory = Object.keys(categoryTotals)?.reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b);
    mostSoldCategory = { name: mostSoldCategory, amount: categoryTotals[mostSoldCategory] };

    // Find the best month based on amounts
    let bestMonth = Object.keys(salesByMonth).reduce((a, b) => salesByMonth[a] > salesByMonth[b] ? a : b);
    bestMonth = { name: monthNames[bestMonth], amount: salesByMonth[bestMonth] };
//----------------------------------------------------------------------------------------------------------------------------


// Average orders value
    let totalRevenue = 0;
    let numberOfOrders = 0;

    filteredOrders.forEach(user => {
        let items = JSON.parse(user.itemsCart);
        items.forEach(item => {
            let price = item.priceOnSale !== null ? item.priceOnSale : item.price;
            let total = price * item.quantityProd;

            totalRevenue += total;
        });

        numberOfOrders++;
    });

    let averageOrderValue = totalRevenue / numberOfOrders;
// -------------------------------------------------------------------------------------------------------------------------------
    // Extract an array of unique years from orders
    const orderYears = [...new Set(orders.map(order => new Date(order.orderDate).getFullYear()))].sort((a, b) => a - b);
    console.log('orderYears');
    console.log(orderYears);

    return {topUsers, topProducts, topQuantityProducts, mostSoldCategory, bestMonth, averageOrderValue, orderYears, monthNames}

};

export default adminDataCalcs;