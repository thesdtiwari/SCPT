import React from "react";
import NotificationCard from "../../components/NotificationCards";
import {BASE_URL} from "../../CONSTANTS";
import "../../css/styles.css";

const getNotification = async () => {
  const data = await fetch(`${BASE_URL}/profile`, {
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("token")).token,
    },
  }).then((val) => val.json());
  const unreadNotification = data.notification;
  const readNotifications = data.readNotifications;
  // console.log(unreadNotification);
  return {
    unreadNotification,
    readNotifications,
  };
};

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadNotifications: [],
      readNotifications: [],
    };
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
  }
  componentDidMount() {
    getNotification()
      .then((val) => {
        this.setState({
          unreadNotifications: val.unreadNotification,
          readNotifications: val.readNotifications,
        });
      })
      .catch((err) => {
        console.error("Error in notification", err);
      });
  }
  rerenderParentCallback() {
    // alert("rerender");
    getNotification()
      .then((val) => {
        this.setState({
          unreadNotifications: val.unreadNotification,
          readNotifications: val.readNotifications,
        });
      })
      .catch((err) => {
        console.error("Error in notification", err);
      });
  }
  render() {
    const newNotifications = this.state.unreadNotifications.map((val) => {
      return (
        <NotificationCard
          message={val.message}
          imgSrc="check.svg"
          onClick="read"
          cursor="pointer"
          title="Mark as Read"
          iat={val.iat}
          key={val.iat}
          reRender={this.rerenderParentCallback}
        />
      );
    });
    const allReadNotifications = this.state.readNotifications.map((val) => {
      return (
        <NotificationCard
          message={val.message}
          imgSrc="close.svg"
          iat={val.iat}
          key={val.iat}
          onClick="delete"
          cursor="pointer"
          title="Delete Notification"
          reRender={this.rerenderParentCallback}
        />
      );
    });
    const allNotifications = newNotifications.concat(allReadNotifications);
    return (
      <div className="notification__section">
        <h3 className="notification__heading">My Notifications</h3>
        <div className="notification__container">{allNotifications}</div>
      </div>
    );
  }
}

export default Notification;
