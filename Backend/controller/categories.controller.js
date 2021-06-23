const Category = require("../model/category.model.js");




    exports.getAllCategoriesAndSubCategories = (req,res) =>{
        Category.getAllCategoriesAndSubCategories((err,data)=>{
            if(err){
                res.status(500).send({message:err.message ||"error"});
            }else{
                res.send(data);
            }
        });

    };

exports.updateinsub = (req,res) => {
    Category.updateinsub(req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found  with id ${req.body}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving with id " + req.body
                });
            }
        } else res.send(data);
    });
}


exports.createinsub = (req,res) => {
    Category.createinsub(req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params
                });
            }
        } else res.send(data);
    });
}

exports.deleteinsub = (req,res) => {
    Category.deleteinsub(req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params
                });
            }
        } else res.send(data);
    });
}


exports.findAllAttributes = (req,res) =>{
    Category.getAllAttributes(req.params.categoryName, (err,data) =>{
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.categoryName}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.categoryName
                });
            }
        } else res.send(data);
    });
};



//get all
exports.findAll = (req,res) => {
    Category.getAll((err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};



exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Category.updateById(
        req.params.categoryid,
        new Category(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found .`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating "
                    });
                }
            } else res.send(data);
        }
    );
};

exports.findOne = (req, res) => {
    console.log(req.params);

    Category.findById(req.params.categoryId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.categoryid}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.categoryid
                });
            }
        } else res.send(data);
    });
};


exports.insert= (req,res) => {
    Category.insert(req.body,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};

exports.findCatSub = (req,res) => {
    Category.findCatSub((err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};


exports.delete = (req, res) => {
  //  console.log(req);
    console.log(req.params);
    console.log(req.body);

    Category.remove(req.body.idCategory, (err, data) => {

        if (err) {

            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.categoryId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.categoryId
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};


exports.findPaginated = (req,res) => {
    console.log(req.params);
    console.log(req.body);

    Category.getPaginated(req.params,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};

exports.ProductsSearch = (req,res) => {
    console.log(req.params);
    console.log(req.body);

    Category.ProductsSearch(req.params.query,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};
exports.getCount = (req,res) => {
    Category.getCount((err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};


exports.getSub= (req,res) => {
    Category.getSub(req.params,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};