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

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log(chalk.cyan.bold("Table List Contacts"));
      console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (contactById) {
        console.log(chalk.blue.bold("Contact Found !"));
        console.table(contactById);
      } else {
        console.log(chalk.red.bold("Contact Not Found"));
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

invokeAction(argv).then(() =>
  console.log(chalk.green.bold("Operation Success!"))
);
