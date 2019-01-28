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

//   connection.connect(function (err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId + "\n");
//     connection.end();
//   })

function readProducts(callback) {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var resArr = {};
        // console.log(res)
        // for (var i = 0; i < res.length; i++) {
        //     resArr.push(res[i].product_name);
        // }
        callback(res);

    });
}

function customerSelection() {
    readProducts(function (res) {
        var resArr =[];
         
        for (var i = 0; i < res.length; i++) {
            resArr.push(res[i].idproducts+" "+res[i].product_name);

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
                // deleteSongFromPlaylist(answers);
                var productNameId = answers.product_name.split(" ")
                var productNameIdIndex = productNameId[0]-1
                var userQty = parseInt(answers.purchaseQty)
                var databaseQty = res[productNameIdIndex].stock_quantity
                // console.log(productNameId[0])
                // console.log(res[productNameIdIndex].stock_quantity)
                // console.log(userQty)
               if (userQty > databaseQty){
                   console.log("Not enough in inventory")
               } else if (userQty < databaseQty){
                   console.log("Enough is in Inventory for purchase")
               }
               connection.end()
            });
    });
};
customerSelection()