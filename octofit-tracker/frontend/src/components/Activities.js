import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const baseUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        console.log('Fetching activities from:', baseUrl);
        
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Processed activities:', activitiesData);
        
        setActivities(activitiesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
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
          <h4>Error Loading Activities</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-container">
      <div className="table-container">
        <h2 className="mb-4">
          <i className="bi bi-activity"></i> Activities Log
          <span className="badge bg-primary ms-3">{activities.length} Total</span>
        </h2>
        
        {activities.length === 0 ? (
          <div className="alert alert-info" role="alert">
            <i className="bi bi-info-circle"></i> No activities found. Start logging your workouts!
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Activity Type</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>
                      <strong>{activity.activity_type}</strong>
                    </td>
                    <td>
                      <span className="badge bg-info">{activity.duration} min</span>
                    </td>
                    <td>
                      {activity.date ? (
                        new Date(activity.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      ) : (
                        <em className="text-muted">No date</em>
                      )}
                    </td>
                    <td>
                      <strong className="text-primary">{activity.user?.name || 'Unknown'}</strong>
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

export default Activities;
