

/*------------------------------- Starter Code -------------------------------*/
const prompt = require("prompt-sync")();
const Customer = require("./models/customer.js")
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await runQueries();

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

const runQueries = async () => {
  console.log("Queries running.");
  // The functions calls to run queries in our db will go here as we write them.
};

connect();
/*------------------------------ Query Functions -----------------------------*/
const createCustomer = async(name, age) => {
  const customerData = {
    name: name,
    age: age, 
  }

  const customer = await Customer.create(customerData);

}

function viewAllCustomers() {
  // grab all customers from db
}
function updateCustomer() {
  // use getandupdatebyID method
}
function deleteCustomer() {
  // use getanddeletebyId method
}
function quit() {
  // exit program
}


const USER_GREETING =  "Welcome to the CRM!\n"
const USER_QUESTION = "What would you like to do?\n"
const USER_OPTIONS = "1. Create a customer" + 
"\n2. View all customers" + 
"\n3. Update a customer" +
"\n4. Delete a customer" +
"\n5. Exit the CRM\n";
const PROMPT_TO_USER = "What is your choice: "


const INVALID_ENTRY = "That is an invalid entry!\nPlease enter a number between 1 and 5: ";


console.log(USER_GREETING);
console.log(USER_QUESTION);
console.log(USER_OPTIONS);

let userChoice = parseInt(prompt(PROMPT_TO_USER));
let userChoiceInRange = (userChoice >= 1) && (userChoice < 5);

while(userChoiceInRange) {
  
  if(userChoice === 1) {
    let customerName = prompt("Enter customer name: ")
    let customerAge = parseInt(prompt("Enter customer age: "))
    console.log(`Customer ${customerName} whose age is ${customerAge} created!`)
    createCustomer(customerName, customerAge);
  
  } else if(userChoice === 2){
    
    
  } else if(userChoice === 3){
    
  } else if(userChoice === 4){
    
  } else if(userChoice === 5){
    break;
  } else {
    console.log(INVALID_ENTRY);
  }
  
  userChoice = parseInt(prompt(PROMPT_TO_USER));
  console.log(USER_QUESTION);

}
  
  
  
  
  
  


  

// make greeting
// take in user input; have to wait until user enters a number between 1 and 5
// do...while; while, while-loop with if-conditional,





