import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import Chat from './ChatMain';
import { ChakraProvider } from '@chakra-ui/react';
import VideoChat from './VideoChat';
import MapComponent from './Map';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/video-chat" element={<VideoChat />} />
              <Route path="/map" element={<MapComponent />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </header>
        </div>
      </Router>
    </ChakraProvider>
  );
}

const Home = () => (
  <div>
    <h1>Welcome to the App</h1>
    <p>Select a page from the navigation.</p>
  </div>
);

const NotFound = () => (
  <div>
    <h1>404 Not Found</h1>
    <p>The page you're looking for does not exist.</p>
  </div>
);

export default App;
