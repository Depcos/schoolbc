const Attribute = require("../model/attributes.model.js");

//get all
exports.findAll = (req,res) => {
    Attribute.getAll((err,data)=>{
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
    console.log(req.body);
    console.log(req.params);

    Attribute.updateById(

        req.params.idAttribute,
        new Attribute(req.body),
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

    Attribute.findById(req.params.attributeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.attributeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.attributeId
                });
            }
        } else res.send(data);
    });
};


exports.insert= (req,res) => {
    Attribute.insert(req.body,(err,data)=>{
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
    Attribute.remove(req.body.idAttribute, (err, data) => {

        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found attributeId with id ${req.params.attributeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete attributeId with id " + req.params.attributeId
                });
            }
        } else res.send({ message: `att was deleted successfully!` });
    });
};

exports.findPaginated = (req,res) => {
    console.log(req.params);
    console.log(req.body);

    Attribute.getPaginated(req.params,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};


exports.AttributesSearchValue = (req,res) => {
    console.log(req.params);
    console.log(req.body);

    Attribute.AttributesSearchValue(req.params.query,req.params.idAttribute,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};

exports.AttributesSearch = (req,res) => {
    console.log(req.params);
    console.log(req.body);

    Attribute.AttributesSearch(req.params.query,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};
exports.getCount = (req,res) => {
    Attribute.getCount((err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};

exports.getCategoryAttributes = (req,res) => {
    console.log(req.params);
    console.log(req.body);

    Attribute.getCategoryAttributes(req.params.categoryId,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};
exports.getCategoryAttributeValues = (req,res) => {
    console.log(req.params);
    console.log(req.body);

    Attribute.getCategoryAttributeValues(req.params.categoryId,req.params.attributeId,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message ||"error"});
        }else{
            res.send(data);
        }});
};