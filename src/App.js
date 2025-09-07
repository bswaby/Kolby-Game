import React, { useState, useEffect } from 'react';

// Array of Kolby images
const kolbyImages = [
  '/kolby-1.jpg',
  '/kolby-2.jpg',
  '/kolby-3.jpg',
  '/kolby-4.jpg',
  '/kolby-5.jpg',
  '/kolby-6.jpg',
  '/kolby-7.jpg'
];

// Game styling
const gameStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f8ff',
  fontFamily: 'Arial, sans-serif',
  userSelect: 'none',
  padding: '20px',
  textAlign: 'center',
};

const buttonStyle = {
  fontSize: '2rem',
  padding: '20px 40px',
  margin: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '15px',
  cursor: 'pointer',
  transition: 'transform 0.2s',
};

const scoreStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#2C3E50',
  margin: '20px 0',
};

const catImageStyle = {
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '5px solid #FF6B6B',
  transition: 'transform 0.3s ease',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
};

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [catVisible, setCatVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  // Game logic
  useEffect(() => {
    let timer;
    let catTimer;

    if (gameActive && timeLeft > 0) {
      // Countdown timer
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Randomly show/hide Kolby and change images
      catTimer = setInterval(() => {
        if (Math.random() > 0.5) {
          // Show Kolby
          setCatVisible(true);
          // Select a random image
          const randomImage = kolbyImages[Math.floor(Math.random() * kolbyImages.length)];
          setCurrentImage(randomImage);
        } else {
          // Hide Kolby
          setCatVisible(false);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
      clearInterval(catTimer);
    };
  }, [gameActive]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
  };

  const handleCatClick = () => {
    if (gameActive && catVisible) {
      setScore(prev => prev + 1);
      setCatVisible(false);
    }
  };

  return (
    <div style={gameStyle}>
      <h1>Kolby's Peek-a-Boo!</h1>
      
      {!gameActive ? (
        <button 
          style={buttonStyle} 
          onClick={startGame}
        >
          Start Game
        </button>
      ) : (
        <>
          <div style={scoreStyle}>
            Score: {score} | Time: {timeLeft}s
          </div>
          
          <div 
            onClick={handleCatClick} 
            style={{ 
              width: '300px', 
              height: '300px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}
          >
            {catVisible && (
              <img 
                src={process.env.PUBLIC_URL + currentImage} 
                alt="Kolby the Cat" 
                style={{
                  ...catImageStyle,
                  transform: catVisible ? 'scale(1.1)' : 'scale(1)',
                }}
              />
            )}
          </div>
        </>
      )}
      
      {!gameActive && timeLeft === 0 && (
        <div style={scoreStyle}>
          Game Over! Your Score: {score}
        </div>
      )}
    </div>
  );
}

export default App;