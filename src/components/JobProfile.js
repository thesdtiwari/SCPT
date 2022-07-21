import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import * as jwt from "jsonwebtoken";

import SvgIcon from "./SvgIcon";
import { BASE_URL } from "../CONSTANTS";

const getJobDetails = async id => {
  try {
    const data = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: "get",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      },
    }).then(val => val.json());

    // console.log("data", data);
    // console.log("data", JSON.stringify(data.yourRole));

    return data;
  } catch (err) {
    console.error("Error in getting Job Details", err);
  }
};

const applyForJob = async (id) => {
  // console.log("applying", id);
  try {
    const data = await fetch(`${BASE_URL}/jobs/${id}/apply`, {
      method: "post",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      },
    });
    // console.log(data);
    if (data.status === 200) {
      alert(
        "Application submitted Successfully.\nPage will automatically reload to synchronise the status after the alert box is closed."
      );
    } else {
      alert("Application could not be submitted due to technical reasons");
    }
    window.location.reload();
    return data;
  } catch (err) {
    console.error("Error in applying for Job", err);
  }
};

class JobProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      jobDetails: {},
    };
  }

  componentDidMount() {
    const url = window.location.pathname;

    const jobId = url.replace("/jobs/", "");
    // this.setState({id:ret});

    getJobDetails(jobId).then(val => {
      this.setState({
        jobDetails: val,
        id: jobId,
      });
    });
  }

  render() {
    return (
      <div className="flex flex-col overflow-hidden">
        <div className="jobProfile">
          <div className="jobProfile__section-1">
            <div className="company-image-container">
              <SvgIcon src="logo.png" classname="company-logo" />
            </div>
            <hr style={{ border: "1px solid darkgrey", width: "90%" }} />
            <div className="company-details-container">
              <p className="company-name">
                <a
                  href={this.state.jobDetails.companyWebsite}
                  target="_blank"
                  rel="noreferrer"
                >
                  {this.state.jobDetails.companyName}

                  <FontAwesomeIcon
                    icon={faArrowAltCircleRight}
                    className="ml-2 website-arrow-icon"
                  />
                </a>
              </p>
            </div>
          </div>
          <div className="jobProfile__section-2">
            <p className="job-id">{this.state.jobDetails.jobId}</p>
            <div className="job-description" style={{ whiteSpace: "pre-line" }}>
              <p>
                <span className="description-titles">Job Role : </span>
                {this.state.jobDetails.jobRole}
              </p>
              <div>
                <span className="description-titles">Job Description : </span>
                <p style={{ marginTop: "-5px" }}>
                  {this.state.jobDetails.jobDescription}
                  {/* berste Ziel unseres Unternehmens ist die Zufriedenheit unserer
                Kunden. Vom Moment der Online-Bestellung bis zur reibungslosen
                Koordination dieser Bestellung hinter den Kulissen wollen wir
                stets flexibel, agil und zielgerichtet auftreten. Daher lautet
                eines unserer zentralen Führungsprinzipien "Im Zweifel:
                Handeln"! Wir möchten, dass unsere Teams zusammenarbeiten, die */}
                </p>
              </div>
              <div>
                <span className="description-titles">
                  Your role as {this.state.jobDetails.jobRole} :{" "}
                </span>
                <p style={{ marginTop: "-5px" }}>
                  {this.state.jobDetails.yourRole}
                  {/* berste Ziel unseres Unternehmens ist die Zufriedenheit unserer
                Kunden. Vom Moment der Online-Bestellung bis zur reibungslosen
                Koordination dieser Bestellung hinter den Kulissen wollen wir
                stets flexibel, agil und zielgerichtet auftreten. Daher lautet
                eines unserer zentralen Führungsprinzipien "Im Zweifel:
                Handeln"! Wir möchten, dass unsere Teams zusammenarbeiten, die */}
                </p>
              </div>
              <div>
                <span className="description-titles">Expected Skills : </span>
                <p style={{ marginTop: "-5px" }}>
                  {this.state.jobDetails.expectedSkills}
                  {/* berste Ziel unseres Unternehmens ist die Zufriedenheit unserer
                Kunden. Vom Moment der Online-Bestellung bis zur reibungslosen
                Koordination dieser Bestellung hinter den Kulissen wollen wir
                stets flexibel, agil und zielgerichtet auftreten. Daher lautet
                eines unserer zentralen Führungsprinzipien "Im Zweifel:
                Handeln"! Wir möchten, dass unsere Teams zusammenarbeiten, die */}
                </p>
              </div>
              <div>
                <span className="description-titles">
                  About Company and more info :{" "}
                </span>
                <p style={{ marginTop: "-5px" }}>
                  {this.state.jobDetails.aboutCompany}
                  {/* berste Ziel unseres Unternehmens ist die Zufriedenheit unserer
                Kunden. Vom Moment der Online-Bestellung bis zur reibungslosen
                Koordination dieser Bestellung hinter den Kulissen wollen wir
                stets flexibel, agil und zielgerichtet auftreten. Daher lautet
                eines unserer zentralen Führungsprinzipien "Im Zweifel:
                Handeln"! Wir möchten, dass unsere Teams zusammenarbeiten, die */}
                </p>
              </div>
            </div>
          </div>
          <div className="jobProfile__section-3">
            <p>
              <span className="description-titles">Package :</span>{" "}
              {this.state.jobDetails.package}
            </p>
            <p>
              <span className="description-titles">Location :</span>{" "}
              {this.state.jobDetails.postingLocation}
            </p>
            <p>
              <span className="description-titles">Batches Graduating in:</span>{" "}
              {this.state.jobDetails.batchesAllowed?.join(", ")}
            </p>
            <p>
              <span className="description-titles">Min CGPA :</span>{" "}
              {this.state.jobDetails.minCgpa}
            </p>
            <p>
              <span className="description-titles">Max Backlog :</span>{" "}
              {this.state.jobDetails.maxBacklogsAllowed}
            </p>
            <p>
              <span className="description-titles">Is Only for Female :</span>{" "}
              {this.state.jobDetails.onlyForFemales ? "Yes" : "No"}
            </p>
            <p>
              <span className="description-titles">Last date to apply :</span>
              {moment(this.state.jobDetails.deadlineDate).format(
                "DD-MM-YYYY hh:mm A"
              )}
            </p>
            {jwt.decode(JSON.parse(localStorage.getItem("token")).token)
              .role === "tpo" ? null : (
              <>
                <p>
                  <span className="description-titles">Eligibile :</span>{" "}
                  {this.state.jobDetails.isStudentEligible ? "Yes" : "No"}
                </p>
                {this.state.jobDetails.isStudentEligible ? null : (
                  <p>
                    <span className="description-titles">
                      Ineligibility Reason :
                    </span>{" "}
                    {this.state.jobDetails.inEligibilityReason}
                  </p>
                )}

                <p className="apply-button-container">
                  {this.state.jobDetails.isStudentEligible ? (
                    <button
                      className="btn text-gray-100 bg-green-600 hover:bg-green-800"
                      onClick={() => applyForJob(this.state.id)}
                    >
                      Apply
                    </button>
                  ) : (
                    ""
                  )}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default JobProfile;
