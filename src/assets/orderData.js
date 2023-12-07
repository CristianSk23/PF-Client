const orders = [
    {
      Id: 6,
      userId: 106,
      userName: "Sophia Johnson",
      items: [
        {
          productId: 1,
          productName: "Product A",
          price: 25.99,
          priceOnSale: 20.99,
          quantity: 1,
          category: "TV"
        },
        {
          productId: 3,
          productName: "Product C",
          price: 32.5,
          priceOnSale: 28.99,
          quantity: 2,
          category: "Smartphones"
        },
      ],
      totalPrice: 82.47,
      deliveryStatus: "Delivered",
      mercadopagoTransactionId: "MP678901",
      mercadopagoTransactionStatus: "Approved",
      orderDate: "2023-05-20",
    },
    {
      Id: 7,
      userId: 107,
      userName: "Ethan Smith",
      items: [
        {
          productId: 2,
          productName: "Product B",
          price: 19.99,
          priceOnSale: 15.99,
          quantity: 3,
          category: "TV"
        },
        {
          productId: 4,
          productName: "Product D",
          price: 45.0,
          priceOnSale: 39.99,
          quantity: 1,
          category: "Laptops"
        },
      ],
      totalPrice: 95.95,
      deliveryStatus: "Delivered",
      mercadopagoTransactionId: "MP456789",
      mercadopagoTransactionStatus: "Approved",
      orderDate: "2023-06-12",
    },
    {
      Id: 8,
      userId: 108,
      userName: "Olivia Davis",
      items: [
        {
          productId: 5,
          productName: "Product E",
          price: 39.0,
          priceOnSale: 34.99,
          quantity: 2,
          category: "Speakers"
        },
        {
          productId: 6,
          productName: "Product F",
          price: 50.0,
          priceOnSale: 45.99,
          quantity: 1,
          category: "Smartwatches"
        },
      ],
      totalPrice: 119.97,
      deliveryStatus: "Pending",
      mercadopagoTransactionId: "MP987654",
      mercadopagoTransactionStatus: "Pending",
      orderDate: "2023-07-08",
    },
    {
      Id: 9,
      userId: 109,
      userName: "Lucas Martinez",
      items: [
        {
          productId: 7,
          productName: "Product G",
          price: 29.99,
          priceOnSale: 24.99,
          quantity: 3,
          category: "TV"
        },
      ],
      totalPrice: 74.97,
      deliveryStatus: "Processing",
      mercadopagoTransactionId: "MP345678",
      mercadopagoTransactionStatus: "Processing",
      orderDate: "2023-08-25",
    },
    {
      Id: 10,
      userId: 110,
      userName: "Ava Rodriguez",
      items: [
        {
          productId: 8,
          productName: "Product H",
          price: 15.0,
          priceOnSale: 12.99,
          quantity: 4,
          category: "Tablets"
        },
        {
          productId: 9,
          productName: "Product I",
          price: 20.0,
          priceOnSale: 17.99,
          quantity: 2,
          category: "TV"
        },
      ],
      totalPrice: 98.94,
      deliveryStatus: "Delivered",
      mercadopagoTransactionId: "MP234567",
      mercadopagoTransactionStatus: "Approved",
      orderDate: "2023-09-14",
    },
    {
      Id: 11,
      userId: 111,
      userName: "Mia Johnson",
      items: [
        {
          productId: 10,
          productName: "Product J",
          price: 22.5,
          priceOnSale: 19.99,
          quantity: 2,
          category: "Speakers"
        },
        {
          productId: 11,
          productName: "Product K",
          price: 35.0,
          priceOnSale: 29.99,
          quantity: 1,
          category: "TV"
        },
      ],
      totalPrice: 77.48,
      deliveryStatus: "Delivered",
      mercadopagoTransactionId: "MP876543",
      mercadopagoTransactionStatus: "Approved",
      orderDate: "2023-10-02",
    },
    {
      Id: 12,
      userId: 112,
      userName: "Noah Davis",
      items: [
        {
          productId: 12,
          productName: "Product L",
          price: 18.0,
          priceOnSale: 15.99,
          quantity: 3,
          category: "Laptops"
        },
        {
          productId: 13,
          productName: "Product M",
          price: 42.0,
          priceOnSale: 38.99,
          quantity: 1,
          category: "TV"
        },
      ],
      totalPrice: 115.96,
      deliveryStatus: "Pending",
      mercadopagoTransactionId: "MP765432",
      mercadopagoTransactionStatus: "Pending",
      orderDate: "2023-11-18",
    },
    {
      Id: 13,
      userId: 113,
      userName: "Emma Martinez",
      items: [
        {
          productId: 14,
          productName: "Product N",
          price: 28.99,
          priceOnSale: 24.99,
          quantity: 2,
          category: "Smartphones"
        },
        {
          productId: 15,
          productName: "Product O",
          price: 55.0,
          priceOnSale: 49.99,
          quantity: 1,
          category: "Smartwatches"
        },
      ],
      totalPrice: 108.97,
      deliveryStatus: "Delivered",
      mercadopagoTransactionId: "MP654321",
      mercadopagoTransactionStatus: "Approved",
      orderDate: "2023-12-05",
    },
    {
      Id: 14,
      userId: 114,
      userName: "Logan Rodriguez",
      items: [
        {
          productId: 16,
          productName: "Product P",
          price: 12.0,
          priceOnSale: 9.99,
          quantity: 4,
          category: "Tablets"
        },
        {
          productId: 17,
          productName: "Product Q",
          price: 30.0,
          priceOnSale: 26.99,
          quantity: 1,
          category: "TV"
        },
      ],
      totalPrice: 116.94,
      deliveryStatus: "Processing",
      mercadopagoTransactionId: "MP543210",
      mercadopagoTransactionStatus: "Processing",
      orderDate: "2023-01-22",
    },
    {
      Id: 15,
      userId: 115,
      userName: "Avery Taylor",
      items: [
        {
          productId: 18,
          productName: "Product R",
          price: 21.0,
          priceOnSale: 17.99,
          quantity: 3,
          category: "Smartwatches"
        },
        {
          productId: 19,
          productName: "Product S",
          price: 48.0,
          priceOnSale: 44.99,
          quantity: 2,
          category: "TV"
        },
      ],
      totalPrice: 141.94,
      deliveryStatus: "Delivered",
      mercadopagoTransactionId: "MP432109",
      mercadopagoTransactionStatus: "Approved",
      orderDate: "2023-02-08",
    },
    {
      Id: 16,
      userId: 116,
      userName: "Jackson Wilson",
      items: [
        {
          productId: 20,
          productName: "Product T",
          price: 16.5,
          priceOnSale: 13.99,
          quantity: 2,
          category: "TV"
        },
        {
          productId: 21,
          productName: "Product U",
          price: 38.0,
          priceOnSale: 34.99,
          quantity: 1,
          category: "Tablets"
        },
      ],
      totalPrice: 103.47,
      deliveryStatus: "Delivered",
      mercadopagoTransactionId: "MP321098",
      mercadopagoTransactionStatus: "Approved",
      orderDate: "2023-03-28",
    },
    {
      Id: 17,
      userId: 117,
      userName: "Aria Anderson",
      items: [
        {
          productId: 22,
          productName: "Product V",
          price: 24.99,
          priceOnSale: 19.99,
          quantity: 3,
          category: "TV"
        },
      ],
      totalPrice: 84.96,
      deliveryStatus: "Pending",
      mercadopagoTransactionId: "MP210987",
      mercadopagoTransactionStatus: "Pending",
      orderDate: "2023-04-15",
    },
    {
      Id: 18,
      userId: 118,
      userName: "Carter White",
      items: [
        {
          productId: 23,
          productName: "Product W",
          price: 18.0,
          priceOnSale: 14.99,
          quantity: 1,
          category: "Smartphones"
        },
        {
          productId: 24,
          productName: "Product X",
          price: 42.0,
          priceOnSale: 38.99,
          quantity: 2,
          category: "Smartwatches"
        },
      ],
      totalPrice: 94.97,
      deliveryStatus: "Delivered",
      mercadopagoTransactionId: "MP109876",
      mercadopagoTransactionStatus: "Approved",
      orderDate: "2023-05-02",
    },
    {
      Id: 19,
      userId: 119,
      userName: "Ella Harris",
      items: [
        {
          productId: 25,
          productName: "Product Y",
          price: 32.5,
          priceOnSale: 28.99,
          quantity: 2,
          category: "TV"
        },
      ],
      totalPrice: 61.98,
      deliveryStatus: "Processing",
      mercadopagoTransactionId: "MP098765",
      mercadopagoTransactionStatus: "Processing",
      orderDate: "2023-06-19",
    },
    {
      Id: 20,
      userId: 120,
      userName: "Grayson Martin",
      items: [
        {
          productId: 26,
          productName: "Product Z",
          price: 29.99,
          priceOnSale: 24.99,
          quantity: 1,
          category: "TV"
        },
        {
          productId: 27,
          productName: "Product AA",
          price: 55.0,
          priceOnSale: 49.99,
          quantity: 1,
          category: "Laptops"
        },
      ],
      totalPrice: 84.98,
      deliveryStatus: "Delivered",
      mercadopagoTransactionId: "MP987654",
      mercadopagoTransactionStatus: "Approved",
      orderDate: "2023-07-06",
    },
    {
        Id: 21,
        userId: 121,
        userName: "Liam Thomas",
        items: [
          {
            productId: 1,
            productName: "Product A",
            price: 25.99,
            priceOnSale: 20.99,
            quantity: 2,
            category: "Laptops"
          },
          {
            productId: 3,
            productName: "Product C",
            price: 32.5,
            priceOnSale: 28.99,
            quantity: 1,
            category: "Laptops"
          },
        ],
        totalPrice: 109.47,
        deliveryStatus: "Delivered",
        mercadopagoTransactionId: "MP765432",
        mercadopagoTransactionStatus: "Approved",
        orderDate: "2023-08-10",
      },
      {
        Id: 22,
        userId: 122,
        userName: "Emma Walker",
        items: [
          {
            productId: 2,
            productName: "Product B",
            price: 19.99,
            priceOnSale: 15.99,
            quantity: 3,
            category: "Laptops"
          },
          {
            productId: 4,
            productName: "Product D",
            price: 45.0,
            priceOnSale: 39.99,
            quantity: 2,
            category: "Laptops"
          },
        ],
        totalPrice: 141.94,
        deliveryStatus: "Processing",
        mercadopagoTransactionId: "MP654321",
        mercadopagoTransactionStatus: "Processing",
        orderDate: "2023-09-25",
      },
      {
        Id: 23,
        userId: 123,
        userName: "Oliver Wright",
        items: [
          {
            productId: 5,
            productName: "Product E",
            price: 39.0,
            priceOnSale: 34.99,
            quantity: 1,
            category: "Laptops"
          },
          {
            productId: 6,
            productName: "Product F",
            price: 50.0,
            priceOnSale: 45.99,
            quantity: 3,
            category: "Speakers"
          },
        ],
        totalPrice: 181.94,
        deliveryStatus: "Delivered",
        mercadopagoTransactionId: "MP543210",
        mercadopagoTransactionStatus: "Approved",
        orderDate: "2023-10-12",
      },
      {
        Id: 24,
        userId: 124,
        userName: "Ava Lewis",
        items: [
          {
            productId: 7,
            productName: "Product G",
            price: 29.99,
            priceOnSale: 24.99,
            quantity: 2,
            category: "Speakers"
          },
        ],
        totalPrice: 74.97,
        deliveryStatus: "Delivered",
        mercadopagoTransactionId: "MP432109",
        mercadopagoTransactionStatus: "Approved",
        orderDate: "2022-11-01",
      },
      {
        Id: 25,
        userId: 125,
        userName: "Noah Hall",
        items: [
          {
            productId: 8,
            productName: "Product H",
            price: 15.0,
            priceOnSale: 12.99,
            quantity: 1,
            category: "Speakers"
          },
          {
            productId: 9,
            productName: "Product I",
            price: 20.0,
            priceOnSale: 17.99,
            quantity: 4,
            category: "Speakers"
          },
        ],
        totalPrice: 98.94,
        deliveryStatus: "Pending",
        mercadopagoTransactionId: "MP109876",
        mercadopagoTransactionStatus: "Pending",
        orderDate: "2023-12-18",
      },
      {
        Id: 26,
        userId: 126,
        userName: "Mia Turner",
        items: [
          {
            productId: 10,
            productName: "Product J",
            price: 22.5,
            priceOnSale: 19.99,
            quantity: 2,
            category: "Speakers"
          },
          {
            productId: 11,
            productName: "Product K",
            price: 35.0,
            priceOnSale: 29.99,
            quantity: 1,
            category: "Speakers"
          },
        ],
        totalPrice: 77.48,
        deliveryStatus: "Processing",
        mercadopagoTransactionId: "MP098765",
        mercadopagoTransactionStatus: "Processing",
        orderDate: "2024-01-03",
      },
      {
        Id: 27,
        userId: 127,
        userName: "Ethan Adams",
        items: [
          {
            productId: 12,
            productName: "Product L",
            price: 18.0,
            priceOnSale: 15.99,
            quantity: 3,
            category: "Speakers"
          },
          {
            productId: 13,
            productName: "Product M",
            price: 42.0,
            priceOnSale: 38.99,
            quantity: 1,
            category: "Tablets"
          },
        ],
        totalPrice: 115.96,
        deliveryStatus: "Delivered",
        mercadopagoTransactionId: "MP876543",
        mercadopagoTransactionStatus: "Approved",
        orderDate: "2024-02-20",
      },
      {
        Id: 28,
        userId: 128,
        userName: "Aria Hill",
        items: [
          {
            productId: 14,
            productName: "Product N",
            price: 28.99,
            priceOnSale: 24.99,
            quantity: 2,
            category: "Tablets"
          },
          {
            productId: 15,
            productName: "Product O",
            price: 55.0,
            priceOnSale: 49.99,
            quantity: 1,
            category: "Tablets"
          },
        ],
        totalPrice: 108.97,
        deliveryStatus: "Delivered",
        mercadopagoTransactionId: "MP765432",
        mercadopagoTransactionStatus: "Approved",
        orderDate: "2024-03-10",
      },
      {
        Id: 29,
        userId: 129,
        userName: "Logan Baker",
        items: [
          {
            productId: 16,
            productName: "Product P",
            price: 12.0,
            priceOnSale: 9.99,
            quantity: 4,
            category: "Tablets"
          },
          {
            productId: 17,
            productName: "Product Q",
            price: 30.0,
            priceOnSale: 26.99,
            quantity: 1,
            category: "Tablets"
          },
        ],
        totalPrice: 116.94,
        deliveryStatus: "Pending",
        mercadopagoTransactionId: "MP654321",
        mercadopagoTransactionStatus: "Pending",
        orderDate: "2024-04-02",
      },
      {
        Id: 30,
        userId: 130,
        userName: "Avery Foster",
        items: [
          {
            productId: 18,
            productName: "Product R",
            price: 21.0,
            priceOnSale: 17.99,
            quantity: 3,
            category: "Tablets"
          },
          {
            productId: 19,
            productName: "Product S",
            price: 48.0,
            priceOnSale: 44.99,
            quantity: 2,
            category: "Tablets"
          },
        ],
        totalPrice: 141.94,
        deliveryStatus: "Delivered",
        mercadopagoTransactionId: "MP543210",
        mercadopagoTransactionStatus: "Approved",
        orderDate: "2024-05-20",
      },
      {
        Id: 31,
        userId: 131,
        userName: "Jackson Garcia",
        items: [
          {
            productId: 20,
            productName: "Product T",
            price: 16.5,
            priceOnSale: 13.99,
            quantity: 2,
            category: "Smartwatches"
          },
          {
            productId: 21,
            productName: "Product U",
            price: 38.0,
            priceOnSale: 34.99,
            quantity: 1,
            category: "Smartwatches"
          },
        ],
        totalPrice: 103.47,
        deliveryStatus: "Processing",
        mercadopagoTransactionId: "MP432109",
        mercadopagoTransactionStatus: "Processing",
        orderDate: "2024-06-06",
      },
      {
        Id: 32,
        userId: 132,
        userName: "Aria Martinez",
        items: [
          {
            productId: 22,
            productName: "Product V",
            price: 24.99,
            priceOnSale: 19.99,
            quantity: 3,
            category: "Smartwatches"
          },
        ],
        totalPrice: 84.96,
        deliveryStatus: "Delivered",
        mercadopagoTransactionId: "MP321098",
        mercadopagoTransactionStatus: "Approved",
        orderDate: "2024-07-22",
      },
      {
        Id: 33,
        userId: 133,
        userName: "Carter Brown",
        items: [
          {
            productId: 23,
            productName: "Product W",
            price: 18.0,
            priceOnSale: 14.99,
            quantity: 1,
            category: "Smartwatches"
          },
          {
            productId: 24,
            productName: "Product X",
            price: 42.0,
            priceOnSale: 38.99,
            quantity: 2,
            category: "Smartwatches"
          },
        ],
        totalPrice: 94.97,
        deliveryStatus: "Pending",
        mercadopagoTransactionId: "MP210987",
        mercadopagoTransactionStatus: "Pending",
        orderDate: "2024-08-08",
      },
      {
        Id: 34,
        userId: 134,
        userName: "Ella White",
        items: [
          {
            productId: 25,
            productName: "Product Y",
            price: 32.5,
            priceOnSale: 28.99,
            quantity: 2,
            category: "Smartwatches"
          },
        ],
        totalPrice: 61.98,
        deliveryStatus: "Processing",
        mercadopagoTransactionId: "MP109876",
        mercadopagoTransactionStatus: "Processing",
        orderDate: "2024-09-15",
      },
      {
        Id: 35,
        userId: 135,
        userName: "Grayson Harris",
        items: [
          {
            productId: 26,
            productName: "Product Z",
            price: 29.99,
            priceOnSale: 24.99,
            quantity: 1,
            category: "Smartwatches"
          },
          {
            productId: 27,
            productName: "Product AA",
            price: 55.0,
            priceOnSale: 49.99,
            quantity: 1,
            category: "Smartwatches"
          },
        ],
        totalPrice: 84.98,
        deliveryStatus: "Delivered",
        mercadopagoTransactionId: "MP098765",
        mercadopagoTransactionStatus: "Approved",
        orderDate: "2024-10-02",
      },
      {
        Id: 36,
        userId: 136,
        userName: "Liam Turner",
        items: [
          {
            productId: 1,
            productName: "Product A",
            price: 25.99,
            priceOnSale: 20.99,
            quantity: 2,
            category: "Smartwatches"
          },
          {
            productId: 3,
            productName: "Product C",
            price: 32.5,
            priceOnSale: 28.99,
            quantity: 1,
            category: "Smartphones"
          },
        ],
        totalPrice: 109.47,
        deliveryStatus: "Delivered",
        mercadopagoTransactionId: "MP765432",
        mercadopagoTransactionStatus: "Approved",
        orderDate: "2024-11-18",
      },
      {
        Id: 37,
        userId: 137,
        userName: "Emma Baker",
        items: [
          {
            productId: 2,
            productName: "Product B",
            price: 19.99,
            priceOnSale: 15.99,
            quantity: 3,
            category: "Smartphones"
          },
          {
            productId: 4,
            productName: "Product D",
            price: 45.0,
            priceOnSale: 39.99,
            quantity: 2,
            category: "Smartphones"
          },
        ],
        totalPrice: 141.94,
        deliveryStatus: "Processing",
        mercadopagoTransactionId: "MP654321",
        mercadopagoTransactionStatus: "Processing",
        orderDate: "2024-12-05",
      },
      {
        Id: 38,
        userId: 138,
        userName: "Oliver Foster",
        items: [
          {
            productId: 5,
            productName: "Product E",
            price: 39.0,
            priceOnSale: 34.99,
            quantity: 1,
            category: "Smartphones"
          },
          {
            productId: 6,
            productName: "Product F",
            price: 50.0,
            priceOnSale: 45.99,
            quantity: 3,
            category: "Smartphones"
          },
        ],
        totalPrice: 181.94,
        deliveryStatus: "Delivered",
        mercadopagoTransactionId: "MP543210",
        mercadopagoTransactionStatus: "Approved",
        orderDate: "2025-01-22",
      },
      {
        Id: 39,
        userId: 139,
        userName: "Ava Garcia",
        items: [
          {
            productId: 7,
            productName: "Product G",
            price: 29.99,
            priceOnSale: 24.99,
            quantity: 2,
            category: "Smartphones"
          },
        ],
        totalPrice: 74.97,
        deliveryStatus: "Delivered",
        mercadopagoTransactionId: "MP432109",
        mercadopagoTransactionStatus: "Approved",
        orderDate: "2025-02-08",
      }
  ];
  export default orders;
  