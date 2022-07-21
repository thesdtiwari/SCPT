import React from "react";
import SvgIcon from "./../../../src/components/SvgIcon";
import "./../../css/styles.css";
import {BASE_URL} from "../../CONSTANTS";

const readHandler = async (props) => {
  try {
    //   post request to readNotification api
    // alert("r")
    // alert(iat);
    const req = { iat: props.iat };
    // console.log(req);
    const data = await fetch(`${BASE_URL}/markAsRead`, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(req),
    }).then((val) => val.json());
    // console.log(data);

    props.reRender();

    return { status: "MarkedRead", data };
  } catch (err) {
    console.error(err);
    return { status: "failed" };
  }
};

const deleteHandler = async (props) => {
  try {
    //   post request to deleteNotification api
    // alert("d")
    // alert(iat);
    const req = { iat: props.iat };
    // console.log(req);
    const data = await fetch(`${BASE_URL}/deleteNotification`, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(req),
    }).then((val) => val.json());
    // console.log(data);

    props.reRender();

    return { status: "Deleted", data };
  } catch (err) {
    console.error(err);
    return { status: "failed" };
  }
};

const nullHandler = async () => {
  //   alert("Nothing");
  return true;
};

const NotificationCard = (props) => {
  let onClickFun;

  if (props.onClick === "read") {
    onClickFun = readHandler;
  } else if (props.onClick === "delete") {
    onClickFun = deleteHandler;
  } else {
    onClickFun = nullHandler;
  }

  return (
    <div className="notification-card">
      <div className="notification-card-section-1">
        <p className="notification-card-section-1-text">{props.message}</p>
      </div>
      <div
        className="notification-card-section-2"
        onClick={() => {
          // alert(props.iat);
          onClickFun(props);
        }}
        style={{ cursor: props.cursor }}
        title={props.title}
      >
        {props.imgSrc ? <SvgIcon src={props.imgSrc} classname="new-svg" /> : ""}
      </div>
    </div>
  );
};

export default NotificationCard;
