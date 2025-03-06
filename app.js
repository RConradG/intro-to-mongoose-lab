/*------------------------------- Imports -------------------------------*/
const prompt = require("prompt-sync")();
const Customer = require("./models/customer.js");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

/*------------------------------ String Functions -----------------------------*/

const promptUser = () => console.log("\nWhat is your choice: ");
const showInvalidEntry = () => console.log(`\nThat is an invalid entry!
Please enter a number between 1 and 5`)

const greetUser = () => console.log("Welcome to the CRM!")
const showUserOptions = () => {
  console.log(`\nWhat would you like to do?\n
1. Create a customer 
2. View all customers 
3. Update a customer
4. Delete a customer
5. Exit the CRM\n`);
};
const showConnectMessage = () => console.log("Connected to MongoDB!")
const showDisconnectMessage = () => console.log(`Disconnected from MongoDB!
Thank you for using the CRM!`)

/*------------------------------ Connection to MongoDB -----------------------------*/


const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  showConnectMessage();
  greetUser();
  menu();
};

connect();

/*------------------------------ Query Functions -----------------------------*/

const createCustomer = async (name, age) => {
  const customerData = {
    name: name,
    age: age,
  };
  const customer = await Customer.create(customerData);
  console.log(
    `\nNew customer created!\nid: ${customer.id}, -- Name: ${customer.name}, Age: ${customer.age}`
  );
};

const findCustomers = async () => {
  const customers = await Customer.find({});
  console.log("\nHere is a list of all customers:\n");
  customers.forEach((customer) =>
    console.log(
      `id: ${customer.id}, -- Name: ${customer.name}, Age: ${customer.age}`
    )
  );
};

const updateCustomer = async () => {
  await findCustomers();

  console.log(
    "\nCopy and paste the id of the customer you would like to update:"
  );
  const customerId = prompt();

  console.log("\nWhat is the customer's new name?");
  let newName = prompt();

  console.log("What is the customer's new age?");
  let newAge = await parseInt(prompt());

  const updatedCustomer = await Customer.findByIdAndUpdate(
    customerId,
    { name: newName, age: newAge },
    { new: true }
  );
  console.log(
    "\nCustomer Updated! Here is the new customer's info:",
    updatedCustomer
  );
};

const deleteCustomer = async () => {
  await findCustomers();
  console.log(
    "\nCopy and paste the id of the customer you would like to delete:"
  );
  const id = prompt();
  const removedCustomer = await Customer.findByIdAndDelete(id);
  console.log("\nRemoved customer: ", removedCustomer);
};

/*------------------------------ CRM Functionality -----------------------------*/

const menu = async () => {
  let userChoice;
  while (true) {
    showUserOptions();
    promptUser();
    userChoice = parseInt(prompt());

    // Check if the user input is in range
    while (isNaN(userChoice) || userChoice < 1 || userChoice > 5) {
      showInvalidEntry();
      showUserOptions();
      promptUser();
      userChoice = parseInt(prompt());
    }

    try {
      if (userChoice === 1) {
        let customerName = prompt("Enter customer name: ");
        let customerAge = parseInt(prompt("Enter customer age: "));
        await createCustomer(customerName, customerAge);
     
      } else if (userChoice === 2) {
        await findCustomers();
      
      } else if (userChoice === 3) {
        await updateCustomer();
      
      } else if (userChoice === 4) {
        await deleteCustomer();
      
      } else if (userChoice === 5) {
        await mongoose.disconnect();
        showDisconnectMessage();
        process.exit(); // Exit the program
      
      } else {
        showInvalidEntry();
      }
    } catch (TypeError) {
      showInvalidEntry();
    }
  }
};

 

