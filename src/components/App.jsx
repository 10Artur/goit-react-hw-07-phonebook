import { ContactForm } from './ContactsForm/ContactsForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { AppTitle1, AppTitle2, Container, GlobalStyle } from './GlobalStyle';

export const App = () => {
  return (
    <Container>
      <AppTitle1>Phonebook</AppTitle1>
      <ContactForm />
      <AppTitle2>Contacts</AppTitle2>
      <Filter />
      <ContactsList />
      <GlobalStyle />
    </Container>
  );
};
