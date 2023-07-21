import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalStorageService, LS_KEYS } from 'services/localStorage';
import avatar from 'images/avatar.png';

export function SignIn() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [userName, setUserName] = useState(
    LocalStorageService.get(LS_KEYS.USERNAME) || []
  );

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const inputValueLength = inputValue.length;

    setUserName(inputValue);

    if (inputValueLength < 4 || inputValueLength > 16) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    LocalStorageService.set(LS_KEYS.USERNAME, userName);
    navigate('/book-list');
  };

  return (
    <div className="signin text-center">
      <img src={avatar} alt="avatar" />
      <form className="d-grid" action="#">
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          className="form-control mb-3 text-center"
          placeholder="type Username"
          name="username"
          value={userName}
          onChange={handleInputChange}
        />
        <button
          onClick={handleButtonClick}
          className="btn btn-primary "
          type="submit"
          disabled={disabled}
        >
          Sign-In
        </button>
      </form>
    </div>
  );
}
