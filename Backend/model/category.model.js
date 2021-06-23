const sql = require("./db.js");



const Category = function(category){
    this.id = category.id;
    this.name = category.name;
}
Category.updateinsub = (newRelation, result) => {
    console.log(newRelation);
    console.log(result);
    sql.query("UPDATE subcategories_has_categories SET  isVisible = ? WHERE Categories_idCategory = ? and SubCategories_idSubCategory = ?",
        [newRelation.isVisible===false?0:1,newRelation.idCategory,newRelation.idSubCategory], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
         //   console.log("updated : ", { id: res.insertId, ...newRelation });
            result(null, { id: res.insertId, ...newRelation });
        });
};

Category.createinsub = (newRelation, result) => {
    console.log(newRelation);
    console.log(result);
    sql.query("INSERT INTO `subcategories_has_categories` (`SubCategories_idSubCategory`, `Categories_idCategory`, isVisible) VALUES (?, ?, ?)",
        [newRelation.idSubCategory,newRelation.idCategory, newRelation.isVisible===false?0:1], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
      //  console.log("created: ", { id: res.insertId, ...newRelation });
        result(null, { id: res.insertId, ...newRelation });
    });
};

Category.deleteinsub = (relation, result) => {
console.log(relation);
    console.log(result);
    sql.query("DELETE FROM `subcategories_has_categories` WHERE `subcategories_has_categories`.`SubCategories_idSubCategory` = ? AND `subcategories_has_categories`.`Categories_idCategory` = ?",
        [relation.idSubCategory,relation.idCategory], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
         //   console.log("created category: ", { id: res.insertId, ...relation });
            result(null, { id: res.insertId, ...relation });
        });
};

Category.getSub = (req, result) => {
    sql.query(`
       select subcategories.idSubCategory,subcategories.name, subcategories_has_categories.isVisible as isVisible from subcategories
join subcategories_has_categories on subcategories_has_categories.SubCategories_idSubCategory = subcategories.idSubCategory
join categories on categories.idCategory = subcategories_has_categories.Categories_idCategory
where categories.idCategory = `+req.categoryId
        ,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found
                result({ kind: "not_found" }, null);
                return;
            }

            result(null,res);
        }
    );


};



Category.getAllAttributes = (categoryName, result) => {

    sql.query(
        `select name, json_array(GROUP_CONCAT(LIST)) as list from(SELECT DISTINCT attributes.name,JSON_OBJECT('value', ahp.value) as list from categories join products pro on categories.idCategory = pro.Categories_idCategory join attributes_has_products ahp on ahp.Products_idProduct = pro.idProduct join attributes on ahp.Attributes_idAttribute = attributes.idAttribute where categories.name='${categoryName}')t1 GROUP by name`
       , (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("categories: ", res);

            result(null, res);
        }
    );
};

Category.findCatSub = result => {
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



Category.findById = (categoryId, result) => {
    sql.query(`SELECT * FROM categories WHERE idcategory = ${categoryId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
          //  console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Category.updateById = (id, Category, result) => {
    sql.query(
        "UPDATE categories SET  name = ? WHERE idcategory = ?",
        [Category.name, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found cat with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated cat: ", { id: id,  });
            result(null, { id: id,  });
        }
    );
};

Category.getAll = result => {
    sql.query("SELECT * FROM categories", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

       // console.log("categories: ", res);
        result(null, res);
    });
};


Category.getAllCategoriesAndSubCategories = result =>{
    sql.query(
  //  `select category_name,json_array(GROUP_CONCAT(LIST)) as list from (select  categories.name as category_name,JSON_OBJECT('value', subcategories.name) as list from categories join subcategories_has_categories on categories.idCategory=subcategories_has_categories.Categories_idCategory join subcategories on subcategories_has_categories.SubCategories_idSubCategory=subcategories.idSubCategory)t1`
        `select category_name,json_array(GROUP_CONCAT(LIST)) as list from (select  categories.name as category_name,JSON_OBJECT('value', subcategories.name) as list from categories 
left join subcategories_has_categories on categories.idCategory=subcategories_has_categories.Categories_idCategory and subcategories_has_categories.isVisible=1
left  join subcategories on subcategories_has_categories.SubCategories_idSubCategory=subcategories.idSubCategory )t1 group by category_name
        `, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
       // console.log("categories: ", res);

        result(null, res);
    }
    );
};


Category.remove = (id, result) => {
    sql.query("DELETE FROM categories WHERE idCategory = ?", id, (err, res) => {
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


Category.insert = (Category, result) => {
    sql.query(
        "INSERT INTO `categories` (`idCategory`, `name`) VALUES (NULL, ?)",
        [Category.name],
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
            console.log(res);
            result(null,res);
        }
    );
};


Category.getCount = result => {
    sql.query("SELECT count(*) as count FROM categories", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("categories: ", res);
        result(null, res);
    });
};

Category.ProductsSearch = (query,result,err) => {

    sql.query(`SELECT *  FROM categories where categories.name like '%${query}%'`,

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


Category.getPaginated = (boundaries,result,err) => {

    sql.query(`SELECT *  FROM categories limit ${boundaries.from},${boundaries.to}`,

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




module.exports = Category;
