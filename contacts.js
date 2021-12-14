const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const readContent = async () => {
  const contentJson = await fs.readFile(contactsPath, "utf8");
  const result = JSON.parse(contentJson);
  return result;
};

const listContacts = async () => {
  const result = await readContent();
  return result;
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
