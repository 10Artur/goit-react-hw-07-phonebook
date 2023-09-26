// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { nanoid } from 'nanoid';
// import {
//   ContactsError,
//   ContactsField,
//   ContactsForm,
//   ContactsLabel,
//   ContactsBtn,
// } from './ContactsForm.styled';
// import { useDispatch, useSelector } from 'react-redux';
// import { addContact } from 'redux/contactsSlice';

// export const ContactForm = () => {
//   const allContacts = useSelector(state => state.contactData.contacts);
//   const dispatch = useDispatch();

//   const ContactsFormSchema = Yup.object().shape({
//     name: Yup.string()
//       .test('is-unique', 'Name already exists', name => {
//         const existingName = allContacts.find(
//           contact => contact.name.toLowerCase() === name.toLowerCase()
//         );
//         return !existingName;
//       })
//       .required('Name is required!'),
//     number: Yup.string().min(10).max(12).required('Number is required!'),
//   });

//   const handleSubmit = (values, action) => {
//     const contact = {
//       id: nanoid(),
//       name: values.name,
//       number: values.number,
//     };

//     dispatch(addContact(contact));
//     action.resetForm();
//   };

//   return (
//     <Formik
//       initialValues={{
//         name: '',
//         number: '',
//       }}
//       validationSchema={ContactsFormSchema}
//       onSubmit={handleSubmit}
//     >
//       <ContactsForm>
//         <ContactsLabel>
//           Name
//           <ContactsField
//             type="text"
//             name="name"
//             placeholder="Enter your name..."
//           />
//           <ContactsError component="div" name="name" />
//         </ContactsLabel>

//         <ContactsLabel>
//           Number
//           <ContactsField
//             type="tel"
//             name="number"
//             placeholder="Enter your number..."
//           />
//           <ContactsError component="div" name="number" />
//         </ContactsLabel>

//         <ContactsBtn type="submit">Add contact</ContactsBtn>
//       </ContactsForm>
//     </Formik>
//   );
// };

import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import {
  ContactsError,
  ContactsField,
  ContactsForm,
  ContactsLabel,
  ContactsBtn,
} from './ContactsForm.styled';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';
import { PatternFormat } from 'react-number-format';

export const ContactForm = () => {
  const dispatch = useDispatch();

  const ContactsFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    number: Yup.string().min(10).max(12).required('Number is required!'),
  });

  const handleSubmit = (values, action) => {
    const newContact = {
      name: values.name,
      phone: values.number,
    };

    dispatch(addContact(newContact));
    action.resetForm();
  };

  const handleNumberChange =
    form =>
    ({ formattedValue }) => {
      form.setFieldValue('number', formattedValue);
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
          <Field name="number">
            {({ field, form }) => (
              <PatternFormat
                format="+1 (###) #### ###"
                allowEmptyFormatting
                mask="_"
                value={form.values.number}
                onValueChange={handleNumberChange(form)}
                {...field}
              />
            )}
          </Field>
          <ContactsError component="div" name="number" />
        </ContactsLabel>

        <ContactsBtn type="submit">Add contact</ContactsBtn>
      </ContactsForm>
    </Formik>
  );
};
