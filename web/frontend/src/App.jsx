import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Component imports
const Home = () => <div>MusicElvis Home</div>;
const Studio = () => <div>Music Generation Studio</div>;
const Community = () => <div>Community & DAO</div>;

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>MusicElvis</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/studio">Studio</a></li>
              <li><a href="/community">Community</a></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </main>

        <footer>
          <p>© 2024 MusicElvis. Powered by Solana</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;