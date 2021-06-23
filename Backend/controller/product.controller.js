
const Product = require("../model/product.model.js");


exports.getFilteredProducts = (req,res) =>{
   // console.log("loggingg req "+JSON.stringify(req.body));
    Product.getFilteredProducts(req.body,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }
    });
};

exports.getFilterProductCount = (req,res) =>{
    console.log("getfilterProductCountcontroller");
    // console.log("loggingg req "+JSON.stringify(req.body));

    Product.getProductCount(req.body,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }
    });
};
/*
exports.findOne = (req, res) => {
    Product.findById(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id .`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id "
                });
            }
        } else res.send(data);
    });
};



 */





exports.getCount = (req,res) => {
    Product.getCount((err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};

exports.getFilteredProductsCount = (req,res) =>{
    // console.log("loggingg req "+JSON.stringify(req.body));
    Product.getFilteredProductsCount(req.body,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }
    });
};


//get all
exports.findAll = (req,res) => {
    Product.getAll((err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};

exports.findPaginated = (req,res) => {
    console.log(req.params);
    console.log(req.body);

    Product.getPaginated(req.params,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};

exports.ProductsSearch = (req,res) => {
    console.log(req.params);
    console.log(req.body);

    Product.ProductsSearch(req.params.query,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};


exports.update = (req, res) => {
    console.log(req.body);
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Product.updateById(
        new Product(req.body),
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

    Product.findById(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id .`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id "
                });
            }
        } else res.send(data);
    });
};


exports.insert= (req,res) => {
    Product.insert(req.body,(err,data)=>{
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
    Product.remove(req.body.idProduct, (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found prod with id .`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete prod with id "
                });
            }
        } else res.send({ message: `prod was deleted successfully!` });
    });
};

exports.insertatt= (req,res) => {
    Product.insertatt(req.body,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};



exports.deleteatt = (req, res) => {
    //  console.log(req);
    console.log(req.params);
    console.log(req.body);

    Product.removeatt(req.body, (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found with id ${req.body}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.body
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};

exports.getAtt= (req,res) => {
    Product.getAtt(req.params,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};





exports.insertSub= (req,res) => {
    Product.insertsub(req.body,(err,data)=>{

        console.log("error_____________");
        console.log(err);
        console.log("result_________");
        console.log(data);

        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};



exports.deleteSub = (req, res) => {
    //  console.log(req);
    console.log(req.params);
    console.log(req.body);

    Product.removesub(req.body, (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found with id ${req.body}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.body
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};

exports.getSub= (req,res) => {
    Product.getSub(req.params,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};







/*



exports.getAllCategoriesAndSubCategories = (req,res) =>{
    Category.getAllCategoriesAndSubCategories((err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }
    });

};

 */