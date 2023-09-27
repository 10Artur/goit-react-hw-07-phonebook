// import { useDispatch } from 'react-redux';
// import { updateFilter } from 'redux/contactsSlice';
// import { useEffect } from 'react';
// import { FilterContainer, FilterInput, FilterLabel } from './Filter.styled';

// export const Filter = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(updateFilter(''));
//   }, [dispatch]);

//   const handleFilterChange = evt => {
//     let filterQuery = evt.target.value.trim();

//     dispatch(updateFilter(filterQuery));
//   };

//   return (
//     <FilterContainer>
//       <FilterLabel htmlFor="filterInput">
//         Find contacts by name:
//         <FilterInput
//           id="filterInput"
//           onChange={handleFilterChange}
//           placeholder="Search contact..."
//         ></FilterInput>
//       </FilterLabel>
//     </FilterContainer>
//   );
// };

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
