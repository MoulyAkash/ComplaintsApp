import { FaBell, FaCheck, FaClock, FaTimes } from "react-icons/fa";
import { useAlert } from "react-alert";

export const equalsIgnoreCase = (str1, str2) => {
  return str1.toString().toUpperCase() === str2.toString().toUpperCase();
};

export function isObject(objValue) {
  return (
    objValue && typeof objValue === "object" && objValue.constructor === Object
  );
}

export function toUpper(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substr(1))
    .join(" ");
}

export const initialModalContents = {
  id: 1,
  block: "Block Name",
  floor: 1,
  room: 1,
  type: "Type Name",
  complaint: "Complaint Name",
  registeredTime: "1/1/1 01:00 AM",
  updatedTime: "1/1/1 01:00 AM",
  status: "Undefined",
};

export const initialEmployeeModalContents = {
  id: 1,
  block: "Block Name",
  floor: 1,
  room: 1,
  complaint: "Complaint Name",
  registeredTime: "1/1/1 01:00 AM",
  updatedTime: "1/1/1 01:00 AM",
  status: "Undefined",
};

export const initialFilters = {
  block: ["All", "Abdul Kalam Lecture Hall", "RLHC", "CB"],
  floor: ["All", 1, 2, 3, 4],
  type: ["All", "Electrician", "Civil and Maintenance", "Education Aid"],
  status: ["All", "Resolved", "Registered", "Verified", "Unable to Resolve"],
};

export const defaultFilters = {
  block: "All",
  floor: "All",
  type: "All",
  status: "All",
};

export const initialEmployeeFilters = {
  block: ["All", "Abdul Kalam Lecture Hall", "RLHC", "CB"],
  floor: ["All", 1, 2, 3, 4],
  status: ["All", "Resolved", "Registered", "Verified", "Unable to Resolve"],
};

export const employeeDefaultFilters = {
  block: "All",
  floor: "All",
  status: "All",
};

export const complaintTableHead = [
  "id",
  "block",
  "floor",
  "room",
  "type",
  "complaint",
  "registeredTime",
  "updatedTime",
  "status",
];

export const employeeComplaintTableHeade = [
  "id",
  "block",
  "floor",
  "room",
  "complaint",
  "registeredTime",
  "updatedTime",
  "status",
];

export const getLabelType = (status) => {
  if (equalsIgnoreCase(status, "resolved")) return "green";
  else if (equalsIgnoreCase(status, "unable to resolve")) return "red";
  else if (equalsIgnoreCase(status, "verified")) return "blue";
  else if (equalsIgnoreCase(status, "registered")) return "yellow";
};

export const getLabelIcon = (status) => {
  if (equalsIgnoreCase(status, "resolved")) return <FaBell />;
  else if (equalsIgnoreCase(status, "unable to resolve")) return <FaTimes />;
  else if (equalsIgnoreCase(status, "verified")) return <FaCheck />;
  else if (equalsIgnoreCase(status, "registered")) return <FaClock />;
};

export const renderHead = (item, index, userType) => {
  if (equalsIgnoreCase(userType, "employee") && equalsIgnoreCase(item, "type"))
    return null;
  return (
    <th
      // style={{ textAlign: equalsIgnoreCase(item, "status") ? "right" : "" }}
      className={
        equalsIgnoreCase(item, "id") ||
        equalsIgnoreCase(item, "floor") ||
        equalsIgnoreCase(item, "room") ||
        equalsIgnoreCase(item, "type") ||
        equalsIgnoreCase(item, "registeredTime") ||
        equalsIgnoreCase(item, "updatedTime")
          ? "mobile-hide"
          : ""
      }
      key={index}
    >
      {item}
    </th>
  );
};

export const renderBody = (
  item,
  index,
  userType,
  setModalContents,
  setModalOpen
) => {
  return (
    <tr
      key={index}
      onClick={() => {
        setModalContents(item);
        setModalOpen(true);
      }}
    >
      <td className="mobile-hide">{item.id}</td>
      <td className="long-table-item">{item.block}</td>
      <td className="mobile-hide">{item.floor}</td>
      <td className="mobile-hide">{item.room}</td>
      {!equalsIgnoreCase(userType, "employee") && (
        <td className="mobile-hide">{item.type}</td>
      )}
      <td className="long-table-item">{item.complaint}</td>
      <td className="moderate-table-item mobile-hide">
        {getDateString(item.registeredTime)}
      </td>
      <td className="moderate-table-item mobile-hide">
        {getDateString(item.updatedTime)}
      </td>
      <td align={window.innerWidth <= 500 ? "center" : "left"}>
        <div className={`table-tag ${getLabelType(item.status)}`}>
          {item.status}
        </div>
        <div className={`table-tag mobile ${getLabelType(item.status)}`}>
          {getLabelIcon(item.status)}
        </div>
      </td>
    </tr>
  );
};

export const filterOnChange = (setCurrentFilters, { key, value }) => {
  if (key === "block")
    setCurrentFilters((old) => ({
      ...old,
      [key]: value,
      floor: "All",
    }));
  else setCurrentFilters((old) => ({ ...old, [key]: value }));
};

export const renderFilterTag = (currentFilters, item) => (
  <>
    {equalsIgnoreCase(item, "floor") ? "Floor " : null}
    {currentFilters[item]}
  </>
);

export const getDateTimeObject = (dateTime) => {
  //    07/12/22 21:08:37
  dateTime = dateTime.split(" ");
  let date = dateTime[0].split("/");
  let time = dateTime[1].split(":");
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return {
    date: Number(date[0]),
    month: months[date[1] - 1],
    year: Number(date[2]),
    hours: time[0] % 12 || 12,
    minutes: Number(time[1]),
    seconds: Number(time[2]),
    meridiem: time[0] > 12 ? "PM" : "AM",
  };
};

export const getDateString = (dateTime) => {
  dateTime = getDateTimeObject(dateTime);

  dateTime.year === getDateString.presentYear ? (dateTime.year = "") : null;
  return (
    dateTime.month +
    " " +
    dateTime.date +
    " " +
    dateTime.year +
    " · " +
    dateTime.hours +
    " " +
    dateTime.meridiem
  );
};

getDateString.presentYear = new Date().getFullYear() % 100;

// console.log(getDateTimeObject("07/02/22 11:08:37"));

export const alert_error_values = [
  "Only Logged in candidates can change complaint status.",
  "The complaintid doesnot exist.",
  "The complainttype doesnt exist.",
  "login failure",
  "Account already exists",
  "Invalid email address",
  "Username must contain only characters and numbers!",
  "Please fill out the form",
  "Only Logged in candidates can issue a Complaint.",
  "Only Student and Teachers can issue a Complaint.",
  "Only Logged in candidates can view a Complaint.",
  "Only Student and RCs can issue a Complaint.",
  "Only Hostellers can file Complaint",
  "Only RCs can file Complaint",
];

export const alert_success_values = [
  "You have successfully changed the status.",
  "login success",
  "logout success",
  "You have successfully registered!",
];
