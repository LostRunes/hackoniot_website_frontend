import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Home from './pages/Home';
import LevelMap from './pages/LevelMap';
import Level1Intro from './pages/Level1Intro';
import GuessComponent from './pages/GuessComponent';
import IoTRiddle from './pages/IoTRiddle';
import QREntry from './pages/QREntry';
import MobileQuiz from './pages/MobileQuiz';
import LevelComplete from './pages/LevelComplete';
import Leaderboard from './pages/Leaderboard';
import Level2 from './pages/Level2';
import FinalResults from './pages/FinalResults';
import MenteeDisplay from './pages/MenteeDisplay';
import MenteeVote from './pages/MenteeVote';
import { socket } from './socket';

function SocketHandler({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGlobalNav = (path) => {
      // Prevent redirecting users who are participating in or displaying the Mentee Quiz
      if (!window.location.pathname.startsWith('/mentee')) {
        navigate(path);
      }
    };

    socket.on('startLevel1', () => handleGlobalNav('/intro'));
    socket.on('startGuessComponent', () => handleGlobalNav('/level1/guess'));
    socket.on('startRiddles', () => handleGlobalNav('/level1/riddle'));

    // Multi-Quiz hooks
    socket.on('startQuiz1', () => handleGlobalNav('/level1/qr/1'));
    socket.on('startQuiz2', () => handleGlobalNav('/level1/qr/2'));
    socket.on('startQuiz3', () => handleGlobalNav('/level1/qr/3'));
    socket.on('startQuiz4', () => handleGlobalNav('/level1/qr/4'));
    socket.on('startQuiz5', () => handleGlobalNav('/level1/qr/5'));

    socket.on('showLeaderboard_quiz1', () => handleGlobalNav('/leaderboard/1'));
    socket.on('showLeaderboard_quiz2', () => handleGlobalNav('/leaderboard/2'));
    socket.on('showLeaderboard_quiz3', () => handleGlobalNav('/leaderboard/3'));
    socket.on('showLeaderboard_quiz4', () => handleGlobalNav('/leaderboard/4'));
    socket.on('showLeaderboard_quiz5', () => handleGlobalNav('/leaderboard/5'));

    socket.on('startLevel2', () => handleGlobalNav('/level2'));
    socket.on('showFinalResults', () => handleGlobalNav('/final-results'));
    socket.on('startMenteeQuiz', () => handleGlobalNav('/mentee-display'));
    socket.on('openMenteeQuiz', () => handleGlobalNav('/mentee-display'));
    socket.on('showLeaderboard_mentee', () => handleGlobalNav('/leaderboard/mentee'));

    return () => {
      socket.off('startLevel1');
      socket.off('startGuessComponent');
      socket.off('startRiddles');
      socket.off('startQuiz1');
      socket.off('startQuiz2');
      socket.off('startQuiz3');
      socket.off('startQuiz4');
      socket.off('startQuiz5');
      socket.off('showLeaderboard_quiz1');
      socket.off('showLeaderboard_quiz2');
      socket.off('showLeaderboard_quiz3');
      socket.off('showLeaderboard_quiz4');
      socket.off('showLeaderboard_quiz5');
      socket.off('startLevel2');
      socket.off('showFinalResults');
      socket.off('startMenteeQuiz');
      socket.off('openMenteeQuiz');
      socket.off('showLeaderboard_mentee');
    };
  }, [navigate]);

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <div className="relative w-full h-screen bg-arcade-bg text-white overflow-y-auto">
        {/* Foreground Content */}
        <div className="relative z-10 w-full h-full">
          <SocketHandler>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<LevelMap />} />
              <Route path="/intro" element={<Level1Intro />} />
              <Route path="/level1/guess" element={<GuessComponent />} />
              <Route path="/level1/riddle" element={<IoTRiddle />} />
              <Route path="/level1/qr/:id" element={<QREntry />} />
              <Route path="/mobilequiz/:id" element={<MobileQuiz />} />
              <Route path="/level1/complete" element={<LevelComplete />} />
              <Route path="/leaderboard/:id" element={<Leaderboard />} />
              <Route path="/level2" element={<Level2 />} />
              <Route path="/final-results" element={<FinalResults />} />
              <Route path="/mentee-display" element={<MenteeDisplay />} />
              <Route path="/mentee-vote" element={<MenteeVote />} />
            </Routes>
          </SocketHandler>
        </div>
      </div>
    </Router>
  );
}

export default App;
