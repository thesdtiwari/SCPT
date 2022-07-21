import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "./../../CONSTANTS";

const acceptJob = async id => {
  console.log("id", id);
  const data = await fetch(`${BASE_URL}/tpo/approvejob/${id}`, {
    method: "post",
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("token")).token,
    },
  }).then(val => val.json());

  console.log(data);
  alert("job added");
  window.location.pathname = "pending-approvals";
};

const rejectJob = async id => {
  console.log("id", id);
  const data = await fetch(`${BASE_URL}/tpo/rejectjob/${id}`, {
    method: "delete",
    headers: {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("token")).token,
    },
  }).then(val => val.json());

  console.log(data);
  alert("job rejected");
  window.location.pathname = "pending-approvals";
};

const Input = ({ name, type, label, register, required, value }) => {
  let clas = "";
  if (
    label === "jobDescription" ||
    label === "qualificationNeeded" ||
    label === "yourRole" ||
    label === "aboutCompany" ||
    label === "packageBreakup" ||
    label === "evaluationPattern" ||
    label === "expectedSkills"
    // ||
    // label === "jobRole"
  ) {
    clas = "AddJob__form-text";

    return (
      <div className={clas}>
        <label>{name}</label>
        <textarea
          type={type}
          required={required}
          {...register(label, { required })}
          placeholder={name}
          disabled
          value={value}
        />
      </div>
    );
  } else {
    if (type === "checkbox") clas = "AddJob__form-checkbox";
    return (
      <div className={clas}>
        <label>{name}</label>
        <input
          type={type}
          required={required}
          {...register(label, { required })}
          placeholder={name}
          disabled
          value={value}
        />
      </div>
    );
  }
};

const getFormDetails = async id => {
  try {
    const data = await fetch(`${BASE_URL}/tpo/pendingjob/${id}`, {
      method: "get",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      },
    }).then(val => val.json());

    if (!data) window.location.pathname = "pending-approvals";
    // console.log("data : ", data);
    // data.forEach(e => {
    //   if(e._id == id ){
    //     // console.log(e);
    //     return data;
    //   }
    // });
    return data;
  } catch (err) {
    console.error("Error in getting Job Details", err);
  }
};

const FilledForm = () => {
  const [formData, setFormData] = useState("");

  useEffect(() => {
    const x = window.location.pathname.split("/").pop();
    console.log(x);

    getFormDetails(x).then(data => {
      setFormData(data);
    });
    // console.log("formdata", formData)
  }, []);

  const { register } = useForm();

  return (
    <div className="flex flex-col overflow-hidden">
      {/*  Page content */}
      <div className="AddJob__section">
        <div className="AddJob__section-heading">
          <h3>Job Details</h3>
        </div>
        <main className="AddJob__container flex-grow">
          <form className="AddJob__form">
            <div>
              <Input
                type="string"
                name="Company Name"
                label="companyName"
                register={register}
                required
                value={formData.companyName}
              />
              <Input
                type="string"
                name="Company Website"
                label="CompanyWebsite"
                register={register}
                required
                value={formData.companyName}
              />
              <Input
                type="string"
                name="Job ID"
                label="jobID"
                register={register}
                value={formData.jobId}
              />
              <Input
                type="textarea"
                name="About Company"
                label="aboutCompany"
                register={register}
                required
                value={formData.aboutCompany}
              />
              <Input
                type="string"
                name="Job Role"
                label="jobRole"
                register={register}
                required
                value={formData.jobRole}
              />
              <Input
                type="number"
                name="Package"
                label="package"
                register={register}
                required
                value={formData.package}
              />
              <Input
                type="string"
                name="Posting Location"
                label="postingLocation"
                register={register}
                value={formData.postingLocation}
              />
              <Input
                type="string"
                name="minCgpa"
                label="minCgpa"
                register={register}
                required
                value={formData.minCgpa}
              />
              <Input
                type="string"
                name="Max Backlogs Allowed"
                label="maxBacklogsAllowed"
                register={register}
                required
                placeholder="Ex - 2021, 2023"
                value={formData.maxBacklogsAllowed}
              />
              <Input
                type="string"
                name="Batches Allowed"
                label="batchesAllowed"
                register={register}
                required
                value={formData.batchesAllowed}
              />
              <Input
                type="string"
                name="duration"
                label="duration"
                register={register}
                value={formData.duration}
              />
              <Input
                type="checkbox"
                name="Female Only ?"
                label="femaleOnly"
                register={register}
                value={formData.onlyForFemales}
              />
              <Input
                type="datetime-local"
                name="Deadline"
                label="deadlineDate"
                register={register}
                required
                value={formData.deadlineDate}
              />
              <Input
                type="string"
                name="Recruitment Type"
                label="recruitmentType"
                register={register}
                required
                value={formData.recruitmentType}
              />
              <Input
                type="textarea"
                name="Job Description"
                label="jobDescription"
                register={register}
                required
                value={formData.jobDescription}
              />
              <Input
                type="textarea"
                name="Expected Skills"
                label="expectedSkills"
                register={register}
                value={formData.expectedSkills}
              />
              <Input
                type="textarea"
                name="Your Role"
                label="yourRole"
                register={register}
                required
                value={formData.yourRole}
              />
              <Input
                type="textarea"
                name="Qualification needed"
                label="qualificationNeeded"
                register={register}
                required
                value={formData.onlyForFemales}
              />
              <Input
                type="textarea"
                name="packageBreakup"
                label="packageBreakup"
                register={register}
                required
                value={formData.packageBreakup}
              />
              <Input
                type="textarea"
                name="Evaluation Pattern"
                label="evaluationPattern"
                register={register}
                required
                value={formData.evaluationPattern}
              />
            </div>
            <div className="FilledForm__buttons">
              <button
                className="FilledForm__submit"
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  rejectJob(formData._id);
                }}
              >
                Reject Job
              </button>
              <button
                className="FilledForm__submit"
                style={{ backgroundColor: "#0371ee" }}
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  acceptJob(formData._id);
                }}
              >
                Accept Job
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default FilledForm;
