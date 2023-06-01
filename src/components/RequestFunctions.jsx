import Swal from 'sweetalert2';

export const handleAddRequest = (
  storeDropdownValue,
  issueDropdownValue,
  concernDropdownValue,
  requests,
  setRequests,
  setStoreDropdownValue,
  setIssueDropdownValue,
  setConcernDropdownValue
) => {
  if (
    storeDropdownValue === '' ||
    issueDropdownValue === '' ||
    concernDropdownValue === ''
  ) {
    Swal.fire({
      title: 'Invalid Input',
      text: 'Please select values for all dropdowns.',
      icon: 'error',
    });
    return;
  }

  const isDuplicate = requests.some(
    (request) =>
      request.store === storeDropdownValue &&
      request.issue === issueDropdownValue &&
      request.concern === concernDropdownValue
  );

  if (isDuplicate) {
    Swal.fire({
      title: 'Duplicate Entry',
      text: 'This request already exists in the table.',
      icon: 'error',
    });
    return;
  }

  const newRequest = {
    store: storeDropdownValue,
    issue: issueDropdownValue,
    concern: concernDropdownValue,
  };

  setRequests([...requests, newRequest]);

  setStoreDropdownValue('');
  setIssueDropdownValue('');
  setConcernDropdownValue('');
};

export const handleRemoveRequest = (index, requests, setRequests) => {
  const updatedRequests = [...requests];
  updatedRequests.splice(index, 1);
  setRequests(updatedRequests);
};

export const handleClearRequests = (setRequests) => {
  setRequests([]);
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