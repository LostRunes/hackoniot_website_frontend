import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import ArcadeBackground from './components/ArcadeBackground';
import Landing from './pages/Landing';
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
import MenteeQuiz from './pages/MenteeQuiz';
import { socket } from './socket';

function SocketHandler({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('startLevel1', () => navigate('/intro'));
    socket.on('startGuessComponent', () => navigate('/level1/guess'));
    socket.on('startRiddles', () => navigate('/level1/riddle'));

    // Multi-Quiz hooks
    socket.on('startQuiz1', () => navigate('/level1/qr/1'));
    socket.on('startQuiz2', () => navigate('/level1/qr/2'));
    socket.on('startQuiz3', () => navigate('/level1/qr/3'));
    socket.on('startQuiz4', () => navigate('/level1/qr/4'));
    socket.on('startQuiz5', () => navigate('/level1/qr/5'));

    socket.on('showLeaderboard_quiz1', () => navigate('/leaderboard/1'));
    socket.on('showLeaderboard_quiz2', () => navigate('/leaderboard/2'));
    socket.on('showLeaderboard_quiz3', () => navigate('/leaderboard/3'));
    socket.on('showLeaderboard_quiz4', () => navigate('/leaderboard/4'));
    socket.on('showLeaderboard_quiz5', () => navigate('/leaderboard/5'));

    socket.on('startLevel2', () => navigate('/level2'));
    socket.on('showFinalResults', () => navigate('/final-results'));
    socket.on('startMenteeQuiz', () => navigate('/mentee-quiz'));

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
    };
  }, [navigate]);

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <div className="relative w-full h-screen overflow-hidden bg-arcade-dark text-white">
        {/* Persistent 2D Retro Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ArcadeBackground />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 w-full h-full">
          <SocketHandler>
            <Routes>
              <Route path="/" element={<Landing />} />
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
              <Route path="/mentee-quiz" element={<MenteeQuiz />} />
            </Routes>
          </SocketHandler>
        </div>
      </div>
    </Router>
  );
}

export default App;
