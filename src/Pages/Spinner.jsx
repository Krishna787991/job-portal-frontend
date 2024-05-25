import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/FadeLoader";
function Spinner() {
  let [loading, setLoading] = useState(true);
  return (
    <div className="sweet-loading">     
      <FadeLoader color="#36d7b7" size={50} />
    </div>
  );
}
export default Spinner;
