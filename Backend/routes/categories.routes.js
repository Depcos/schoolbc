module.exports = app => {
    const categories = require("../controller/categories.controller.js");
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

    app.get("/categories", categories.findAll);
    app.get("/categories/:categoryName",categories.findAllAttributes);
    app.get("/categoriesWithSubCategories",categories.getAllCategoriesAndSubCategories);
    app.get("/categoriesandsub",categories.findCatSub);


    app.post("/categories",categories.insert);
    app.delete("/categories",categories.delete);

    app.put("/categories/:categoryid", categories.update);
    app.get("/categories/get/:categoryId", categories.findOne);


    app.get("/CategoriesSearch/:query",categories.ProductsSearch);
    app.get("/Categoriescount",categories.getCount);
    app.get("/CategoriesPaginated/:from/:to",categories.findPaginated);

    app.post("/categorySub", categories.createinsub);
    app.delete("/categorySub", categories.deleteinsub);
    app.get("/categorySub/:categoryId",categories.getSub);
    app.put("/categorySub",categories.updateinsub);

};