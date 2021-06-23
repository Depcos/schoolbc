module.exports = app => {
    const attributes = require("../controller/attribute.controller.js");


    app.get("/attributes", attributes.findAll);
    app.post("/attributes", attributes.insert);
    app.delete("/attributes", attributes.delete);
    app.put("/attributes", attributes.update);
    app.get("/attributes/:attributeId", attributes.findOne);

    app.get("/attributesSearch/:query",attributes.AttributesSearch);

    app.get("/attributesSearchValue/:idAttribute/:query",attributes.AttributesSearchValue);

    app.get("/attributescount",attributes.getCount);
    app.get("/attributesPaginated/:from/:to",attributes.findPaginated);



    app.get("/guideAttributes/:categoryId",attributes.getCategoryAttributes);
    app.get("/guideAttributesValues/:categoryId/:attributeId",attributes.getCategoryAttributeValues);

};