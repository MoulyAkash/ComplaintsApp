import React, { useState, useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useAlert } from "react-alert";

import Modal from "./Modal";
import Select from "./Select";
import Button from "./Button";

import APIService from "../api/Service";
import {
  equalsIgnoreCase,
  isObject,
  alert_error_values,
  alert_success_values,
} from "../utils";
import Loader from "./Loader";

export default function AddComplaint(props) {
  const alertUtil = useAlert();
  const alert = (message) => {
    if (alert_error_values.includes(message)) alertUtil.error(message);
    else if (alert_success_values.includes(message)) alertUtil.success(message);
    else alertUtil.info(message);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [blockDetails, setBlockDetails] = useState();
  const [complaintDetails, setComplaintDetails] = useState();

  const [blockNames, setBlockNames] = useState();
  const [complaintTypes, setComplaintTypes] = useState();

  const [complaint, setComplaint] = useState({
    block: "Abdul Kalam Lecture Hall",
    floor: 1,
    room: 101,
    type: "Electrician",
    complaint: "Benches Broken",
  });

  const initDropdownValues = () => {
    setBlockDetails(props.blockDetails);
    if (isObject(props.blockDetails)) {
      let block_names = Object.keys(props.blockDetails);
      setBlockNames(block_names);
      setComplaint((old) => ({
        ...old,
        block: block_names[0],
        floor: props.blockDetails[block_names[0]].floors[0],
        room: props.blockDetails[block_names[0]].rooms[0][0],
      }));
    }
    setComplaintDetails(props.complaintDetails);
    if (isObject(props.complaintDetails)) {
      let complaint_types = Object.keys(props.complaintDetails);
      setComplaintTypes(complaint_types);
      setComplaint((old) => ({
        ...old,
        type: complaint_types[0],
        complaint: props.complaintDetails[complaint_types[0]][0],
      }));
    }
  };

  useEffect(() => {
    initDropdownValues();
  }, [props.blockDetails, props.complaintDetails]);

  const resetBlockInfo = (value) => {
    setComplaint((old) => {
      let temp = {
        ...old,
        floor: blockDetails[value].floors[0],
        room: blockDetails[value].rooms[0][0],
      };
      // console.log(temp);
      return temp;
    });
  };

  const resetRoomInfo = (value) => {
    setComplaint((old) => {
      let temp = {
        ...old,
        room: blockDetails[complaint.block].rooms[value - 1][0],
      };
      // console.log(temp);
      return temp;
    });
    // console.log(complaint);
  };

  const resetComplaintTypeInfo = (value) => {
    setComplaint((old) => {
      let temp = {
        ...old,
        complaint: complaintDetails[value][0],
      };
      // console.log(temp);
      return temp;
    });
  };

  return (
    <>
      <Modal
        customContent={true}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add Complaints"
      >
        <Loader loaded={blockDetails && complaintDetails ? true : false} />
        {blockDetails && complaintDetails && (
          <div className="add-complaint-input-wrapper">
            <Select
              title="Block"
              value={complaint.block}
              values={blockNames}
              onChange={(value) => {
                setComplaint((old) => ({ ...old, block: value }));
                resetBlockInfo(value);
              }}
            />
            <Select
              title="Floor"
              value={complaint.floor}
              values={blockDetails[complaint.block].floors}
              onChange={(value) => {
                setComplaint((old) => ({ ...old, floor: value }));
                resetRoomInfo(value);
              }}
            />
            <Select
              title="Room"
              value={complaint.room}
              values={blockDetails[complaint.block].rooms[complaint.floor - 1]}
              onChange={(value) => {
                setComplaint((old) => {
                  let temp = { ...old, room: value };
                  // console.log(temp);
                  return temp;
                });
              }}
            />
            <Select
              title="Type"
              value={complaint.type}
              values={complaintTypes}
              onChange={(value) => {
                setComplaint((old) => {
                  let temp = { ...old, type: value };
                  // console.log(temp);
                  return temp;
                });
                resetComplaintTypeInfo(value);
              }}
            />
            <Select
              title="Complaint"
              value={complaint.complaint}
              values={complaintDetails[complaint.type]}
              onChange={(value) => {
                setComplaint((old) => {
                  let temp = { ...old, complaint: value };
                  // console.log(temp);
                  return temp;
                });
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1rem",
              }}
            >
              <Button
                title="Add"
                onClick={() => {
                  setIsOpen(false);
                  const sendComplaint = async () => {
                    await APIService.PostData(
                      {
                        Block: complaint.block,
                        Floor: complaint.floor,
                        RoomNo: complaint.room,
                        complainttype: complaint.type,
                        Complaint: complaint.complaint,
                      },
                      props.complaintMode === "institution"
                        ? "college_registercomplaint"
                        : "hostel_registercomplaint"
                    ).then((response) => {
                      alert(response.status);
                      !equalsIgnoreCase(
                        response.status,
                        "complaint already exists!"
                      ) &&
                        props.setComplaints((old) => [
                          ...old,
                          {
                            ...complaint,
                            id: response.complaintid,
                            registeredTime: response.cts,
                            updatedTime: response.cts,
                            status: "registered",
                          },
                        ]);
                    });
                  };
                  sendComplaint();
                }}
              />
            </div>
          </div>
        )}
      </Modal>
      <div
        className="add-complaint-plus-container"
        onClick={() => setIsOpen(true)}
      >
        <div className="add-complaint-plus">
          <BsPlusLg />
        </div>
      </div>
    </>
  );
}
