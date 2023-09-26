import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operations';
import {
  selectIsLoading,
  selectIsError,
  selectDisplayedContacts,
} from 'redux/selectors';
import {
  ContactsListBtn,
  ContactsListItem,
  ContactsListItems,
} from './ContactsList.styled';
import { useEffect } from 'react';

export const ContactsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectIsError);
  const displayedContacts = useSelector(selectDisplayedContacts);

  return (
    <div>
      {isLoading && !error && <b>Loading...</b>}
      {error && <p>There was an error fetching contacts: {error}</p>}
      {!isLoading && !error && (
        <ContactsListItems>
          {displayedContacts.length === 0 ? (
            <p>No contacts!</p>
          ) : (
            displayedContacts.map(({ id, name, phone }) => (
              <ContactsListItem key={id}>
                {name}: {phone}
                <ContactsListBtn onClick={() => dispatch(deleteContact(id))}>
                  Delete
                </ContactsListBtn>
              </ContactsListItem>
            ))
          )}
        </ContactsListItems>
      )}
    </div>
  );
};
