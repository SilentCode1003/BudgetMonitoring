import Swal from 'sweetalert2';

export const handleAddReimbursement = (
  locationDropdownValue,
  originDropdownValue,
  destinationDropdownValue,
  modeTransportationDropdownValue,
  reimburse,
  totalPrice,
  setReimburse,
  setLocationDropdownValue,
  setOriginDropdownValue,
  setDestinationDropdownValue,
  setModeTransportationDropdownValue,
  setTotalPrice
) => {
  if (
    locationDropdownValue === '' ||
    originDropdownValue === '' ||
    destinationDropdownValue === '' ||
    modeTransportationDropdownValue === '' ||
    totalPrice === ''
  ) {
    Swal.fire({
      title: 'Invalid Input',
      text: 'Please select values for all dropdowns.',
      icon: 'error',
    });
    return;
  }

  const isDuplicate = reimburse.some(
    (reimburse) =>
      reimburse.location === locationDropdownValue &&
      reimburse.origin === originDropdownValue &&
      reimburse.destination === destinationDropdownValue &&
      reimburse.modeTransaction === modeTransportationDropdownValue &&
      reimburse.price === totalPrice
  );

  if (isDuplicate) {
    Swal.fire({
      title: 'Duplicate Entry',
      text: 'This reimburse already exists in the table.',
      icon: 'error',
    });
    return;
  }

  const newReimburse = {
    location: locationDropdownValue,
    origin: originDropdownValue,
    destination: destinationDropdownValue,
    modeTransaction: modeTransportationDropdownValue,
    price: totalPrice
  };

  setReimburse([...reimburse, newReimburse]);

  setLocationDropdownValue('');
  setOriginDropdownValue('');
  setDestinationDropdownValue('');
  setModeTransportationDropdownValue('');
};

export const handleRemoveReimburse = (index, reimburse, setReimburse) => {
  const updateReimburse = [...reimburse];
  updateReimburse.splice(index, 1);
  setReimburse(updateReimburse);
};

export const handleClearReimburse = (setReimburse) => {
  setReimburse([]);
};
