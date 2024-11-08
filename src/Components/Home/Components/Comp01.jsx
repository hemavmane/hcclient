import React, { useEffect, useState } from "react";
import "./Styles/Comp01.css";
import { useNavigate } from "react-router-dom";
import { ApiUrl } from "../../ApiUrl";
import getData from "../../Methods"


const Comp01 = ({ data }) => {
  const navigate = useNavigate();
  const [banner, setBanner] = useState(null)
  useEffect(() => {
    getBanner()
  }, [])
  const getBanner = async () => {
    try {
      const response = await getData(ApiUrl.GETBANNER);

      if (response.status === 200) {

        setBanner(response.data[0]);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="Comp01"  style={{
      backgroundImage: `url(${ApiUrl.IMAGEURL}/BannerImage/${banner?.bannerImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}  >
      <div className="Comp01Contaiber">
        <h1>{banner?.title}</h1>
        <p>{banner?.subtitle}</p>
        <button onClick={()=>navigate("/contact")} style={{ backgroundColor: banner?.btnColor }}  >{banner?.btnText}</button>
      </div>
    </div>
  );
};

export default Comp01;
