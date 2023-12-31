import React, { useState } from "react";
import Complaints from "./Complaints";
import Menubar from "../../components/Menubar";

export default function AdminApp() {
  const [complaintMode, setComplaintMode] = useState("hostel");
  const pages = ["hostel", "institution"];

  return (
    <>
      <Menubar page={complaintMode} setPage={setComplaintMode} pages={pages} />
      <div className="main-app-wrapper">
        <Complaints
          complaintMode={complaintMode}
          complaintModes={pages}
          setComplaintMode={setComplaintMode}
        />
      </div>
    </>
  );
}
