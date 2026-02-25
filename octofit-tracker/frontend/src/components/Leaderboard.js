import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const baseUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
        console.log('Fetching leaderboard from:', baseUrl);
        
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Processed leaderboard:', leaderboardData);
        
        // Log detailed structure for debugging
        if (leaderboardData.length > 0) {
          console.log('First leaderboard entry:', leaderboardData[0]);
          console.log('First entry user:', leaderboardData[0].user);
        }
        
        setLeaderboard(leaderboardData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container page-container">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container page-container">
        <div className="error-message">
          <h4>Error Loading Leaderboard</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const getRankBadge = (index) => {
    if (index === 0) return 'bg-warning text-dark';
    if (index === 1) return 'bg-secondary';
    if (index === 2) return 'bg-danger';
    return 'bg-primary';
  };

  const getRankIcon = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return index + 1;
  };

  return (
    <div className="container page-container">
      <div className="table-container">
        <h2 className="mb-4">
          <i className="bi bi-trophy"></i> Leaderboard
          <span className="badge bg-primary ms-3">{leaderboard.length} Competitors</span>
        </h2>
        
        {leaderboard.length === 0 ? (
          <div className="alert alert-info" role="alert">
            <i className="bi bi-info-circle"></i> No leaderboard entries yet. Be the first to compete!
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th style={{width: '100px'}}>Rank</th>
                  <th>User</th>
                  <th>Team</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id} className={index < 3 ? 'table-active' : ''}>
                    <td>
                      <span className={`badge ${getRankBadge(index)} badge-custom`}>
                        {getRankIcon(index)}
                      </span>
                    </td>
                    <td><strong className="text-primary">{entry.user?.name || 'Unknown'}</strong></td>
                    <td>
                      {entry.user?.teams && entry.user.teams.length > 0 ? (
                        <span className="badge bg-secondary">
                          {entry.user.teams.map(t => t.name).join(', ')}
                        </span>
                      ) : (
                        <em className="text-muted">No team</em>
                      )}
                    </td>
                    <td>
                      <span className="badge bg-success fs-6">{entry.score || 0} points</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
