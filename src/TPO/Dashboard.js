import React from "react";
import Stats from "./components/Stats";
import Calender from "./components/Calender";
import Announcement from "./components/Announcements";
// import AnnouncementForm from "./components/AnnouncementForm";

const calenderLink = "https://calendar.google.com/calendar/embed?src=sdtiwari.19je0868%40mc.iitism.ac.in&ctz=Asia%2FKolkata";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="flex flex-col overflow-hidden">
        {/*  Page content */}

        <div className="dashboard__section">
          <main className="dashboard__container flex-grow">
            <div className="dashboard__cunt-2">
              <Calender src = {calenderLink} />

              <div className="notification__section dashboard__stats__container">
                
                <h3 className="notification__heading">
                  Students Placement Statistics
                </h3>
                
                <div className="dashboard__stats">
                  <div className="piechart">
                    <Stats batch="B.Tech" />
                  </div>
                  <div className="piechart">
                    <Stats batch="B.Tech Intern" />
                  </div>
                  <div className="piechart">
                    <Stats batch="M.Tech" />
                  </div>
                  <div className="piechart">
                    <Stats batch="MBA" />
                  </div>
                </div>
              </div>

            </div>

            <div className="dashboard__cunt-2">
              <Announcement />
            </div>
            
          </main>
        </div>
      </div>
    );
  }
}

export default Dashboard;
