import React from "react";

export default function Calender(props){
    return (
        <div className="notification__section">
            <h3 className="notification__heading">Calendar</h3>
            <div className="tpo__calendar__container">
                <iframe
                title="calendar"
                className="tpo__calendar"
                src = {props.src}
                ></iframe>
            </div>
        </div>
    );
}