import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'hooks/use-user';
import avatar from 'images/avatar.png';

export function SignIn() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [disabled, setDisabled] = useState(true);
  const [userName, setUserName] = useState(user || '');

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
    setUser(userName);
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
