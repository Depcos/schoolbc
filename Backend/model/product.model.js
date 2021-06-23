const sql = require("./db.js");



const Product = function(product){
    this.idProduct = product.idProduct
    this.name = product.name;
    this.link = product.link;
    this.imgLink = product.imgLink;
    this.Description = product.Description;
    this.Categories_idCategory = product.Categories_idCategory;
    this.rating = product.rating;
};



Product.getProductCount = (filter, result) => {


//console.log("count");console.log("count");console.log("count");console.log("count");console.log("count");console.log("count");console.log("count");
let subcat = `
select idProduct from products
 join products_has_subcategories on products_has_subcategories.Products_idProduct=products.idProduct
 join subcategories on subcategories.idSubCategory = products_has_subcategories.SubCategories_idSubCategory
 where subcategories.name = ?
`
let subcatWithProducts = `
select idProduct from products
 join products_has_subcategories on products_has_subcategories.Products_idProduct=products.idProduct
 join subcategories on subcategories.idSubCategory = products_has_subcategories.SubCategories_idSubCategory
 where subcategories.name = ? and idProduct in 
`
let range = `select idProduct from products
                join attributes_has_products ahp on ahp.Products_idProduct=products.idProduct
                join attributes att on att.idAttribute=ahp.Attributes_idAttribute
                where att.idAttribute = ? and ahp.value BETWEEN ? and ?`;
let rangeWithProduct = `
                select idProduct from products
                join attributes_has_products ahp on ahp.Products_idProduct=products.idProduct
                join attributes att on att.idAttribute=ahp.Attributes_idAttribute
                where att.idAttribute=? and ahp.value BETWEEN ? and ? and idProduct in 
                `;
let attributeBind = `select idProduct from products 
            join attributes_has_products ahp on ahp.Products_idProduct=products.idProduct 
            join attributes att on att.idAttribute=ahp.Attributes_idAttribute 
            where att.name = ?`;
let attributeBindWithProduct = `select idProduct from products 
            join attributes_has_products ahp on ahp.Products_idProduct=products.idProduct 
            join attributes att on att.idAttribute=ahp.Attributes_idAttribute 
            where att.name = ? and idProduct in `;
let attributeSelect = `select idProduct from products
    join attributes_has_products ahp on ahp.Products_idProduct=products.idProduct
    join attributes att on att.idAttribute=ahp.Attributes_idAttribute
    where att.name=?`;
let attributeWithValueSelect = `select idProduct from products
    join attributes_has_products ahp on ahp.Products_idProduct=products.idProduct
    join attributes att on att.idAttribute=ahp.Attributes_idAttribute
    where att.idAttribute=? and ahp.value=?`;




    switch (filter.type) {
        case "subcategory":
            if (filter.productList !== null && filter.productList.length !== 0) {
                let idString = "";
                filter.productList.forEach(item => {
                    idString += item.idProduct + ",";
                })
                //console.log(idString);
                idString = idString.substring(0, idString.length - 1);
                idString = "(" + idString + ")";

                sql.query(
                    subcatWithProducts + idString,
                    [filter.value]
                    ,
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }

                       // console.log("prdocuts: ", res);
                        result(null, res);


                    }
                );

            } else {
                sql.query(
                    subcat,
                    [filter.value]
                    ,
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }

                        // console.log("prdocuts: ", res);
                        result(null, res);


                    }
                );
            }

            break;
        case "range":
        {
            if (filter.productList !== null && filter.productList.length !== 0) {
                let idString = "";
                filter.productList.forEach(item => {
                    idString += item.idProduct + ",";
                })

                idString = idString.substring(0, idString.length - 1);
                idString = "(" + idString + ")";

let sqlcmd;

             sqlcmd=sql.query(
                    rangeWithProduct + idString,
                    [filter.value[0].idAttribute, filter.min, filter.max]
                    ,
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }

                        // console.log("prdocuts: ", res);
                        result(null, res);


                    }
                );
