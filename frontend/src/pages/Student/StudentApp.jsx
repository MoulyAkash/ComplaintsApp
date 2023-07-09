import React, { useEffect, useState } from "react";
import Complaints from "./Complaints";
import Menubar from "../../components/Menubar";
import { equalsIgnoreCase } from "../../utils";

export default function AdminApp() {
  const [complaintMode, setComplaintMode] = useState("hostel");
  const [pages, setPages] = useState(null);

  useEffect(() => {
    const { subtype } = JSON.parse(sessionStorage.getItem("ck"));
    if (equalsIgnoreCase(subtype, "dayscholar")) {
      setComplaintMode("institution");
      setPages(["institution"]);
    } else setPages(["hostel", "institution"]);
  }, []);

  return (
    <>
      {pages && (
        <>
          <Menubar
            page={complaintMode}
            setPage={setComplaintMode}
            pages={pages}
          />
          <div className="main-app-wrapper">
            <Complaints
              complaintMode={complaintMode}
              complaintModes={pages}
              setComplaintMode={setComplaintMode}
            />
          </div>
        </>
      )}
    </>
  );
}
