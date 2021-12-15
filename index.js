const chalk = require('chalk');
const { Command } = require('commander');
const {listContacts, getContactById, removeContact, addContact} = require('./contacts');

const program = new Command();
program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
   const contacts = await listContacts();
   console.table(contacts);
      break;

    case 'get':
     const cotactById = await getContactById(id);
        if (cotactById) {
            console.log(chalk.green('contact found'));
            console.log(cotactById); 
        } else {
            console.log(chalk.yellow('contact not found'));
        }
      break;

    case 'add':
     const contact = await addContact(name, email, phone)
     console.log(chalk.green('add new contact'));
     console.log(contact);
      break;

    case 'remove':
     const deletedContact = await removeContact(id);
     if (deletedContact) {
      console.log(chalk.green('contact found and deleted'));
      console.log(deletedContact); 
     } else {
      console.log(chalk.yellow('contact not found'));
     }

      break;

    default:
      console.warn(chalk.red('31m Unknown action type!'));
  }
}

invokeAction(argv).then(() => console.log(chalk.green('operation cuccess')));
