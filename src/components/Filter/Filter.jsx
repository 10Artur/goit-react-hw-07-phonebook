import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { setFilter } from 'redux/contactsSlice';
import { FilterContainer, FilterInput, FilterLabel } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleInputChange = evt => {
    const contacToFind = evt.target.value;

    dispatch(setFilter(contacToFind));
  };

  return (
    <FilterContainer>
      <FilterLabel htmlFor="filterInput">
        Find contacts by name:
        <FilterInput
          id="filterInput"
          onChange={handleInputChange}
          placeholder="Search contact..."
          value={filter}
        ></FilterInput>
      </FilterLabel>
    </FilterContainer>
  );
};
