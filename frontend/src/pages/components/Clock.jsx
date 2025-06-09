import React, { useEffect, useState } from 'react';

function Clock() {
  const [time, setTime] = useState({
    hour: '00',
    minute: '00',
    second: '00',
    ampm: 'AM'
  });

  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const date = new Date();
      let hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      const ampm = hour < 12 ? 'AM' : 'PM';

      hour = hour % 12 || 12;

      setTime({
        hour: hour < 10 ? '0' + hour : '' + hour,
        minute: minute < 10 ? '0' + minute : '' + minute,
        second: second < 10 ? '0' + second : '' + second,
        ampm
      });

      // Format : Mercredi 29 Mai 2025 => en MAJUSCULE
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('fr-FR', options).toUpperCase();
      setDateString(formattedDate);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time-container">
      <div className="date-text">{dateString}</div>
      <div className="time">
        <div className="time-colon">
          <div className="time-text">
            <span className="num hour_num">{time.hour}</span>
            <span className="text">Hours</span>
          </div>
          <span className="colon">:</span>
        </div>
        <div className="time-colon">
          <div className="time-text">
            <span className="num min_num">{time.minute}</span>
            <span className="text">Minutes</span>
          </div>
          <span className="colon">:</span>
        </div>
        <div className="time-colon">
          <div className="time-text">
            <span className="num sec_num">{time.second}</span>
            <span className="text">Seconds</span>
          </div>
          <span className="am_pm">{time.ampm}</span>
        </div>
      </div>
    </div>
  );
}

export default Clock;
