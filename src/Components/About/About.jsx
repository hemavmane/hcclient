import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/About.css";
import { AboutDataComp04 } from "./Content/AboutContent";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import TabsTitle from "../Utils/TabsTitle";
import { ApiUrl } from "../ApiUrl";
import getData from "../Methods";
import Mission from "../Images/Mission.svg";
import Vision from "../Images/Vision.svg";

const About = () => {
  TabsTitle("About Us : About The Company");
  const navigate = useNavigate();

  const [aboutData, setAboutData] = useState(null);
  const [overview, setOverview] = useState([]);
  const [animatedCounts, setAnimatedCounts] = useState([]);

  useEffect(() => {
    getAbout();
    getOverview();
  }, []);

  const getAbout = async () => {
    try {
      const response = await getData(ApiUrl.GETABOUT);
      if (response.status === 200) {
        setAboutData(response.data);
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
    }
  };

  const getOverview = async () => {
    try {
      const response = await getData(ApiUrl.GETOVERVIEW);
      if (response.status === 200) {
        setOverview(response.data);
        setAnimatedCounts(new Array(response.data.length).fill(0));
        
      }
    } catch (error) {
      console.error("Error fetching overview data:", error);
    }
  };

  useEffect(() => {
    if (overview.length > 0) {
      startCountUpAnimation();
    }
  }, [overview]);

  const startCountUpAnimation = () => {
    const intervalTime = 30; 
    overview.forEach((ele, index) => {
      const targetCount = ele.counts;
      const interval = setInterval(() => {
        setAnimatedCounts((prevCounts) => {
          const updatedCounts = [...prevCounts];
          if (updatedCounts[index] < targetCount) {
            updatedCounts[index] += 1;
          } else {
            updatedCounts[index] = targetCount; 
            clearInterval(interval);
          }
          return updatedCounts;
        });
      }, intervalTime);
    });
  };
  

  return (
    <div className="About">
      <h1>
        <span onClick={() => navigate("/")}>Home</span>/<span>About</span>
      </h1>

      <div className="AboutContainer02">
        <div className="AboutContainer02TitleAndDescription">
          <h2>{aboutData?.title}</h2>
          <article>{aboutData?.description}</article>
        </div>
        <div className="AboutContainer02ImageContainer">
          <LazyLoadImage
            className="AboutContainer02Image"
            src={`${ApiUrl.IMAGEURL}/AboutImage/${aboutData?.aboutImg}`}
            alt="About Image"
            effect="blur"
          />
        </div>
      </div>

      <div className="AboutContainer01">
        {overview?.map((ele, index) => (
          <div key={index}>
            <img style={{ width: "2.5rem" }} src={`${ApiUrl.IMAGEURL}/OverviewImage/${ele.logo}`} alt={ele.title} />
            <div>
              <h1>{animatedCounts[index]}+</h1>
              <p>{ele.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="AboutContainer03">
        <div className="AboutContainer03Vision">
          <img style={{ width: "4rem" }} src={Vision} alt="Vision" />
          <h1>Vision</h1>
          <p>To foster a healthier future for all through personalized healthcare solutions in U.S.A</p>
        </div>
        <div className="AboutContainer03Mission">
          <img style={{ width: "4rem" }} src={Mission} alt="Mission" />
          <h1>Mission</h1>
          <p>Empowering individuals with expert guidance and innovative strategies for optimal health.</p>
        </div>
      </div>

      <div className="NewAboutContainer04">
        {AboutDataComp04.map((ele, ind) => (
          <div key={ind} className="NewAboutContainer04Card">
            <img src={ele.icon} alt="icon" />
            <h1>{ele.heading}</h1>
            <ul>
              {ele.points &&
                ele.points.map((point, index) => (
                  <li key={index}>{point.point}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
