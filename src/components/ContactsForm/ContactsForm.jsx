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
  const ContactsFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    number: Yup.string().min(10).max(20).required('Number is required!'),
  });

  const dispatch = useDispatch();

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
                format="+380 (##) ## ## ###"
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
