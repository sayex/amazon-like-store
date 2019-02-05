# amazon-like-store

## Use CLI to run program

![open](/assets/bamazon1.png)
![second](/assets/bamazon2.png)
![final](/assets/bamazon3.png)

### The SQL update statment does use the ID of the product and uses a join statment to get the department names.

* Instead of console.loging a table or using an NPM console.table, I present the user with a list of items they can buy
* I then take the line number and use it for the ID since the ID I put as the line number when it was displayed in the CLI.

#### Project goals
The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

1. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

2. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.