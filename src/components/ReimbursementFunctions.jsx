import Swal from 'sweetalert2';

export const handleAddReimbursement = (
  locationDropdownValue,
  originDropdownValue,
  destinationDropdownValue,
  modeTransactionDropdownValue,
  reimburse,
  setReimburse,
  setLocationDropdownValue,
  setOriginDropdownValue,
  setDestinationDropdownValue,
  setModeTransactionDropdownValue,
) => {
  if (
    locationDropdownValue === '' ||
    originDropdownValue === '' ||
    destinationDropdownValue === '' ||
    modeTransactionDropdownValue === ''
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
      reimburse.modeTransaction === modeTransactionDropdownValue
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
    modeTransaction: modeTransactionDropdownValue,
  };

  setReimburse([...reimburse, newReimburse]);

  setLocationDropdownValue('');
  setOriginDropdownValue('');
  setDestinationDropdownValue('');
  setModeTransactionDropdownValue('');
};

export const handleRemoveReimburse = (index, reimburse, setReimburse) => {
  const updateReimburse = [...reimburse];
  updateReimburse.splice(index, 1);
  setReimburse(updateReimburse);
};

export const handleClearReimburse = (setReimburse) => {
  setReimburse([]);
};

export const validateNumberInput = () => {
  const numberInputs = document.querySelectorAll('.number-validator');

  numberInputs.forEach(function (input) {
    input.addEventListener('input', function () {
      const inputValue = this.value;

      if (inputValue.length === 1 && inputValue === '0') {
        this.value = '';
      } else if (!/^\d*$/.test(inputValue)) {
        this.value = inputValue.replace(/\D/g, '');
      }
    });
  });
};