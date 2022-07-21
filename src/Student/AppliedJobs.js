import React, { Component } from "react";
import { Link } from "react-router-dom";

import JobCard from "../components/JobCard";
import {BASE_URL} from "../CONSTANTS";

async function getAppliedJobs() {
  try {
    const data = await fetch(`${BASE_URL}/jobs/applied`, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token")).token,
      },
    });
    const retData = await data.json();
    console.log("data", retData);
    return retData;
  } catch (err) {
    console.error("Error in loading data from server", err);
    return "error, please check console for details";
  }
}

class AllJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AppliedJobs: [],
    };
  }

  componentDidMount() {
    getAppliedJobs()
      .then((res) => {
        // console.log(res);
        this.setState({ AppliedJobs: res });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const jobcard = this.state.AppliedJobs.map((val) => {
      // console.log(val);
      // let val = value.toObject();
      val.deadlineDate = "Applied";
      return (
        <Link key={val._id} to={"/jobs/" + val._id}>
          <JobCard details={val} />
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

export default AllJobs;
