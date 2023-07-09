import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";

import Table from "../../components/Table/Table";
import Modal from "../../components/Modal";
import Dropdown from "../../components/Dropdown/Dropdown";
import Loader from "../../components/Loader";
import SpecialSelect from "../../components/SpecialSelect";

import APIService from "../../api/Service";
import {
  initialModalContents,
  employeeDefaultFilters,
  complaintTableHead,
  renderHead,
  renderBody,
  filterOnChange,
  renderFilterTag,
  equalsIgnoreCase,
  alert_error_values,
  alert_success_values,
} from "../../utils";

export default function Complaints({
  complaintMode,
  setComplaintMode,
  complaintModes,
}) {
  const alertUtil = useAlert();
  const alert = (message) => {
    if (alert_error_values.includes(message)) alertUtil.error(message);
    else if (alert_success_values.includes(message)) alertUtil.success(message);
    else alertUtil.info(message);
  };
  const [complaints, setComplaints] = useState();
  const [limit, setLimit] = useState(8);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContents, setModalContents] = useState(initialModalContents);
  const [blockDetails, setBlockDetails] = useState();

  const [filters, setFilters] = useState({
    block: [],
    floor: [],
    status: ["Resolved", "Registered", "Verified", "Unable to resolve"],
  });

  const getData = async () => {
    await APIService.PostData(
      {
        category: complaintMode,
      },
      "getComplaints/workers"
    ).then((response) => {
      // console.log(response);
      let data = response.complaint.map(function (item) {
        return {
          block: item.block,
          complaint: item.complaint,
          id: item.complaintid,
          type: item.complainttype,
          registeredTime: item.cts,
          floor: 1,
          room: item.roomno,
          status: item.status,
          updatedTime: item.uts,
        };
      });
      setComplaints(data);
    });
  };

  const getDropdownValues = async () => {
    let newFilters = {
      block: ["All"],
      floor: [],
      status: [
        "All",
        "Resolved",
        "Registered",
        "Verified",
        "Unable to resolve",
      ],
    };
    await APIService.PostData(
      { category: complaintMode },
      "getBlocksData"
    ).then((response) => {
      // console.log(response);
      setBlockDetails(response);
      newFilters.block = ["All", ...Object.keys(response)];
      for (let block_name of Object.keys(response))
        newFilters.floor.push(["All", ...response[block_name].floors]);
    });
    // console.log(newFilters);
    setFilters(newFilters);
  };

  useEffect(() => {
    window.innerWidth - window.innerHeight < 357
      ? setLimit(window.innerHeight / 100)
      : null;
  }, []);

  useEffect(() => {
    setComplaints();
    setFilters();
    getData();
    getDropdownValues();
  }, [complaintMode]);

  return (
    <>
      <Modal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        modalContents={modalContents}
        title="Complaint Details"
        type="employee"
        onStatusChange={async (id, status) => {
          await APIService.PostData(
            {
              complaintid: id,
              Status: status,
            },
            equalsIgnoreCase(complaintMode, "institution")
              ? "college_change_complaint_status"
              : "hostel_change_complaint_status"
          ).then((response) => {
            alert(response.status);
            getData();
            getDropdownValues();
          });
        }}
      />
      <Loader loaded={complaints ? true : false} />
      <div className={`complaints-wrapper ${complaints ? "loaded" : ""}`}>
        {complaints && (
          <Table
            limit={limit}
            title={
              <SpecialSelect
                values={complaintModes}
                currentValue={complaintMode}
                setCurrentValue={setComplaintMode}
              />
            }
            headData={complaintTableHead}
            renderHead={(item, index) => renderHead(item, index, "employee")}
            bodyData={complaints}
            renderBody={(item, index) =>
              renderBody(
                item,
                index,
                "employee",
                setModalContents,
                setModalOpen
              )
            }
            filters={filters}
            filter={Dropdown}
            filterOnChange={filterOnChange}
            renderFilterTag={renderFilterTag}
            defaultFilters={employeeDefaultFilters}
          />
        )}
      </div>
    </>
  );
}
