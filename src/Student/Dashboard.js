import React from "react";
import Profile from "./components/Profile";
import Notification from "./components/Notification";
import Announcement from "./components/Announcement";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="flex flex-col overflow-hidden">
        <div className="dashboard__section">
          <main className="dashboard__container flex-grow">
            <div className="dashboard__profile">
              <Profile />
            </div>
            <div className="dashboard__cunt-2">
              <Notification />
              <Announcement />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Dashboard;
