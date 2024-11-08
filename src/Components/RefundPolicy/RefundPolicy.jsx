import React from "react";
import "./Style/RefundPolicy.css";

import { RefundPolicyData } from "./Content/RefundPolicyContent";
import { useNavigate } from "react-router-dom";
import TabsTitle from "../Utils/TabsTitle";

const RefundPolicy = () => {
TabsTitle("Refund Policy : Information")
    const navigate = useNavigate();
  return (
    <div className="RefundPolicy">
      <h1>
        <span onClick={()=>navigate("/")}>Home</span>/<span>Refund Policy</span>
      </h1>
      <p className="RefundPolicySubHeading">{RefundPolicyData.heading}</p>
      <ul className="RefundPolicyPoints">
        {RefundPolicyData.points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      <p className="RefundPolicySubdescription">{RefundPolicyData.subDescription}</p>
    </div>
  );
};

export default RefundPolicy;
