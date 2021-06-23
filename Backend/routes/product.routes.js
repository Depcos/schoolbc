module.exports = app => {
  //  const categories = require("../controller/categories.controller.js");
    const Products = require("../controller/product.controller.js");
    /*
        // Create a new Customer
        app.post("/customers", customers.create);
           // Retrieve all Customers


        // Retrieve a single Customer with customerId
        app.get("/customers/:customerId", customers.findOne);

        // Update a Customer with customerId
        app.put("/customers/:customerId", customers.update);

        // Delete a Customer with customerId
        app.delete("/customers/:customerId", customers.delete);

        // Create a new Customer
        app.delete("/customers", customers.deleteAll);
    */
    app.post("/getparamcount",Products.getFilterProductCount);
    app.post("/products",Products.getFilteredProducts);

    app.get("/productsPaginated/:from/:to",Products.findPaginated);

    app.get("/products/:productId",Products.findOne)
    app.get("/products", Products.findAll);
    app.get("/productscount",Products.getCount);
    app.post("/products/insert",Products.insert);
    app.delete("/products",Products.delete);
    app.get("/productsSearch/:query",Products.ProductsSearch);
    app.put("/products", Products.update);

    app.post("/productatt/",Products.insertatt);
    app.delete("/productatt/",Products.deleteatt);
    app.get("/productatt/:productId",Products.getAtt);

    app.post("/productsFilteredCount/",Products.getFilteredProductsCount);

    app.post("/productSub/",Products.insertSub);
    app.delete("/productSub/",Products.deleteSub);
    app.get("/productSub/:productId",Products.getSub);

    /*
    app.get("/categories", categories.findAll);
    app.get("/categories/:categoryName",categories.findAllAttributes);
    app.get("/categoriesWithSubCategories",categories.getAllCategoriesAndSubCategories);

     */
};