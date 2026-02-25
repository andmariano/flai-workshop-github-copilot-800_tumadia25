import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const baseUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        console.log('Fetching teams from:', baseUrl);
        
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Processed teams:', teamsData);
        
        // Log individual team member data for debugging
        if (teamsData.length > 0) {
          console.log('First team members:', teamsData[0].members);
          console.log('First team structure:', teamsData[0]);
        }
        
        setTeams(teamsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
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
          <h4>Error Loading Teams</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-container">
      <div className="table-container">
        <h2 className="mb-4">
          <i className="bi bi-people"></i> Teams
          <span className="badge bg-primary ms-3">{teams.length} Teams</span>
        </h2>
        
        {teams.length === 0 ? (
          <div className="alert alert-info" role="alert">
            <i className="bi bi-info-circle"></i> No teams found. Create your first team!
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Members Count</th>
                  <th>Team Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id}>
                    <td>
                      <strong className="text-primary">{team.name}</strong>
                    </td>
                    <td>
                      <span className="badge bg-info">
                        {Array.isArray(team.members) ? team.members.length : 0} members
                      </span>
                    </td>
                    <td>
                      {Array.isArray(team.members) && team.members.length > 0 ? (
                        <small>{team.members.map(m => m.name).join(', ')}</small>
                      ) : (
                        <em className="text-muted">No members yet</em>
                      )}
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

export default Teams;
