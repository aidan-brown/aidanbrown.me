import React, { useState } from 'react';

import './login.scss';
import { LoginProps } from './login.utils';
import { ClickDownSound, ClickUpSound } from 'assets/audio';
import { haos, unlockIcon } from 'assets/images';
import { User, USER_LOOKUP_TABLE } from 'utils/user';

export const Login = ({ handleLogin }: LoginProps) => {
  const userList = Object.values(USER_LOOKUP_TABLE);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const clickDownSound = new Audio(ClickDownSound);
  const clickUpSound = new Audio(ClickUpSound);
  clickDownSound.volume = 0.25;
  clickUpSound.volume = 0.25;

  /**
   * Handles playing the mouse click audio
   * @param isMouseDown boolean value that determines if the mouse up or mouse down audio should play
   */
  const handleClickSound = (isMouseDown: boolean) => {
    if (isMuted) return;
    const audio = isMouseDown ? clickDownSound : clickUpSound;
    audio.play();
  };

  const mapUserToComponent = (user: User) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');
    const [isInvalid, setIsInvalid] = useState<boolean>(false);

    return (
      <div className="user" key={user.name}>
        <button
          className="haos-border haos-button"
          onClick={() => {
            if (!user.password) {
              handleLogin(user);
            } else {
              setIsOpen(!isOpen);
            }
          }}
        >
          <img src={user.profileImage} />
        </button>
        <div className="user-info">
          <p>{user.name}</p>
          {isOpen && (
            <div className="password-field">
              <input
                type="password"
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                className={`${isInvalid ? 'invalid' : ''}`}
              />
              <button
                className="haos-border haos-button"
                onClick={() => {
                  if (input === user.password) {
                    handleLogin(user);
                  } else {
                    setIsInvalid(true);
                  }
                }}
              >
                <img src={unlockIcon} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="Login"
      onMouseDown={() => handleClickSound(true)}
      onMouseUp={() => handleClickSound(false)}
    >
      <div className="header"></div>
      <div className="os-info">
        <div className="logo" style={{ backgroundImage: `url(${haos})` }}>
          <h1>haOS</h1>
        </div>
        <h2>To begin, click on your user</h2>
      </div>
      <div className="users">{userList.map(mapUserToComponent)}</div>
      <footer></footer>
    </div>
  );
};
