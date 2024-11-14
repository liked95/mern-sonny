import React from "react";
import "./style.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Welcome to Your Dashboard</h1>
        <p>Hello, <strong>User</strong>! Here’s a quick overview of your account.</p>
        
        <div className="dashboard-links">
          <a href="#profile">Profile</a>
          <a href="#settings">Settings</a>
          <a href="#logout">Logout</a>
        </div>
        
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
    </div>
  );
}

export default Dashboard;