console.log(sqlcmd.sql);
            } else {
                sql.query(
                    range
                    , [filter.value[0].idAttribute, filter.min, filter.max]
                    ,
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }

                        // console.log("prdocuts: ", res);
                        result(null, res);


                    }
                );

            }


            break;
    }
        case "radio": {

            let q;

            //with ins or without
            let idString = "";
            if (filter.productList !== null && filter.productList.length !== 0) {

                filter.productList.forEach(item => {
                    idString += item.idProduct + ",";
                })

                idString = idString.substring(0, idString.length - 1);
                idString = "and idProduct in(" + idString + ")";

            }

            if (filter.selectedBinding === "BindByAttribute") {

               sql.query(
                    attributeSelect + idString
                    , [filter.value]
                    ,
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }

                        console.log("categories: ", res);
                        result(null, res);


                    }
                );

            } else {
               sql.query(
                    attributeWithValueSelect + idString
                    , [filter.bindedValue[0].idAttribute, filter.value]
                    ,
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }

                        console.log("categories: ", res);
                        result(null, res);


                    }
                );

            }
            break;
        }
        case
            "checkbox":
            {
                let q;
                let idString = "";
                if (filter.productList !== null && filter.productList.length !== 0) {

                    filter.productList.forEach(item => {
                        idString += item.idProduct + ",";
                    })
                    //console.log(idString);
                    idString = idString.substring(0, idString.length - 1);
                    idString = "and idProduct in(" + idString + ")";

                }

                if (filter.selectedBinding === "BindByAttribute") {

                    q = sql.query(
                        attributeSelect + idString
                        , [filter.value]
                        ,
                        (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                result(null, err);
                                return;
                            }

                            console.log("categories: ", res);
                            result(null, res);


                        }
                    );
                    console.log(q.sql);
                } else {

                    q = sql.query(
                        attributeWithValueSelect + idString
                        , [filter.bindedValue[0].idAttribute, filter.value]
                        ,
                        (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                result(null, err);
                                return;
                            }

                            console.log("categories: ", res);
                            result(null, res);


                        }
                    );
                    console.log(q.sql);
                }
                break;
            }

        default:break;
    }

};


Product.getFilteredProductsCount = (filter,result) =>{
    console.log(filter);

    if (typeof filter.cat !== "undefined") {


        switch (filter.cat) {
            case "category": {
                query = sql.query(
                    `select count(t1.idProduct) as count  from ` +
                    `(SELECT products.idProduct,products.name,products.link,products.imgLink, products.Description FROM products join categories on products.Categories_idCategory = categories.idCategory ` +
                    `where categories.name = ?) t1 ` +
                    `join attributes_has_products ahp on ahp.Products_idProduct = idProduct ` +
                    `join attributes att on att.idAttribute = ahp.Attributes_idAttribute where att.name='cena'`

                    //ahp.value -> cena
                    // t1.name

                    // "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?"
                    ,
                    [filter.name],
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }

                        console.log("categories: ", res);
                        result(null, res);


                    }
                );
                break;
            }
            case "subcategory": {
                query = sql.query(
                    `select count(t1.idProduct) as count from (SELECT products.idProduct,products.name,products.link,products.imgLink, products.Description FROM products join products_has_subcategories on products_has_subcategories.Products_idProduct=products.idProduct join subcategories on subcategories.idSubCategory=products_has_subcategories.SubCategories_idSubCategory ` +
                    `where subcategories.name = ?) t1 ` +
                    `join attributes_has_products ahp on ahp.Products_idProduct = idProduct ` +
                    `join attributes att on att.idAttribute = ahp.Attributes_idAttribute where att.name="cena"`


                    //ahp.value -> cena
                    // t1.name


                    ,
                    [filter.name],
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }

                        console.log("categories: ", res);
                        result(null, res);


                    }
                );
                break;
            }
        }


}}


