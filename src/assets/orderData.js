const orders = 
  [
    {
      userName: "Bastian",
      itemsCart: "[{\"id\":\"51414a31-efa3-4e8a-a894-bb3cf66b238c\",\"nameProd\":\"Notebook Asus Intel I5\",\"price\":715,\"priceOnSale\":null,\"stock\":8,\"quantityProd\":1,\"category\":\"Laptops\"},{\"id\":\"15dda5f1-12f6-4526-a036-d215c9564518\",\"nameProd\":\"Notebook Huawei MateBook D14\",\"price\":549.999,\"priceOnSale\":null,\"stock\":3,\"quantityProd\":2,\"category\":\"Laptops\"}]",
      orderDate: "2023-09-21T12:54:01.082Z",
      deliveryStatus: "In Process",
      mercadopagoTransactionId: "1316140219",
      mercadopagoTransactionStatus: "Approved",
      totalPrice: 1814.998,
      UserId: 2
    },
    {
      userName: "Selene",
      itemsCart: "[{\"id\":\"abee4a8d-47c8-44dc-a705-b03ab5ff16e3\",\"nameProd\":\"Notebook Gamer ROG\",\"price\":999,\"priceOnSale\":null,\"stock\":12,\"quantityProd\":2,\"category\":\"Laptops\"},{\"id\":\"db7b81e6-9e8a-406c-991a-c08d794b2b9f\",\"nameProd\":\" Xiaomi Redmi\",\"price\":126.999,\"priceOnSale\":88.899,\"stock\":2,\"quantityProd\":1,\"category\":\"Smartphones\"},{\"id\":\"6f649c4e-59e1-4338-9335-ccf24914c4b3\",\"nameProd\":\"Tablet Aiwa Tablet\",\"price\":127.775,\"priceOnSale\":96.999,\"stock\":24,\"quantityProd\":1,\"category\":\"Tablets\"}]",
      orderDate: "2023-10-18T10:56:53.671Z",
      deliveryStatus: "In Process",
      mercadopagoTransactionId: "1316140220",
      mercadopagoTransactionStatus: "Approved",
      totalPrice: 2183.8979999999997,
      UserId: 3
    },
    {
      userName: "Dory",
      itemsCart: "[{\"id\":\"243c5d89-6dc4-4dd6-8bdf-a4876b7deab5\",\"nameProd\":\"Notebook Lenovo V15 15.6\",\"price\":479.895,\"priceOnSale\":407.91,\"stock\":9,\"quantityProd\":1,\"category\":\"Laptops\"}]",
      orderDate: "2023-11-27T13:00:14.802Z",
      deliveryStatus: "In Process",
      mercadopagoTransactionId: "1316140221",
      mercadopagoTransactionStatus: "Approved",
      totalPrice: 407.91,
      UserId: 1
    },
    {
      userName: "Bruno",
      itemsCart: "[{\"id\":\"719c97d3-2b89-4aed-9c9c-b604b9667b64\",\"nameProd\":\"Gadnic Android\",\"price\":184.599,\"priceOnSale\":123.499,\"stock\":4,\"quantityProd\":3,\"category\":\"Tablets\"},{\"id\":\"25d0b180-68ad-4cb8-bb7b-1e390d17c8f6\",\"nameProd\":\"T-Go Gaming Tablet\",\"price\":116.699,\"priceOnSale\":null,\"stock\":9,\"quantityProd\":3,\"category\":\"Tablets\"}]",
      orderDate: "2023-12-07T13:31:16.961Z",
      deliveryStatus: "In Process",
      mercadopagoTransactionId: "1316140225",
      mercadopagoTransactionStatus: "Approved",
      totalPrice: 720.5939999999999,
      UserId: 4
    },
    {
      userName: "Selene",
      itemsCart: "[{\"id\":\"55ebcb3a-3906-4c22-85ad-85fdff8b3aab\",\"nameProd\":\"Samsung Galaxy A54\",\"price\":398.359,\"priceOnSale\":366.49,\"stock\":13,\"quantityProd\":3,\"category\":\"Smartphones\"}]",
      orderDate: "2023-12-08T00:42:34.022Z",
      deliveryStatus: "In Process",
      mercadopagoTransactionId: "1096140295",
      mercadopagoTransactionStatus: "Approved",
      totalPrice: 1099.47,
      UserId: 3
    },
    {
      userName: "Bastian",
      itemsCart: "[{\"id\":\"6b205655-b82b-43b8-9e44-fe5bbe458cd9\",\"nameProd\":\"Apple Watch Series 7\",\"price\":399.99,\"priceOnSale\":359.999,\"stock\":14,\"quantityProd\":5,\"category\":\"Smartwatches\"}]",
      orderDate: "2023-12-08T00:50:59.516Z",
      deliveryStatus: "In Process",
      mercadopagoTransactionId: "2096140206",
      mercadopagoTransactionStatus: "Approved",
      totalPrice: 1799.9950000000001,
      UserId: 2
    },
    {
      userName: "Bastian",
      itemsCart: "[{\"id\":\"5ed91eee-6c14-48cc-a0d6-9e21f9b47d47\",\"nameProd\":\"Spica Sp-4408 Portable\",\"price\":160,\"priceOnSale\":88,\"stock\":15,\"quantityProd\":3,\"category\":\"Speakers\"}]",
      orderDate: "2023-04-08T00:57:02.900Z",
      deliveryStatus: "In Process",
      mercadopagoTransactionId: "2356170200",
      mercadopagoTransactionStatus: "Approved",
      totalPrice: 264,
      UserId: 2
    },
    {
      userName: "Bastian",
      itemsCart: "[{\"id\":\"6b205655-b82b-43b8-9e44-fe5bbe458cd9\",\"nameProd\":\"Apple Watch Series 7\",\"price\":399.99,\"priceOnSale\":359.999,\"stock\":14,\"quantityProd\":5,\"category\":\"Smartwatches\"}]",
      orderDate: "2023-05-08T00:50:59.516Z",
      deliveryStatus: "In Process",
      mercadopagoTransactionId: "2096140206",
      mercadopagoTransactionStatus: "Approved",
      totalPrice: 1799.9950000000001,
      UserId: 2
    },
    {
      userName: "Bastian",
      itemsCart: "[{\"id\":\"5ed91eee-6c14-48cc-a0d6-9e21f9b47d47\",\"nameProd\":\"Spica Sp-4408 Portable\",\"price\":160,\"priceOnSale\":88,\"stock\":15,\"quantityProd\":3,\"category\":\"Speakers\"}]",
      orderDate: "2023-05-08T00:57:02.900Z",
      deliveryStatus: "In Process",
      mercadopagoTransactionId: "2356170200",
      mercadopagoTransactionStatus: "Approved",
      totalPrice: 264,
      UserId: 2
    },
    {
      userName: "Bastian",
      itemsCart: "[{\"id\":\"6b205655-b82b-43b8-9e44-fe5bbe458cd9\",\"nameProd\":\"Apple Watch Series 7\",\"price\":399.99,\"priceOnSale\":359.999,\"stock\":14,\"quantityProd\":5,\"category\":\"Smartwatches\"}]",
      orderDate: "2023-09-08T00:50:59.516Z",
      deliveryStatus: "In Process",
      mercadopagoTransactionId: "2096140206",
      mercadopagoTransactionStatus: "Approved",
      totalPrice: 1799.9950000000001,
      UserId: 2
    },
    {
      userName: "Bastian",
      itemsCart: "[{\"id\":\"5ed91eee-6c14-48cc-a0d6-9e21f9b47d47\",\"nameProd\":\"Spica Sp-4408 Portable\",\"price\":160,\"priceOnSale\":88,\"stock\":15,\"quantityProd\":3,\"category\":\"Speakers\"}]",
      orderDate: "2022-10-08T00:57:02.900Z",
      deliveryStatus: "In Process",
      mercadopagoTransactionId: "2356170200",
      mercadopagoTransactionStatus: "Approved",
      totalPrice: 264,
      UserId: 2
    }
  ]
  export default orders;
  