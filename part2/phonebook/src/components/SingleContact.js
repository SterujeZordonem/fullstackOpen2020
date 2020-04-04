import React from 'react'
import '../'
import contactService from '../services/contacts'

const SingleContact = ({contacts, setContacts, searchFilter, setNotificationMessage, setNotificationStyle, notificationStyle}) => {

  const contactsToShow = () => {
    // if there is NO INPUT - show all contacts
    if(searchFilter.length === 0){
      return contacts
    // otherwise, show only contacts that include "filter" (case sensitive)
    } else {
      return contacts.filter(contact => (contact.name.toLowerCase().includes(searchFilter.toLowerCase()) || contact.number.includes(searchFilter)))
    }
  }

  const handleDeleteButton = (id) => {
    if (window.confirm("Do you really want to delete this element?")) { 
      contactService
        .remove(id)
        .catch(error=>{
          // If error happens - show notification about this, and change style for one with red text
          setNotificationStyle('error')
          setNotificationMessage(
            `Information of ${contacts.find(contact=> contact.id === id).name} has already been removed from the server`
          )
          
          // After 3 seconds hide error message and change style back to 'positive'.
          setTimeout(()=>{
            setNotificationMessage(null)
            setNotificationStyle('positive')
          }
            ,3000)
        })
      // after removing contact from the server, contact also has to be removed from the 'contacts' state variable
      setContacts(contacts.filter(contact => contact.id !== id))
    }
  }

  return (
    <div>
      {contactsToShow().map((obj) => 
        <div className="singleContact" key={obj.id}>
          <p>{obj.name} {obj.number}</p>
          <button onClick={() => handleDeleteButton(obj.id)} >delete</button>
        </div>
      )}
      
    </div>
  )
}

export default SingleContact