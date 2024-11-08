import React, { useEffect, useState } from "react";
import "./Styles/Comp03.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ApiUrl } from "../../ApiUrl";
import getData from "../../Methods"

const Comp03 = ({ data }) => {
  const [service, setService] = useState([])
  useEffect(() => {
    getServices()
  }, [])
  const getServices = async () => {
    try {
      const response = await getData(ApiUrl.GETSERVICE);

      if (response.status === 200) {

        setService(response.data);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="Comp03">
      {service.map((ele, ind) => {
        return (
          <div key={ind} className="Comp03Card">
            <LazyLoadImage  src={`${ApiUrl.IMAGEURL}/ServiceImage/${ele?.serviceImg}`} alt="Image" effect="blur" className="Comp03CardImage"/>
            <h3>{ele?.title}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Comp03;
