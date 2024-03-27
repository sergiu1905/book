import './BookFlight.css';
import { useState } from 'react';
export default function BookFlight() {
  const [selectedOption, setSelectedOption] = useState('');
  const [oneWayDate, setOneWayDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const [isBooked, setIsBooked] = useState(false);
  const handleChangeOption = (event) => {
    const optionFlight = event.target.value;
    setSelectedOption(optionFlight);
  };
  const handleOneWayDate = (event) => {
    setOneWayDate(event.target.value);
  };
  const handleReturnDate = (event) => {
    setReturnDate(event.target.value);
  };
  const handleBookButton = () => {
    if (!oneWayDate) {
      alert('please choose a departure date');
      return;
    }
    if (selectedOption === 'option2' && !returnDate) {
      alert('please choose a return date');
      return;
    }
    const confirmation = window.confirm(
      `Are you sure you want to book the flight on ${oneWayDate} ${
        returnDate ? 'and return on ' + returnDate : ''
      }`
    );
    if (confirmation) {
      setIsBooked(true);
      setOneWayDate('');
      setReturnDate('');
      setSelectedOption('');
      setTimeout(() => {
        setIsBooked(false);
      }, 5000);
    }
  };

  const currentDate = new Date().toISOString().split('T')[0];
  const isOptionNotSelected =
    selectedOption !== 'option1' && selectedOption !== 'option2';
  return (
    <div className="page">
      <div className="container">
        <div className="header">
          <div className="decoration">
            <div className="circle red"></div>
            <div className="circle yellow"></div>
            <div className="circle green"></div>
            <div>
              <h3>Book Flight</h3>
            </div>
          </div>
        </div>
        <div className="container_body">
          <div>
            <select
              className="container_options"
              id="options"
              value={selectedOption}
              onChange={handleChangeOption}
            >
              <option>
                <span>Select a option</span>{' '}
              </option>
              <option value="option1">
                <span>one-way flight</span>
              </option>
              <option value="option2">
                <span>return flight</span>
              </option>
            </select>
          </div>
          <div className="container_date">
            <input
              type="date"
              value={oneWayDate}
              onChange={handleOneWayDate}
              min={currentDate}
              disabled={isBooked || isOptionNotSelected}
            />
            <input
              type="date"
              value={returnDate}
              onChange={handleReturnDate}
              min={oneWayDate}
              disabled={
                (!isBooked && !oneWayDate) || selectedOption !== 'option2'
              }
            />
            <button onClick={handleBookButton} disabled={isBooked}>
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
