// index.js
const chalk = require("chalk");
const { Command } = require("commander");
const {
  addContact,
  removeContact,
  getContactById,
  listContacts,
} = require("./contacts");
const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      // ...
      break;

    case "get":
      const contactById = await getContactById(id);
      if (contactById) {
        console.log(chalk.green.bold("Contact Found..."));
        console.table(contactById);
      } else {
        console.log(chalk.red.bold("Contact Not Found 👀"));
      }
      // ... id
      break;

    case "add":
      const contact = await addContact(name, email, phone);
      console.log(chalk.blue.bgGreenBright.bold("Add new contact!"));
      console.table(contact);

      // ... name email phone
      break;
// =================
    case "remove":
      const removedContact = await removeContact(id);
      if (removedContact) {
        console.table(removedContact);
      } else {
        console.log(chalk.yellow("Incorrect contactId. Try again, plese!"));
      }
      // ... id
      break;
// ===================
    default:
      console.warn(chalk.red("Unknown action type!"));
  }
};

invokeAction(argv).then(() =>
  console.log(chalk.red.bgCyan.bold("Operation Success!"))
);
