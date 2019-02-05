var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "newpassword",
    database: "bamazon"
});


function readProducts(callback) {
    connection.query("SELECT products.idproducts, products.product_name, products.price, products.stock_quantity, departments.department_name FROM products INNER JOIN departments ON products.department_id = departments.iddepartments", function (err, res) {
        if (err) throw err;
        callback(res);

    });
}

function updatepurchase(id, newQty) {

    connection.query("UPDATE products SET stock_quantity =? WHERE idproducts =?", [newQty, id], function (err, res) {
        if (err) throw err;

    });

}

function customerSelection() {
    readProducts(function (res) {
        var resArr = [];

        for (var i = 0; i < res.length; i++) {
            resArr.push(res[i].idproducts + "  " + res[i].product_name + " Dept: " + res[i].department_name + " Product Price: " + res[i].price + " Stock Qty: " + res[i].stock_quantity);

        }
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'product_name',
                    message: 'What would you like to buy?',
                    choices: resArr
                },
                {
                    type: 'input',
                    name: 'purchaseQty',
                    message: 'How many would you like to buy?',
                },
            ])
            .then(answers => {
                var productNameId = answers.product_name.split(" ")
                productNameId = productNameId[0]
                var productNameIdIndex = productNameId[0] - 1
                var userQty = parseInt(answers.purchaseQty)
                var databaseQty = res[productNameIdIndex].stock_quantity
                var databasePrice = res[productNameIdIndex].price
                if (userQty > databaseQty) {
                    console.log("-----------------------");
                    console.log();
                    console.log("Not enough in inventory");
                    console.log("-----------------------");
                    console.log();
                } else if (userQty < databaseQty) {
                    var totalPrucahse = userQty * databasePrice;
                    var newQty = databaseQty - userQty;
                    updatepurchase(productNameId, userQty, databaseQty, newQty)
                    console.log("-----------------------");
                    console.log();
                    console.log("Enough is in Inventory for purchase." + "|| Purchase Price: $" + totalPrucahse);
                    console.log("-----------------------");
                    console.log();

                }
                customerSelection()
            });
    });
};
customerSelection()