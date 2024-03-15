import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState(5 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [randomWord, setRandomWord] = useState('');
  let intervalId: number | undefined;

  useEffect(() => {
    if (timerRunning) {
      intervalId = window.setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timerRunning]);

  useEffect(() => {
    if (timerRunning) {
      fetchRandomWord();
    }
  }, [timerRunning]);

  const fetchRandomWord = async () => {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word');
      const data = await response.json();
      setRandomWord(data[0]);
    } catch (error) {
      console.error('Error fetching random word:', error);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleStartTimer = () => {
    setTimerRunning(true);
  };

  return (
    <>
      <h1>Writing Helper</h1>
      <div>
        {!timerRunning && (
          <button onClick={handleStartTimer}>Start Timer</button>
        )}
        {randomWord && (
          <div>Random Word: {randomWord}</div>
        )}
      </div>
      <textarea placeholder="Start typing..." rows={10} cols={50} />
      <div>Time remaining: {formatTime(timeRemaining)}</div>
    </>
  );
}

export default App;
