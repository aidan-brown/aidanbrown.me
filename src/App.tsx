import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import CRTEffect from 'vault66-crt-effect';
import 'vault66-crt-effect/dist/vault66-crt-effect.css';

import './App.scss';
import { Desktop } from './pages/desktop';
import './reset.css';
import 'assets/fonts/fonts.scss';
import { DownloadLink } from 'components/downloadLink';
import { Login } from 'pages/login';
import { User, USER_LOOKUP_TABLE } from 'utils/user';

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [currentUser, setCurrentUser] = useState<User | undefined>(
    USER_LOOKUP_TABLE.default
  );

  const handleLogOut = () => {
    setCurrentUser(undefined);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <CRTEffect
      preset="minimal"
      enableVignette={true}
      vignetteIntensity={0.3}
      enableSweep={true}
      enableGlow={true}
      enableEdgeGlow={true}
      glowColor="rgba(200, 200, 200, 0.15)"
      edgeGlowColor="rgba(200, 200, 200, 0.15)"
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              !currentUser ? (
                <Login handleLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              currentUser ? (
                <Desktop
                  width={windowWidth}
                  height={windowHeight}
                  user={currentUser!}
                  handleLogOut={handleLogOut}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CRTEffect>
  );
};

export default App;