Product.getFilteredProducts = (recdata,result) => {
console.log("received Data!");
    console.log(JSON.stringify(recdata));

    let filter = recdata.filter;
   // console.log(filter);





    if (typeof filter.cat !== "undefined") {


        switch (filter.cat) {
            case "category": {
                sql.query(
                    `select t1.idProduct, t1.name, t1.link, t1.imgLink, t1.Description, t1.rating, ahp.value as price from ` +
                    `(SELECT products.idProduct,products.name,products.link,products.imgLink, products.Description, products.rating FROM products join categories on products.Categories_idCategory = categories.idCategory ` +
                    `where categories.name = ?) t1 ` +
                    `join attributes_has_products ahp on ahp.Products_idProduct = idProduct ` +
                    `join attributes att on att.idAttribute = ahp.Attributes_idAttribute where att.name='cena'
                     order by ${recdata.SortFilter.sortBy} ${recdata.SortFilter.orderBy}
                     limit ${recdata.limit.from},${recdata.limit.to}`


                    ,
                    [filter.name],
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }

                        console.log("categories: ", res);
                        result(null, res);


                    }
                );
                break;
            }
            case "subcategory": {
              sql.query(
                    `select t1.idProduct, t1.name, t1.link, t1.imgLink, t1.Description, t1.rating, ahp.value as price from (SELECT products.idProduct,products.name,products.link,products.imgLink, products.Description, products.rating FROM products join products_has_subcategories on products_has_subcategories.Products_idProduct=products.idProduct join subcategories on subcategories.idSubCategory=products_has_subcategories.SubCategories_idSubCategory ` +
                    `where subcategories.name = ?) t1 ` +
                    `join attributes_has_products ahp on ahp.Products_idProduct = idProduct ` +
                    `join attributes att on att.idAttribute = ahp.Attributes_idAttribute where att.name="cena"
                      order by ${recdata.SortFilter.sortBy} ${recdata.SortFilter.orderBy}
                     limit ${recdata.limit.from},${recdata.limit.to}`


                    ,
                    [filter.name],
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }

                        console.log("categories: ", res);
                        result(null, res);


                    }
                );
                break;
            }
        }



    } else {
        //GUIDEDATA



        let idString = "";


            filter.values.forEach(item => {
                idString += item.idProduct + ",";
            })
            //console.log(idString);
            idString = idString.substring(0, idString.length - 1);
            idString = "idProduct in(" + idString + ")";
            console.log(idString);



        sql.query(
            ` SELECT products.idProduct,products.name,products.link,products.imgLink, products.Description, products.rating ,ahp.value as price 
             FROM products
            join attributes_has_products ahp on ahp.Products_idProduct = idProduct 
            join attributes att on att.idAttribute = ahp.Attributes_idAttribute  where att.name="cena" and  `+idString+` 
             order by ${recdata.SortFilter.sortBy} ${recdata.SortFilter.orderBy}
            limit ${recdata.limit.from},${recdata.limit.to}`

            ,
            [filter.name],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                console.log("categories: ", res);
                result(null, res);


            }
        );


    }

};
    Product.findById = (ProductId, result) => {
        console.log(JSON.stringify(ProductId));


        sql.query(
            `
            select  t2.idProduct,t2.productname,t2.link,t2.imgLink,t2.Description,t2.rating, json_array(GROUP_CONCAT(LIST)) as list from(
            select t1.idProduct,t1.productname,t1.link,t1.imgLink,t1.Description,t1.rating, GROUP_CONCAT(name,value,unit,attDesc) as list
        from
        (SELECT products.idproduct ,products.name as productname,products.link,products.imgLink,products.Description, products.rating,
            JSON_OBJECT('name', attributes.name) as name,
            JSON_OBJECT('value', ahs.value) as value,
            JSON_OBJECT('unit', attributes.unit)  as unit,
            JSON_OBJECT('attDesc',attributes.Description) as attDesc
        from products
        join attributes_has_products ahs on ahs.Products_idProduct=products.idProduct
        join attributes on attributes.idAttribute=ahs.Attributes_idAttribute
        where idproduct=${ProductId}) t1) t2`

            , (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.length && res[0].idProduct!==null) {

                    console.log("found customer: ", res[0]);
                    result(null, res[0]);
                    return;
                }

                // not found Customer with the id
                result({kind: "not_found"}, null);
            });


    }





