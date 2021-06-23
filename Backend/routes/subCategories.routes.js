module.exports = app => {
    const subCategories = require("../controller/subCategory.controller.js");
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
   // app.get("/subCategories/sub", subCategories.findSub);
   // app.get("/subCategories", subCategories.findAll);
    //app.get("/subCategories/:idSubCategory",subCategories.findOne)

    app.get("/subCategories", subCategories.findAll);
    app.post("/subCategories",subCategories.insert);
    app.delete("/subCategories",subCategories.delete);
    app.put("/subCategories/:idSubCategory", subCategories.update);
    app.get("/subCategoriesSearch/:query",subCategories.ProductsSearch);
    app.get("/subCategoriesSearchAvailable/:query",subCategories.getAvailSubCats);
    app.get("/subCategoriescount",subCategories.getCount);
    app.get("/subCategoriesPaginated/:from/:to",subCategories.findPaginated);

};