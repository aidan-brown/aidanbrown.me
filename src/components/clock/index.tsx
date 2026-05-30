import React, { useEffect, useState } from 'react';

export const Clock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const setTimeStr = () => {
      const today = new Date();
      const hours = today.getHours() % 12;
      const minutes = today.getMinutes();
      const ampm = today.getHours() >= 12 ? 'PM' : 'AM';
      setTime(
        `${hours === 0 ? 12 : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`
      );
    };
    const today = new Date();

    setTimeStr();
    setTimeout(
      () => {
        setTimeStr();
        setInterval(setTimeStr, 60000);
      },
      (60 - today.getSeconds()) * 1000
    );
  }, []);

  return <span>{time}</span>;
};
