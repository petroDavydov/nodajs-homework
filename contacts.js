const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const chalk = require("chalk");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const readContent = async () => {
  const contactsPath = await fs.readFile(
    path.join(__dirname, "db", "contacts.json"),
    "utf8"
  );
  const result = JSON.parse(contactsPath);
  return result;
};

const listContacts = async () => {
  return await readContent();
};

const getContactById = async (contactId) => {
  const contact = await readContent();
  const [result] = contact.filter((contact) => contact.id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await readContent();
  const id = contacts.findIndex((item) => contactId === item.id.toString());
  if (id === -1) {
    return;
  }
  const update = contacts.splice(id, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return update;
};

const addContact = async (name, email, phone) => {
  const contact = await readContent();
  const addContact = { id: crypto.randomUUID(), name, email, phone };
  contact.push(addContact);
  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(contact, null, 2)
  );
  return addContact;
};

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