Product.updateById = (Product, result) => {

  sql.query(
        "UPDATE products SET  name = ?, link = ?, imgLink = ?, Description = ?,Categories_idCategory = ?, rating = ? WHERE idProduct = ?",
        [Product.name,Product.link,Product.imgLink,Product.Description,Product.Categories_idCategory, Product.rating, Product.idProduct],
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

            console.log("updated cat: ", { id: Product.idProduct,  });
            result(null, { id: Product.idProduct,  });
        }
    );

};

Product.getAll = result => {
    sql.query("SELECT * FROM products", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("products: ", res);
        result(null, res);
    });
};

Product.getCount = result => {
    sql.query("SELECT count(*) as count FROM products", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("products: ", res);
        result(null, res);
    });
};

Product.ProductsSearch = (query,result,err) => {

    sql.query(`SELECT *  FROM products where products.name like '%${query}%'`,

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


Product.getPaginated = (boundaries,result,err) => {

    sql.query(`SELECT *  FROM products limit ${boundaries.from},${boundaries.to}`,

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

Product.remove = (id, result) => {
    sql.query("DELETE FROM products WHERE idProduct = ?", id, (err, res) => {
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

        console.log("deleted pd with id: ", id);
        result(null, res);
    });
};


Product.insert = (Product, result) => {
    console.log(Product);
    sql.query(
        "INSERT INTO `products` (`idProduct`, `name`, `link`, `imgLink`, `Description`, `Categories_idCategory`, `rating`) VALUES (NULL, ?, ?, ?, ?, ?, ?)",
        [Product.name,Product.link,Product.imgLink,Product.Description,Product.Categories_idCategory, Product.rating],
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

Product.removeatt = (req, result) => {



   sql.query("DELETE FROM `attributes_has_products` WHERE Products_idProduct = ? and Attributes_idAttribute = ?",
        [req.idProduct,req.idAttribute],
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

        console.log("deleted att from product with id: ", req.idProduct);
        result(null, res);
    });

};


Product.insertatt = (req, result) => {

    sql.query(
        "INSERT INTO `attributes_has_products` (`Attributes_idAttribute`, `Products_idProduct`, `value`) VALUES (?, ?, ?)",
        [req.idAttribute,req.idProduct,req.value],
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

Product.getAtt = (req, result) => {


    sql.query(`
        select attributes.idAttribute,attributes.name,attributes.unit,attributes.Description,ahp.value as value from attributes
    join attributes_has_products ahp on ahp.Attributes_idAttribute = attributes.idAttribute
    join products p on p.idProduct = ahp.Products_idProduct
    where p.idProduct = `+req.productId
      ,
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
            result(null,res);
        }
    );


};


Product.removesub = (req, result) => {



    sql.query("DELETE FROM `products_has_subcategories` WHERE Products_idProduct = ? and SubCategories_idSubCategory = ?",
        [req.idProduct,req.idSubCategory],
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

            console.log("deleted sub from product with id: ", req.idProduct);
            result(null, res);
        });

};


Product.insertsub = (req, result) => {

    sql.query(
        "INSERT INTO `products_has_subcategories` (`Products_idProduct`, `SubCategories_idSubCategory`) VALUES (?, ?)",
        [req.idProduct,req.idSubCategory],
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

Product.getSub = (req, result) => {
    console.log(req);

    sql.query(`
        SELECT subcategories.idSubCategory, subcategories.name FROM products_has_subcategories
join subcategories on subcategories.idSubCategory =products_has_subcategories.SubCategories_idSubCategory
join products on products.idProduct = products_has_subcategories.Products_idProduct
where products.idProduct = `+req.productId
        ,
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

            console.log("ret");
            result(null,res);
        }
    );


};

module.exports=Product;

