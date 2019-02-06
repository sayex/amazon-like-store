//add all npm requires

var inquirer = require("inquirer");
var mysql = require("mysql");

// add my SQL server information
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

//function to get product info. I used a view on the SQL server instead of coding a join statment here.
function readProducts(callback) {
  connection.query("SELECT * from product_view", function (err, res) {
    if (err) throw err;
    callback(res);
  });
}

// function to update the products table with what they selected and how many to purchase
function updatepurchase(newQty, id) {
  connection.query("UPDATE products SET stock_quantity =? WHERE idproducts =?", [newQty, id], function (err, res) {
    if (err) throw err;
  });
}

// function to have the inquierer packadge display all the products and give the user a way to purahse them.
function customerSelection() {
  //callback to populate the list in the CLI and push it to an array as the inquirer list needs.
  readProducts(function (res) {
    var resArr = [];

    for (var i = 0; i < res.length; i++) {
      resArr.push(
        res[i].idproducts +
        "  " +
        res[i].product_name +
        " || Dept: " +
        res[i].department_name +
        " || Product Price: " +
        res[i].price +
        " || Stock Qty: " +
        res[i].stock_quantity
      );
    }
    inquirer
      .prompt([{
          type: "list",
          name: "product_name",
          message: "What would you like to buy?",
          choices: resArr
        },
        {
          type: "input",
          name: "purchaseQty",
          message: "How many would you like to buy?"
        }
      ])
      .then(answers => {
        var productNameId = answers.product_name.split(" ");
        productNameId = productNameId[0];
        var productNameIdIndex = productNameId[0] - 1;
        var userQty = parseInt(answers.purchaseQty);
        var databaseQty = res[productNameIdIndex].stock_quantity;
        var databasePrice = res[productNameIdIndex].price;
        if (userQty > databaseQty) {
          console.log("-----------------------");
          console.log();
          console.log("Not enough in inventory");
          console.log("-----------------------");
          console.log();
        } else if (userQty < databaseQty) {
          var totalPrucahse = userQty * databasePrice;
          var newQty = databaseQty - userQty;
          updatepurchase(newQty, productNameId);
          console.log("-----------------------");
          console.log();
          console.log("Enough is in Inventory for purchase." + " || Purchase Price: $" + totalPrucahse);
          console.log("-----------------------");
          console.log();
        }
        customerSelection();
      });
  });
}
customerSelection();