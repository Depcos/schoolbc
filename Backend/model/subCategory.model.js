const sql = require("./db.js");


const subCategory = function(subCategory){
    this.idSubCategory = subCategory.idSubCategory;
    this.name = subCategory.name;

}
/*
subCategory.findSub = result => {
    sql.query("select * from subcategories_has_categories", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("subCategories: ", res);
        result(null, res);
    });
};


 */

subCategory.getAll = result => {
    sql.query("SELECT * FROM subCategories", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("subCategories: ", res);
        result(null, res);
    });
};


subCategory.updateById = (id, subCategory, result) => {
    sql.query(
        "UPDATE subcategories SET  name = ? WHERE idSubCategory = ?",
        [subCategory.name, id],
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

            console.log("updated cat: ", { id: id,  });
            result(null, { id: id,  });
        }
    );
};




subCategory.remove = (id, result) => {
    sql.query("DELETE FROM subcategories WHERE idSubCategory = ?", id, (err, res) => {
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

        console.log("deleted cat with id: ", id);
        result(null, res);
    });
};


subCategory.insert = (subCategory, result) => {
    sql.query(
        "INSERT INTO `subCategories` (`idSubCategory`, `name`) VALUES (NULL, ?)",
        [subCategory.name],
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

            console.log("inserted");
            result(null);
        }
    );
};


subCategory.getCount = result => {
    sql.query("SELECT count(*) as count FROM subcategories", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("categories: ", res);
        result(null, res);
    });
};

subCategory.ProductsSearch = (query,result,err) => {

    sql.query(`SELECT *  FROM subcategories where subcategories.name like '%${query}%'`,

        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("categories: ", res);
            result(null, res);
        });
};


subCategory.getAvailSubCats = (query,result,err) => {

    sql.query(`
    SELECT *  FROM subcategories where subcategories.name like '%${query}%'
and subcategories.idSubCategory not in(select subcategories_has_categories.SubCategories_idSubCategory from subcategories_has_categories)`,

        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("categories: ", res);
            result(null, res);
        });
};




subCategory.getPaginated = (boundaries,result,err) => {

    sql.query(`SELECT *  FROM subcategories limit ${boundaries.from},${boundaries.to}`,

        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("categories: ", res);
            result(null, res);
        });
};





module.exports = subCategory;