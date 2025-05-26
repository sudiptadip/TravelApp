import { Header } from "components";
import React from "react";
import { formatDate } from "~/lib/utils";



const AllUsers = () => {
  return (
    <main className="dashboard wrapper">
      <Header title={`Trips Page`} description={"Track users in real time"} />
      All Users Page Content
    </main>
  );
};

export default AllUsers;
