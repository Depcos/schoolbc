const sql = require("./db.js");


const attribute = function(attribute){
    this.idAttribute= attribute.idAttribute;
    this.name = attribute.name;
    this.unit = attribute.unit;
    this.Description = attribute.Description
}


attribute.findById = (idAttribute, result) => {
    sql.query(`SELECT * FROM attributes WHERE idAttribute = ${idAttribute}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found attribute: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

attribute.updateById = (id, attribute, result) => {
    console.log(attribute);
    console.log(id);

    sql.query(
        "UPDATE attributes SET  name = ?, unit = ?, Description = ? WHERE idAttribute = ?",
        [attribute.name,attribute.unit,  attribute.Description,attribute.idAttribute],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated att: ", { id: id,  });
            result(null, { id: id,  });
        }
    );
};

attribute.getAll = result => {
    sql.query("SELECT * FROM attributes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("atts: ", res);
        result(null, res);
    });
};


attribute.remove = (id, result) => {
    console.log(id);

    sql.query("DELETE FROM attributes WHERE idAttribute = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted att with id: ", id);
        result(null, res);
    });
};


attribute.insert = (attribute, result) => {
    console.log(attribute);
    sql.query(
        "INSERT INTO `attributes` (`idAttribute`, `name`,`unit`, `Description`) VALUES (NULL, ?,?,?)",
        [attribute.name,attribute.unit,attribute.Description],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            result(null,res);
        }
    );
};


attribute.getCount = result => {
    sql.query("SELECT count(*) as count FROM attributes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

attribute.AttributesSearchValue = (query,attId, result,err) => {

        sql.query(`select distinct attributes_has_products.value as name from attributes_has_products
    join attributes a on a.idAttribute=attributes_has_products.Attributes_idAttribute
    where attributes_has_products.Attributes_idAttribute = ${attId} and attributes_has_products.value like '%${query}%'`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            result(null, res);
        });
};

attribute.AttributesSearch = (query,result,err) => {

    sql.query(`SELECT *  FROM attributes where attributes.name like '%${query}%'`,

        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }


            result(null, res);
        });
};


attribute.getPaginated = (boundaries,result,err) => {

    sql.query(`SELECT *  FROM attributes limit ${boundaries.from},${boundaries.to}`,

        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }


            result(null, res);
        });
};

attribute.getCategoryAttributes = (categoryId,result,err) => {

    sql.query(`select DISTINCT attributes.idAttribute,attributes.name,attributes.unit,attributes.Description from categories
join products on products.Categories_idCategory = categories.idCategory
join attributes_has_products ahs on ahs.Products_idProduct = products.idProduct
join attributes on attributes.idAttribute = ahs.Attributes_idAttribute
where categories.idCategory=${categoryId}`,

        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }


            result(null, res);
        });
};
attribute.getCategoryAttributeValues = (categoryId,attributeId,result,err) => {

    sql.query(`select DISTINCT ahs.value from categories
join products on products.Categories_idCategory = categories.idCategory
join attributes_has_products ahs on ahs.Products_idProduct = products.idProduct
join attributes on attributes.idAttribute = ahs.Attributes_idAttribute
where categories.idCategory=${categoryId} and idAttribute = ${attributeId}`,

        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }


            result(null, res);
        });
};
module.exports = attribute;