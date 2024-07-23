import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import CreateCharity from './pages/CreateCharity/CreateCharity';
import CharityDetails from './pages/CharityDetails/CharityDetails.jsx';
import { Buffer } from 'buffer';
import { StateContextProvider } from './context/index.jsx';

// Ensure Buffer is available globally if needed
window.Buffer = Buffer;

const App = () => {
  return (
    <Router>
    <StateContextProvider>
      <div className="container">
        <div className="sidebar sidebar-visible">
          <Sidebar />
        </div>

        <div className="content">
          <Navbar />

          
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-charity" element={<CreateCharity />} />
              <Route path="/charity-details/:id" element={<CharityDetails />} />
            </Routes>
        </div>
      </div>
    </StateContextProvider>
    </Router>
  );
};

export default App;
