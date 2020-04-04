import React, {useState, useEffect} from 'react';

import './App.css'

import contactService from './services/contacts'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import SingleContact from './components/SingleContact';
import Notification from './components/Notification'


function App() {
  const[contacts, setContacts] = useState([]);

  const[newContact, setNewContact] = useState("");
  const[number, setNumber] = useState("");

  const[searchFilter, setSearchFilter] = useState("");

  const[notificationMessage, setNotificationMessage] = useState(null);
  const[notificationStyle, setNotificationStyle] = useState('positive')

  // Get all contacts from the server - it happens only one time after first render ([])
  useEffect(() => {
    contactService
    .getAll()
    .then(initialValue=>{
      setContacts(initialValue)
    })}, [])
 
  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification message={notificationMessage} style={notificationStyle} />
      <Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
      <h3>add a new</h3>
      <PersonForm contacts={contacts} setContacts={setContacts} newContact={newContact} setNewContact={setNewContact} number={number} setNumber={setNumber} notificationMessage={notificationMessage} setNotificationMessage={setNotificationMessage}/>
      <h3>Numbers</h3>
      <SingleContact searchFilter={searchFilter} contacts={contacts} setContacts={setContacts} setNotificationMessage={setNotificationMessage} notificationStyle={notificationStyle} setNotificationStyle={setNotificationStyle} />
    </div>
  )
}

export default App;
