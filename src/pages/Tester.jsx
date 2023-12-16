import { useState, useEffect } from 'react';
import { usePostDestination } from '../API/submit/postDestination';
import { useGetOrigin } from '../API/request/getOrigin';
import Dropdown from '../components/dropdown';
import DropdownInput from '../components/Dropdown-input';

function DestinationForm() {
  const [destionationDropdownValue, setdestionationDropdownValue] = useState('');
  const [originDropdownValue, setOriginDropdownValue] = useState('');

  const { mutate, isLoading: isDestinationLoading, isError: isDestinationError, data: destinationData, error: destinationError } = usePostDestination();

  const getOrigin = useGetOrigin()?.data?.data || [];
  const filterOrigin = getOrigin.map((item) => item.origin);
  console.log(filterOrigin);

  const filterDestination = destinationData?.data || [];
  const destination = filterDestination.map((item) => item.destination);
  console.log(destination);

  useEffect(() => {
    const handPostDestination = async () => {
      const origin = {
        origin: originDropdownValue,
      };
      await mutate(origin);
      setdestionationDropdownValue(''); 
    };

    if (originDropdownValue) {
      handPostDestination();
    }
  }, [originDropdownValue, mutate]);

  return (
    <>
      {filterOrigin.length > 0 ? (
        <Dropdown
          options={filterOrigin}
          defaultOption="-- Select Origin --"
          value={originDropdownValue}
          setValue={setOriginDropdownValue}
        />
      ) : (
        <button className="btn-primary w-100 dropdown-display mt-2" disabled>
          No Origin Available
        </button>
      )}
      {!isDestinationLoading && !isDestinationError && (
        <div>
          <DropdownInput
            options={destination}
            defaultOption="--- Select Destination ---"
            value={destionationDropdownValue}
            setValue={setdestionationDropdownValue}
          />
        </div>
      )}
    </>
  );
}

export default DestinationForm;
