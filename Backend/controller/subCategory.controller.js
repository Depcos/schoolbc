const SubCategory = require("../model/subCategory.model.js");


//get all categories
exports.findAll = (req,res) => {
    SubCategory.getAll((err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};

exports.findSub = (req,res) => {
    SubCategory.findSub((err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};





//get all


exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    SubCategory.updateById(
        req.params.idSubCategory,
        new SubCategory(req.body),
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

    SubCategory.findById(req.params.idSubCategory, (err, data) => {
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
    SubCategory.insert(req.body,(err,data)=>{
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
    SubCategory.remove(req.body.idSubCategory, (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.idSubCategory}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.idSubCategory
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};


exports.findPaginated = (req,res) => {
    console.log(req.params);
    console.log(req.body);

    SubCategory.getPaginated(req.params,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};

exports.ProductsSearch = (req,res) => {
    console.log(req.params);
    console.log(req.body);

    SubCategory.ProductsSearch(req.params.query,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};

exports.getAvailSubCats = (req,res) => {
    console.log(req.params);
    console.log(req.body);

    SubCategory.getAvailSubCats(req.params.query,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};

exports.getCount = (req,res) => {
    SubCategory.getCount((err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};