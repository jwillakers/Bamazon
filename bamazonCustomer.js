var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "graphics07",
  database: "bamazonDB",
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // run the start function after the connection is made to prompt the user
  startBuying();
});

function startBuying() {
    // ask user if they want to buy a product
  inquirer
    .prompt([{
      type: "confirm",
      name: "continue",
      message: "Welcome to Bamazon. Would you like to see our products?",
    }])
// if yes, then show table
  .then(function(userPurchase) {
        if(userPurchase.continue) {
        inventory();       
      } else {
  // if no, then goodbye
  console.log("Thank you. Have a great day.")
    }
  });
}



// --------------------List Inventory--------------------------
// instantiate 
function inventory() {
var table = new Table({
    head: ['Item #', 'Product', 'Department', 'Price', 'Stock Quantity']
  , colWidths: [20, 30, 20, 10, 10]

});
listInventory(table);
}


function listInventory(table){

connection.query("SELECT * FROM Products", function(err, res) {
  for(var i = 0; i < res.length; i ++) {

    var itemId = res[i].Item_Id,
      productName = res[i].Product_Name,
      departmentName = res[i].Department_Name,
      price = res[i].Price,
      stockQuantity = res[i].Stock_Qty;

// table is an Array, so you can `push`, `unshift`, `splice` and friends 

    table.push(
      [itemId, productName, departmentName, price, stockQuantity]
  );
  }
      console.log("");
      console.log("----------------------------------CURRENT BAMAZON INVENTORY-------------------------------");
      console.log("");
      console.log(table.toString());
      console.log("");
      selectPrompt();
    });
  }


// function which prompts the user for what action they should take
function selectPrompt() {
  inquirer
    .prompt([{
      type: "input",
      name: "continue",
      message: "Please enter the ID of the item you would like to purchase",
    },
    {
      type: "input",
      name: "inputNumber",
      message: "How many would you like to purchase?"
    }])

    .then(function(userPurchase) {
      connection.query("SELECT * FROM Products WHERE Item_Id = ?", userPurchase.continue, function(err, res) {
      for(var i = 0; i < res.length; i++ && res.length != 0) {
        
      if(userPurchase.inputNumber > res[i].Stock_Qty) {
       console.log("Sorry! Not enough in stock. Please try again.");
       startBuying();
        }
      // if(Item_Id === 0) {
      //   console.log("This is not a valid item number. Please select an Item number from the list.")
      //   startBuying();
      //     }
      else {
        console.log("===================================");
        console.log("Great! This item is in stock.");
        console.log("===================================");
        console.log("You've selected:");
        console.log("----------------");
        console.log("Item: " + res[i].Product_Name);
        // console.log("Department: " + res[i].Department_Name);
        console.log("Price: " + res[i].Price);
        console.log("Quantity: " + userPurchase.inputNumber);
        console.log("----------------");
        console.log("Total: " + res[i].Price * userPurchase.inputNumber);
        console.log("===================================");
  
    var newStock = (res[i].Stock_Qty - userPurchase.inputNumber);
                    var purchaseId = (userPurchase.continue);
                    //console.log(newStock);
                    confirmPrompt(newStock, purchaseId);
                }
            }
        });
    });
}
// /=================================Confirm Purchase===============================

function confirmPrompt(newStock, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Are you sure you would like to purchase this item and quantity?",
        default: true

    }]).then(function(userConfirm) {
        if (userConfirm.confirmPurchase === true) {
          // console.log("this is true");
          // console.log(newStock, purchaseId)

//if user confirms purchase, update mysql database with new stock quantity by subtracting user quantity purchased.

            connection.query("UPDATE products SET ? WHERE ?", [{
                Stock_Qty: newStock
            }, 
            {
                Item_Id: purchaseId
            }], function(err, res) {});

            console.log("=================================");
            console.log("Transaction completed. Thank you.");
            console.log("=================================");
            startBuying();
        } else {
            console.log("=================================");
            console.log("No worries. Maybe next time!");
            console.log("=================================");
            startBuying();
        }
    });
}