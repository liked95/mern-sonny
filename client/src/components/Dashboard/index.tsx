import React from 'react'
import './Dashboard.css'

const Dashboard: React.FC = () => {
  return (
    <main className="dashboard-container">
      <div className="dashboard-content">
        <h2>Welcome to Your Dashboard</h2>
        <p>
          Hello, <strong>User</strong>! Here’s a quick overview of your account.
        </p>

        <div className="dashboard-widgets">
          <div className="widget">
            <h3>Recent Activities</h3>
            <p>No recent activities to show.</p>
          </div>
          <div className="widget">
            <h3>Account Summary</h3>
            <p>Account Type: Basic</p>
            <p>Status: Active</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
