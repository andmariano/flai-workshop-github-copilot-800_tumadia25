import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container page-container">
      <div className="hero-section">
        <h1 className="display-3 fw-bold">Welcome to OctoFit Tracker!</h1>
        <p className="lead fs-4">Track your fitness activities, compete with teams, and achieve your health goals.</p>
      </div>
      
      <div className="row g-4">
        <div className="col-md-4">
          <Link to="/teams" className="text-decoration-none">
            <div className="card h-100 text-center clickable-card">
              <div className="card-body">
                <div className="fs-1 mb-3">👥</div>
                <h5 className="card-title">Join Teams</h5>
                <p className="card-text">Create or join fitness teams and compete with friends.</p>
                <span className="btn btn-primary">View Teams</span>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="col-md-4">
          <Link to="/activities" className="text-decoration-none">
            <div className="card h-100 text-center clickable-card">
              <div className="card-body">
                <div className="fs-1 mb-3">🏃</div>
                <h5 className="card-title">Track Activities</h5>
                <p className="card-text">Log your workouts and monitor your progress over time.</p>
                <span className="btn btn-primary">View Activities</span>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="col-md-4">
          <Link to="/leaderboard" className="text-decoration-none">
            <div className="card h-100 text-center clickable-card">
              <div className="card-body">
                <div className="fs-1 mb-3">🏆</div>
                <h5 className="card-title">Compete</h5>
                <p className="card-text">Check the leaderboard and see how you rank against others.</p>
                <span className="btn btn-primary">View Leaderboard</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-6">
          <Link to="/workouts" className="text-decoration-none">
            <div className="card h-100 clickable-card">
              <div className="card-body">
                <h5 className="card-title">💪 Workout Programs</h5>
                <p className="card-text">Access personalized workout suggestions and training programs tailored to your fitness level.</p>
                <span className="btn btn-outline-primary">Browse Workouts</span>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="col-md-6">
          <Link to="/users" className="text-decoration-none">
            <div className="card h-100 clickable-card">
              <div className="card-body">
                <h5 className="card-title">👤 User Profiles</h5>
                <p className="card-text">View user profiles, track your personal statistics, and connect with the fitness community.</p>
                <span className="btn btn-outline-primary">View Users</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/">
              🏋️ OctoFit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">🏠 Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">👤 Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">🏃 Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">👥 Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">💪 Workouts</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">🏆 Leaderboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
