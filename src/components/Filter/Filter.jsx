import { useDispatch } from 'react-redux';
import { updateFilter } from 'redux/contactsSlice';
import { useEffect } from 'react';
import { FilterContainer, FilterInput, FilterLabel } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFilter(''));
  }, [dispatch]);

  const handleFilterChange = evt => {
    let filterQuery = evt.target.value.trim();

    dispatch(updateFilter(filterQuery));
  };

  return (
    <FilterContainer>
      <FilterLabel htmlFor="filterInput">
        Find contacts by name:
        <FilterInput
          id="filterInput"
          onChange={handleFilterChange}
          placeholder="Search contact..."
        ></FilterInput>
      </FilterLabel>
    </FilterContainer>
  );
};
