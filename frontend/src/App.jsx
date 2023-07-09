import "./App.css";
import { FaInfo, FaTimes, FaCheck } from "react-icons/fa";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

import RouteConfig from "./pages/RouteConfig";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  // offset: "80px",
  transition: transitions.FADE,
  containerStyle: {
    // right: "90px",
  },
};

const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style} className="alert-wrapper">
    <div className="alert-content">
      <div className={`alert-icon ${options.type}`}>
        {options.type === "info" && <FaInfo />}
        {options.type === "success" && <FaCheck />}
        {options.type === "error" && <FaTimes />}
      </div>
      <div className="alert-desc">{message}</div>
    </div>
    <div className="alert-close-button" onClick={close}>
      <FaTimes />
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <AlertProvider template={AlertTemplate} {...options}>
        <RouteConfig />
      </AlertProvider>
    </div>
  );
}

export default App;
