import React, { useState, useEffect, useRef } from 'react';
import '../assets/style.css';

const Dropdown = ({ options, defaultOption, value, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);

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

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };

  const handleOptionClick = (option) => {
    setValue(option);
    setIsOpen(false);
    setFilteredOptions(options);
  };

  const shouldScroll = filteredOptions.length >= 10;

  return (
    <div className="dropdown mt-2" ref={dropdownRef}>
      <input
        className="form-control dropdown-input w-100 dropdown-btn text-center dropdown-toggle"
        type="text"
        placeholder={defaultOption}
        value={value}
        onChange={handleInputChange}
        onClick={handleToggleDropdown}
      />
      {isOpen && (
        <div className={`dropdown-menu show ${shouldScroll ? 'scrollable' : ''}`}>
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
