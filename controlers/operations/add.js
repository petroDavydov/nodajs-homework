const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const contactsPath = path.join(__dirname, "../db", "contacts.json");

const readContent = async () => {
  const contentJson = await fs.readFile(contactsPath, "utf8");
  const result = JSON.parse(contentJson);
  return result;
};

const addContact = async (name, email, phone) => {
  const contact = await readContent();
  const addContact = { id: crypto.randomUUID(), name, email, phone };
  contact.push(addContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contact, null, 2)
  );
  return addContact;
};

module.exports = addContact;
