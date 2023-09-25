import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import {
  ContactsListBtn,
  ContactsListItem,
  ContactsListItems,
} from './ContactsList.styled';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const allContacts = useSelector(state => state.contactData.contacts);
  const filterQuery = useSelector(state => state.contactData.filter);

  const displayedContact = allContacts.filter(contact =>
    contact.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <ContactsListItems>
      {displayedContact.map(contact => (
        <ContactsListItem key={contact.id}>
          {contact.name}: {contact.number}
          <ContactsListBtn onClick={() => dispatch(deleteContact(contact.id))}>
            Delete
          </ContactsListBtn>
        </ContactsListItem>
      ))}
    </ContactsListItems>
  );
};
