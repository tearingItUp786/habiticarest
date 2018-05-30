// @flow

import React from 'react';
import { signOut } from '../config';
import { Navbar } from '../styling/Header';

const Header = (props: HeaderProps) => {
  function buttonClick() {
    signOut();
    props.history.push('/login');
  }

  return (
    <header>
      <Navbar>
        <ul>
          <li>Habitica Rest</li>
          <li>
            <img src="../../assets/habit_logo.png" alt="My Logo" />
          </li>
          <li>
            <button onClick={buttonClick}>Logout</button>
          </li>
        </ul>
      </Navbar>
    </header>
  );
};

export default Header;
