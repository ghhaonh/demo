import { listUser } from "@/actions/api/account/list-user";
import React from "react";

const DashboardAccountPage = async () => {
  const users = await listUser();
  console.log(users);
  return <div>{JSON.stringify(users)}</div>;
};

export default DashboardAccountPage;
