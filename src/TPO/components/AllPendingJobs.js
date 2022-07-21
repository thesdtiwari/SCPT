import React, { Component } from "react";
import { Link } from "react-router-dom";

import JobCard from "../../components/JobCard";
import { BASE_URL } from "./../../CONSTANTS";

async function getAllJobs() {
  try {
    const data = await fetch(`${BASE_URL}/tpo/pendingjob`, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      },
    });
    const retData = await data.json();
    // console.log("data", retData);
    return retData;
  } catch (err) {
    console.error("Error in loading data from server", err);
    return "error, please check console for details";
  }
}

class AllPendingJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PendingJobs: [],
    };
  }

  componentDidMount() {
    getAllJobs()
      .then(res => {
        // console.log(res);
        this.setState({ PendingJobs: res });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const jobcard = this.state.PendingJobs?.map(it => {
      console.log(it);
      return (
        <Link
          key={it.jobId}
          to={"/pending-approvals/" + it._id}
          style={{ margin: "5px auto 10px" }}
        >
          <div className="flex flex-col">
            <JobCard details={it} />
            <button
              style={{
                backgroundColor: "#1a5f99",
                width: "90%",
                margin: "auto",
                height: "20%",
                padding: "5px",
                marginTop: "-20px",
                borderBottomLeftRadius: "60%",
                borderBottomRightRadius: "60%",
                zIndex: 1,
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              Review Job Data Filled by Company
            </button>
          </div>
        </Link>
      );
    });

    return (
      <div className="flex flex-col overflow-hidden">
        {/*  Page content */}
        <div className="jobsApply__section">
          <h3 className="jobsApply__section-heading">{this.props.title}</h3>
          <main className="jobsApply__container flex-grow">
            {/* <div className="JobsApply__container"> */}
            {jobcard}
            {/* </div> */}
          </main>
        </div>
      </div>
    );
  }
}

export default AllPendingJobs;
