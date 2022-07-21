import React from "react";
import "../css/more-styles.css";
import AllPendingJobs from "./components/AllPendingJobs";

const PendingApproval = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      {/*  Page content */}
      <AllPendingJobs title={"Pending Approvals"} />
    </div>
  );
};

export default PendingApproval;
