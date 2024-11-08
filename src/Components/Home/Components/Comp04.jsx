import React, { useEffect, useState } from 'react';
import "./Styles/Comp04.css";
import { ApiUrl } from "../../ApiUrl";
import getData from "../../Methods"

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Comp04 = ({data}) => {
  const [ProviderTrust, setProviderTrust] = useState([])
  useEffect(() => {
    getProviderTrust()
  }, [])
  const getProviderTrust= async () => {
    try {
      const response = await getData(ApiUrl.GETPROVIDERTRUST);

      if (response.status === 200) {

        setProviderTrust(response.data);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className='Comp04'>
        {ProviderTrust.map((item,ind)=>{
            return <div key={ind} className='Comp04ContentContainer'>
                <LazyLoadImage src={`${ApiUrl.IMAGEURL}/ProviderTrust/${item?.providerTrustImg}`} className='Comp04ContentcontainerImage' alt="Image" effect="blur"/>
                <h3>{item?.title}</h3>
                <p>{item?.subtitle}</p>
            </div>
        })}
    </div>
  )
}

export default Comp04;