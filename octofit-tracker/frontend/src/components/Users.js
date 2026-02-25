import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    team_ids: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`;
        
        // Fetch users
        console.log('Fetching users from:', `${baseUrl}/api/users/`);
        const usersResponse = await fetch(`${baseUrl}/api/users/`);
        if (!usersResponse.ok) {
          throw new Error(`HTTP error! status: ${usersResponse.status}`);
        }
        const usersData = await usersResponse.json();
        console.log('Users data received:', usersData);
        const processedUsers = usersData.results || usersData;
        setUsers(processedUsers);
        
        // Fetch teams
        console.log('Fetching teams from:', `${baseUrl}/api/teams/`);
        const teamsResponse = await fetch(`${baseUrl}/api/teams/`);
        if (!teamsResponse.ok) {
          throw new Error(`HTTP error! status: ${teamsResponse.status}`);
        }
        const teamsData = await teamsResponse.json();
        const processedTeams = teamsData.results || teamsData;
        setTeams(processedTeams);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      age: user.age || '',
      team_ids: user.teams ? user.teams.map(t => t.id) : []
    });
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', age: '', team_ids: [] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, team_ids: selectedOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/${editingUser.id}/`;
      console.log('Updating user at:', baseUrl);
      console.log('Form data:', formData);
      
      const response = await fetch(baseUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const updatedUser = await response.json();
      console.log('User updated:', updatedUser);
      
      // Update the users list
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      handleCloseModal();
    } catch (err) {
      console.error('Error updating user:', err);
      alert(`Failed to update user: ${err.message}`);
    }
  };

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
          <h4>Error Loading Users</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-container">
      <div className="table-container">
        <h2 className="mb-4">
          <i className="bi bi-person"></i> Users
          <span className="badge bg-primary ms-3">{users.length} Registered</span>
        </h2>
        
        {users.length === 0 ? (
          <div className="alert alert-info" role="alert">
            <i className="bi bi-info-circle"></i> No users found. Register to get started!
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Teams</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <strong className="text-primary">{user.name || <em className="text-muted">N/A</em>}</strong>
                    </td>
                    <td>{user.name || <em className="text-muted">N/A</em>}</td>
                    <td>{user.email || <em className="text-muted">N/A</em>}</td>
                    <td>
                      <span className="badge bg-info">{user.age || 'N/A'}</span>
                    </td>
                    <td>
                      {user.teams && user.teams.length > 0 ? (
                        <small>{user.teams.map(t => t.name).join(', ')}</small>
                      ) : (
                        <em className="text-muted">No team</em>
                      )}
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User Details</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      min="1"
                      max="150"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="teams" className="form-label">Teams (hold Ctrl/Cmd to select multiple)</label>
                    <select
                      multiple
                      className="form-select"
                      id="teams"
                      name="teams"
                      value={formData.team_ids}
                      onChange={handleTeamChange}
                      size="5"
                    >
                      {teams.map(team => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                    <div className="form-text">
                      Current teams: {editingUser?.teams?.map(t => t.name).join(', ') || 'None'}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
