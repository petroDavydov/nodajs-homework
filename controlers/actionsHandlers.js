const chalk = require("chalk");

const {
  addContact,
  removeContact,
  getContactById,
  listContact,
} = require("./operations");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
		
      const contacts = await listContact();
      console.log(chalk.cyan.bold("Table List Contacts"));
      console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (contactById) {
        console.log(chalk.blue.bold("Contact Found !"));
        console.table(contactById);
        console.log(chalk.blue.bold("Good job,that`s my boy 😺❗"))
      } else {
        console.log(chalk.red.bold("Contact Not Found"));
        console.log(chalk.red.bold("Or did`n make or forgot😒"));
      }
      break;

    case "add":
      const contact = await addContact(name, email, phone);
      console.log(chalk.blue.bold("Add new contact!"));
      console.table(contact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      if (removedContact) {
        console.log(chalk.redBright("Remove contact..."));

        console.table(removedContact);
      } else {
        console.log(chalk.yellow("Incorrect contactId. Try again, plese!"));
      }
      break;

    default:
      console.warn(chalk.red("Unknown action type!"));
  }
};

module.exports = invokeAction;
