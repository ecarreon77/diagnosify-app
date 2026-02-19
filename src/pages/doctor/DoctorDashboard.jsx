import React from "react";
import { getUserRole } from "../../api/auth";

const DoctorDashboard = () => {
  const role = getUserRole();
  console.log(role);
  return <div>DoctorDashboard</div>;
};

export default DoctorDashboard;
