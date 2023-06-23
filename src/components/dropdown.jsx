import React, { useState, useEffect, useRef } from 'react';
import '../assets/CustomDropdown.css';

const Dropdown = ({ options, defaultOption, value, setValue }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchTerm)
    );
    setFilteredOptions(filteredOptions);
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setValue(option);
    setIsOpen(false);
  };

  const shouldScroll = filteredOptions.length >= 10; 
  return (
    <div className="dropdown mt-2" ref={dropdownRef}>
      <button
        className="btn dropdown-btn dropdown-toggle w-100"
        type="button"
        onClick={handleToggleDropdown}
      >
        {value || defaultOption}
      </button>
      {isOpen && (
        <div className={`dropdown-menu show ${shouldScroll ? 'scrollable' : ''}`}>
          <input
            type="text"
            className="form-control dropdown-search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="dropdown-options">
            {filteredOptions.map((option, index) => (
              <button
                key={index}
                className="dropdown-item"
                type="button"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
