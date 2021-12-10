const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const chalk = require("chalk");

// contacts.js

/*
 * Раскомментируй и запиши значение
 * const contactsPath = ;
 */
const contactsPath = path.join(__dirname, "./db/contacts.json");

const readContent = async () => {
  const contactsPath = await fs.readFile(
    path.join(__dirname, "db", "contacts.json"),
    "utf8"
  );
  const result = JSON.parse(contactsPath);
  return result;
};

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  return await readContent();
  // ...твой код
};

const getContactById = async (contactId) => {
  const contact = await readContent();
  const [result] = contact.filter((contact) => contact.id === contactId);
  return result;

  // ...твой код
};
// ========================
const removeContact = async (contactId) => {
  const contacts = await readContent();
  const id = contacts.findIndex((item) => contactId === item.id.toString());
  if (id === -1) {
    return console.log(chalk.red("Incorrect contactId. Try again, plese!"));  }

  const update = contacts.splice(id, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return update;
  // ...твой код
};
// ==================
const addContact = async (name, email, phone) => {
  const contact = await readContent();
  const addContact = { name, email, phone, id: crypto.randomUUID() };
  contact.push(addContact);
  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),"utf8",
    JSON.stringify(contact, null, 2)
  );
  return addContact;
};
// ...твой код

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
// ======================
// ===================
// ================
