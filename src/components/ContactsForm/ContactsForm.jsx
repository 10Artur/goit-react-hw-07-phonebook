import { Formik } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import {
  ContactsError,
  ContactsField,
  ContactsForm,
  ContactsLabel,
  ContactsBtn,
} from './ContactsForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';

export const ContactForm = () => {
  const allContacts = useSelector(state => state.contactData.contacts);
  const dispatch = useDispatch();

  const ContactsFormSchema = Yup.object().shape({
    name: Yup.string()
      .test('is-unique', 'Name already exists', name => {
        const existingName = allContacts.find(
          contact => contact.name.toLowerCase() === name.toLowerCase()
        );
        return !existingName;
      })
      .required('Name is required!'),
    number: Yup.string().min(10).max(12).required('Number is required!'),
  });

  const handleSubmit = (values, action) => {
    const contact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    dispatch(addContact(contact));
    action.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={ContactsFormSchema}
      onSubmit={handleSubmit}
    >
      <ContactsForm>
        <ContactsLabel>
          Name
          <ContactsField
            type="text"
            name="name"
            placeholder="Enter your name..."
          />
          <ContactsError component="div" name="name" />
        </ContactsLabel>

        <ContactsLabel>
          Number
          <ContactsField
            type="tel"
            name="number"
            placeholder="Enter your number..."
          />
          <ContactsError component="div" name="number" />
        </ContactsLabel>

        <ContactsBtn type="submit">Add contact</ContactsBtn>
      </ContactsForm>
    </Formik>
  );
};
