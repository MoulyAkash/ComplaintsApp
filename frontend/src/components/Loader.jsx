import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

export default function Loader(props) {
  const [loaded, setLoaded] = useState();

  useEffect(() => {
    setLoaded(props.loaded);
  }, [props.loaded]);

  return (
    <div className={`loading-wrapper ${loaded ? "loaded" : ""}`}>
      <InfinitySpin width="200" color="var(--primary-color)" />
    </div>
  );
}
