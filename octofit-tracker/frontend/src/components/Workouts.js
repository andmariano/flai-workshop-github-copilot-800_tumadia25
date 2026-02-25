import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const baseUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching workouts from:', baseUrl);
        
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Processed workouts:', workoutsData);
        
        setWorkouts(workoutsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
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
          <h4>Error Loading Workouts</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-container">
      <div className="table-container">
        <h2 className="mb-4">
          <i className="bi bi-clipboard-check"></i> Workout Programs
          <span className="badge bg-primary ms-3">{workouts.length} Available</span>
        </h2>
        
        {workouts.length === 0 ? (
          <div className="alert alert-info" role="alert">
            <i className="bi bi-info-circle"></i> No workouts available. Check back soon!
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Workout Name</th>
                  <th>Description</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout.id}>
                    <td>
                      <strong className="text-primary">{workout.name}</strong>
                    </td>
                    <td>{workout.description || <em className="text-muted">No description</em>}</td>
                    <td>
                      <span className="badge bg-info\">{workout.duration} min</span>
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

export default Workouts;
