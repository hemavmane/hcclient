import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/About.css";
import { AboutData } from "./Content/AboutContent";

import { AboutDataComp04 } from "./Content/AboutContent";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import TabsTitle from "../Utils/TabsTitle";

import Mission from "../Images/Mission.svg";
import Vision from "../Images/Vision.svg";
// import icon01 from "../Images/icon01.svg";
// import icon02 from "../Images/icon02.svg";
// import icon03 from "../Images/icon03.svg";
// import icon04 from "../Images/icon04.svg";
// import icon05 from "../Images/icon05.svg";
import icon6 from "../Images/icon6.png";
import icon7 from "../Images/icon7.png";
import icon8 from "../Images/icon8.png";
import icon9 from "../Images/icon9.png";

const About = ({ data = AboutData }) => {
  TabsTitle("About Us : About The Company");
  const navigate = useNavigate();

  const [facilities, setFacilities] = useState(0);
  const [capicity, setCapicity] = useState(0);
  const [clinicians, setClinicians] = useState(0);
  const [employees, setEmployees] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFacilities((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount === 23) {
          clearInterval(interval);
        }

        return newCount;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCapicity((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount === 400) {
          clearInterval(interval);
        }
        return newCount;
      });
    }, 12);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setClinicians((prevCount) => {
        const newCount = prevCount + 1;

        if (newCount === 550) {
          clearInterval(interval);
        }
        return newCount;
      });
    }, 14);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEmployees((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount === 2000) {
          clearInterval(interval);
        }
        return newCount;
      });
    }, 1);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="About">
      <h1>
        <span onClick={() => navigate("/")}>Home</span>/<span>About</span>
      </h1>

      <div className="AboutContainer02">
        <div className="AboutContainer02TitleAndDescription">
          <h2>{data.title}</h2>
          <article>{data.description}</article>
        </div>

        <div className="AboutContainer02ImageContainer">
          <LazyLoadImage
            className="AboutContainer02Image"
            src={data.image}
            alt="IMAGE"
            effect="blur"
          />
        </div>
      </div>

      <div className="AboutContainer01">
        <div>
          <img style={{ width: "2.5rem" }} src={icon6} alt="" />
          <div>
            <h1>{facilities}+</h1>
            <p>Facilities</p>
          </div>
        </div>
        <div>
          <img style={{ width: "2.5rem" }} src={icon7} alt="" />
          <div>
            <h1>{capicity} +</h1>
            <p>Bed Capicity</p>
          </div>
        </div>
        <div>
          <img style={{ width: "2.5rem" }} src={icon8} alt="" />
          <div>
            <h1>{clinicians} +</h1>
            <p>Clinicians</p>
          </div>
        </div>
        <div>
          <img style={{ width: "2.5rem" }} src={icon9} alt="" />
          <div>
            <h1>{employees} +</h1>
            <p>Employees</p>
          </div>
        </div>
      </div>

      <div className="AboutContainer03">
        <div className="AboutContainer03Vision">
          <img style={{ width: "4rem" }} src={Vision} alt="" />
          <h1>Vision</h1>
          <p>
            To foster a healthier future for all through personalized healthcare
            solutions in U.S.A{" "}
          </p>
        </div>

        <div className="AboutContainer03Mission">
          <img style={{ width: "4rem" }} src={Mission} alt="" />
          <h1>Mission</h1>
          <p>
            Empowering individuals with expert guidance and innovative
            strategies for optimal health.{" "}
          </p>
        </div>
      </div>



      <div className="NewAboutContainer04">
        {AboutDataComp04.map((ele, ind) => {
          return (
            <div key={ind} className="NewAboutContainer04Card">
              <img src={ele.icon} alt="icon" />
              <h1>{ele.heading}</h1>
              <ul>
                {ele.points &&
                  ele.points.map((point, ind) => (
                    <li key={ind}>{point.point}</li>
                  ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default About;
