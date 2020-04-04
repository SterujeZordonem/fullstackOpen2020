import React from 'react'
import contactService from '../services/contacts'

const PersonForm = (props) =>{
  const {contacts, setContacts, newContact, setNewContact, number, setNumber} = props;
  

	const handleForm = (event) => {
		event.preventDefault();
		
		// Create new contact based on user's input
		const contact = {
		  name: newContact,
      number: number,
		}
  
    // ---- CONTACT VALIDITY CHECK ---- //
    
    // a) is there contact with such a name in phonebook already
		if(contacts.find(el => el.name === newContact))
		{
      const alreadyExistingContact = contacts.find(el => el.name === newContact)
      // Pops Up window asking user whether he wants update contact or not
      const replace = window.confirm(`${alreadyExistingContact.name} is already added to the phonebook, replace the old number with a new one?`)
      // If he wants update contact, he updates the  contact
      if(replace){
        contactService
        .update(alreadyExistingContact.id, contact)
        .then(updatedContact => setContacts(contacts.map(contact => contact.id !== alreadyExistingContact.id ? contact : updatedContact)))
      }
      
		}
		// b) is number valid 
		else if(isNaN(number) || number.length === 0){
		  window.alert('Invalid phone number!');
    } 
    
		// If everythings OK - ADD contact to the phonebook
		else{
      contactService
      .create(contact)
      .then(newcontact => {
        setContacts(contacts.concat(newcontact));
        // Show notification, that contact was added.
        props.setNotificationMessage(`Added ${newcontact.name}`)
        setTimeout(
          ()=>props.setNotificationMessage(null)
        ,3000)
      })
    }
    // After operation, set 'name' and 'number' back to empty fields
    setNewContact("");
    setNumber("");
	}

	return (
		<form onSubmit={handleForm}>
			<div>
				name: <input type="text" value={newContact} onChange={e => setNewContact(e.target.value)} />
			</div>
			<div>
				number: <input type="text" value={number} onChange={e => setNumber(e.target.value)}  />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}


export default PersonForm