import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";
import "./Loader.css"


function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div className="sweet-loading">     
      <HashLoader color="#36d7b7" size={50} />
    </div>
  );
}

export default Loader;
