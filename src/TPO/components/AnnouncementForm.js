import React from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../CONSTANTS";

const addAnnouncement = async data => {
  console.log("announcement", data);
  await fetch(`${BASE_URL}/tpo/add-announcement`, {
    method: "post",
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: data.announcementMessage }),
  });
};

const AnnouncementForm = ({ button }) => {
  const { register, handleSubmit } = useForm();
  return (
    <form className="form__ui" onSubmit={handleSubmit(addAnnouncement)}>

      <textarea
        {...register("announcementMessage", { required: true })}
        placeholder={"Type your Message Here"}
        style={{ backgroundColor: "#EEEEEE" }}
      />

      <input type="submit" className="formSend" value={button} />

    </form>
  );
};

export default AnnouncementForm;
