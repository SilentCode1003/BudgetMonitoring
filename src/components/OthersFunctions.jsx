import Swal from 'sweetalert2';

export const handleAddOthers = (
    othersData,
    typeDropdownValue,
    typePriceDropdownValue,
    setOthersData,
    setTypeDropdownValue,
    setTypePriceDropdownValue,
) => {
  if(
    typeDropdownValue === '' ||
    typePriceDropdownValue === ''
  ){
    Swal.fire({
      title: 'Invalid Input',
      text: 'Please select values for all dropdowns.',
      icon: 'error',
    });
    return;
  }
/*   const isDuplicate = othersData.some(
    (othersData) =>
      othersData.type === typeDropdownValue &&
      othersData.typePrice === typePriceDropdownValue
  );

  if (isDuplicate) {
    Swal.fire({
      title: 'Duplicate Entry',
      text: 'This Data already exists in the table.',
      icon: 'error',
    });
    return;
  } */

  const newOthersData = {
    type: typeDropdownValue,
    typePrice: typePriceDropdownValue
  };

  setOthersData([...othersData, newOthersData]);

  setTypeDropdownValue('');
  setTypePriceDropdownValue('');
};

export const handleRemoveOthersData = (index, othersData, setOthersData) => {
  const updateOthersData = [...othersData];
  updateOthersData.splice(index, 1);
  setOthersData(updateOthersData);
};

export const handleClearOthersData = (setOthersData) => {
  setOthersData([]);
};
