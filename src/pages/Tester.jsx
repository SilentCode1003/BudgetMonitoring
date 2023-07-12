import React, { useState, useEffect } from 'react';
import { useGetOrigin } from '../API/request/getOrigin';
import { usePostDestination } from '../API/submit/postDestination';

const MyComponent = () => {
  const [originOptions, setOriginOptions] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [destinationOptions, setDestinationOptions] = useState([]);
  
  const getOriginData = useGetOrigin()?.data?.data || [];
  
  useEffect(() => {
    const filteredOrigins = getOriginData.map(item => item.origin);
    setOriginOptions(filteredOrigins);
  }, [getOriginData]);
  
  useEffect(() => {

    if (selectedOrigin) {

      const destinationData = usePostDestination(selectedOrigin)?.data?.data || [];
      const filteredDestinations = destinationData.map(item => item.destination);
      setDestinationOptions(filteredDestinations);
    } else {
      setDestinationOptions([]);
    }
  }, [selectedOrigin]);
  
  const handleOriginChange = (event) => {
    setSelectedOrigin(event.target.value);
  };
  
  return (
    <div>
      <select value={selectedOrigin} onChange={handleOriginChange}>
        {originOptions.map((origin, index) => (
          <option key={index} value={origin}>{origin}</option>
        ))}
      </select>
      <select>
        {destinationOptions.map((destination, index) => (
          <option key={index} value={destination}>{destination}</option>
        ))}
      </select>
    </div>
  );
};

export default MyComponent;
