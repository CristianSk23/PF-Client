const orders = [
  {
    Id: 7,
    userId: 107,
    userName: "Emma Brown",
    items: [
      {
        productId: 2,
        productName: "Product B",
        price: 30.99,
        priceOnSale: 25.99,
        quantity: 2,
        category: "Laptops"
      },
      {
        productId: 4,
        productName: "Product D",
        price: 40.5,
        priceOnSale: 35.99,
        quantity: 1,
        category: "Tablets"
      },
    ],
    totalPrice: 87.97,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678902",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2023-05-21",
  },
  {
    Id: 27,
    userId: 107,
    userName: "Emma Brown",
    items: [
      {
        productId: 2,
        productName: "Product B",
        price: 30.99,
        priceOnSale: 25.99,
        quantity: 2,
        category: "Laptops"
      },
      {
        productId: 4,
        productName: "Product D",
        price: 40.5,
        priceOnSale: 35.99,
        quantity: 1,
        category: "Tablets"
      },
    ],
    totalPrice: 87.97,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678902",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2023-06-21",
  },
  {
    Id: 37,
    userId: 107,
    userName: "Emma Brown",
    items: [
      {
        productId: 2,
        productName: "Product B",
        price: 30.99,
        priceOnSale: 25.99,
        quantity: 2,
        category: "Laptops"
      },
      {
        productId: 4,
        productName: "Product D",
        price: 40.5,
        priceOnSale: 35.99,
        quantity: 1,
        category: "Smartwatches"
      },
    ],
    totalPrice: 87.97,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678902",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2023-06-21",
  },
  {
    Id: 47,
    userId: 107,
    userName: "Emma Brown",
    items: [
      {
        productId: 2,
        productName: "Product B",
        price: 30.99,
        priceOnSale: 25.99,
        quantity: 2,
        category: "TV"
      },
      {
        productId: 4,
        productName: "Product D",
        price: 40.5,
        priceOnSale: 35.99,
        quantity: 1,
        category: "TV"
      },
    ],
    totalPrice: 87.97,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678902",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2023-08-21",
  },
  {
    Id: 8,
    userId: 108,
    userName: "Olivia Davis",
    items: [
      {
        productId: 5,
        productName: "Product E",
        price: 45.99,
        priceOnSale: 40.99,
        quantity: 1,
        category: "Laptops"
      },
    ],
    totalPrice: 40.99,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678903",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2023-05-22",
  },
  {
    Id: 18,
    userId: 108,
    userName: "Olivia Davis",
    items: [
      {
        productId: 5,
        productName: "Product E",
        price: 45.99,
        priceOnSale: 40.99,
        quantity: 1,
        category: "Laptops"
      },
    ],
    totalPrice: 40.99,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678903",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2023-02-22",
  },
  {
    Id: 9,
    userId: 109,
    userName: "Ava Miller",
    items: [
      {
        productId: 6,
        productName: "Product F",
        price: 50.99,
        priceOnSale: 45.99,
        quantity: 2,
        category: "Smartwatches"
      },
    ],
    totalPrice: 91.98,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678904",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2023-05-23",
  },
  {
    Id: 10,
    userId: 110,
    userName: "Isabella Wilson",
    items: [
      {
        productId: 7,
        productName: "Product G",
        price: 55.99,
        priceOnSale: 50.99,
        quantity: 1,
        category: "TV"
      },
    ],
    totalPrice: 50.99,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678905",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2023-06-24",
  },
  {
    Id: 101,
    userId: 110,
    userName: "Isabella Wilson",
    items: [
      {
        productId: 7,
        productName: "Product G",
        price: 55.99,
        priceOnSale: 50.99,
        quantity: 1,
        category: "TV"
      },
    ],
    totalPrice: 50.99,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678905",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2023-02-24",
  },
  {
    Id: 11,
    userId: 111,
    userName: "Mia Moore",
    items: [
      {
        productId: 8,
        productName: "Product H",
        price: 60.99,
        priceOnSale: 55.99,
        quantity: 2,
        category: "Speakers"
      },
    ],
    totalPrice: 111.98,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678906",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2023-05-22git add .",
  },
  {
    Id: 20,
    userId: 111,
    userName: "Mia Moore",
    items: [
      {
        productId: 8,
        productName: "Product H",
        price: 60.99,
        priceOnSale: 55.99,
        quantity: 2,
        category: "Speakers"
      },
    ],
    totalPrice: 111.98,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678906",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2023-03-23",
  },
  {
    Id: 12,
    userId: 112,
    userName: "Harper Taylor",
    items: [
      {
        productId: 9,
        productName: "Product I",
        price: 65.99,
        priceOnSale: 60.99,
        quantity: 1,
        category: "Smartphones"
      },
    ],
    totalPrice: 60.99,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678907",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2023-12-24",
  },
  {
    Id: 19,
    userId: 112,
    userName: "Harper Taylor",
    items: [
      {
        productId: 9,
        productName: "Product I",
        price: 65.99,
        priceOnSale: 60.99,
        quantity: 1,
        category: "Smartphones"
      },
    ],
    totalPrice: 60.99,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678907",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2023-01-25",
  },
  {
    Id: 19,
    userId: 112,
    userName: "Harper Taylor",
    items: [
      {
        productId: 9,
        productName: "Product I",
        price: 65.99,
        priceOnSale: 60.99,
        quantity: 1,
        category: "Smartphones"
      },
    ],
    totalPrice: 60.99,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678907",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2022-01-26",
  },
  {
    Id: 19,
    userId: 112,
    userName: "Harper Taylor",
    items: [
      {
        productId: 9,
        productName: "Product I",
        price: 65.99,
        priceOnSale: 60.99,
        quantity: 1,
        category: "Smartphones"
      },
    ],
    totalPrice: 60.99,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678907",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2021-01-26",
  },
  {
    Id: 19,
    userId: 112,
    userName: "Harper Taylor",
    items: [
      {
        productId: 9,
        productName: "Product I",
        price: 65.99,
        priceOnSale: 60.99,
        quantity: 1,
        category: "Tablets"
      },
    ],
    totalPrice: 60.99,
    deliveryStatus: "Delivered",
    mercadopagoTransactionId: "MP678907",
    mercadopagoTransactionStatus: "Approved",
    orderDate: "2021-01-25",
  }
  ];
  export default orders;
  