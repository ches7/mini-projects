import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectForm = () => {
  const [value, setValue] = useState('')
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`r/${value}`);
  }

  const handleHomeClick = () => {
    navigate('/');
  }

  return (
    <header id="header">
        <img height="80px" width="80px"
            src="/reddit-1.svg"
            alt="reddit logo"
            onClick={handleHomeClick}
            />
    <form onSubmit={handleSubmit}>
        <input type='text' value={value} onChange={handleChange} className='search-bar' placeholder='Search subreddits...'></input>
        <button type='submit' className='search-button'>Search</button>
    </form>
    </header>
  )

}

export default SelectForm