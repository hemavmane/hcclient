import React from "react";
import "./Style/PrivacyPolicy.css";

import { PrivacyPolicyData } from "./Content/PrivacyPolicyConent";
import { useNavigate } from "react-router-dom";
import TabsTitle from "../Utils/TabsTitle";

const PrivacyPolicy = ({ data = PrivacyPolicyData }) => {
  TabsTitle("Privacy Policy : Information")
  const navigate = useNavigate();
  return (
    <div className="PrivacyPolicy">
      <div className="PrivacyPolicyContentContainer">
        <div className="PrivacyPolicyMainTitleAnddescription">
          <h1>
            <span onClick={() => navigate("/")}>Home</span>/
            <span>{data.title}</span>
          </h1>
          <p>{data.description}</p>
        </div>
        {data.content.map((section, index) => (
          <div key={index} className="PrivacyPolicyContentContainer">
            <h2>{section.heading}</h2>
            {section.subDescription01 && <p>{section.subDescription01}</p>}
            {section.points && (
              <ul>
                {section.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            )}
            {section.subDescription02 && (
              <p style={{ margin: "1rem 0" }}>{section.subDescription02}</p>
            )}
            {section.channels && (
              <ul>
                {section.channels.map((channel, idx) => (
                  <li key={idx}>{channel}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default PrivacyPolicy;
