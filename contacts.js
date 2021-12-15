const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, 'Db', 'contacts.json');
// console.log(contactsPath);
 
const readContent = async () =>{
    const content = await fs.readFile(contactsPath , 'utf8')
    const result = JSON.parse(content)
    return result
}

// TODO: задокументировать каждую функцию
const  listContacts = async () => {
return await readContent()
  }
  
const  getContactById = async(contactId) => {
    const contacts = await readContent();
    const [result] = contacts.filter((contact) => contact.id === contactId);
    return result;
  }
  
const removeContact = async(contactId) => {
    const contacts = await readContent();
    const DeletedContact = contacts.findIndex(option => option.id === contactId);
    console.log(DeletedContact);
    if (DeletedContact >=0 ) {
      const deletedContact = contacts.splice(DeletedContact, 1)
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
      return deletedContact
    }

  }
  
 const addContact = async(name, email, phone) => {
    const contacts = await readContent();
    const newContact = {name, email, phone, id:crypto.randomUUID()};
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact
  }

  module.exports = {listContacts, getContactById, removeContact, addContact }