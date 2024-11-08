import React, { useEffect, Suspense } from "react";
import Comp01 from "./Components/Comp01";
import Comp03 from "./Components/Comp03";
import Comp04 from "./Components/Comp04";
import { Comp01Data } from "./Contents/Comp01Data";
import { Comp03Data } from "./Contents/Comp03Data";
import { Comp04Data } from "./Contents/Comp04Data";
import TabsTitle from "../Utils/TabsTitle";
const Home = () => {
  TabsTitle("Health Consultancy : We care for your health!");
  return (
    <>
      <Comp01 data={Comp01Data} />
      <Comp03 data={Comp03Data} />
      <Comp04 data={Comp04Data} />
    </>
  );
};

export default Home;
