import React, { useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { GiMilitaryAmbulance } from "react-icons/gi";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { useLocation } from "react-router-dom";
import Blogs from "./Components/Blogs/Blogs";
import Blog01 from "./Components/Blogs/Components/Blog01";
import Blog02 from "./Components/Blogs/Components/Blog02";
import Blog03 from "./Components/Blogs/Components/Blog03";

// Importing components lazily
const Home = React.lazy(() => import("./Components/Home/Home"));
const PrivacyPolicy = React.lazy(() => import("./Components/PrivacyPolicy/PrivacyPolicy"));
const RefundPolicy = React.lazy(() => import("./Components/RefundPolicy/RefundPolicy"));
const Contact = React.lazy(() => import("./Components/Contact/Contact"));
const About = React.lazy(() => import("./Components/About/About"));
const Error = React.lazy(() => import("./Components/Error/Error"));

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header />
      <Suspense fallback={ <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"80vh"}}><GiMilitaryAmbulance style={{fontSize:"5rem",color:"silver"}}/></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} /> 
          <Route path="/blogs/:page_slug" element={<Blog01 />} />

          {/* <Route path="/blogs/blog02" element={<Blog02 />} />
          <Route path="/blogs/blog03" element={<Blog03 />} /> */}
          <Route path="/policy/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/policy/refundPolicy" element={<RefundPolicy />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>  

      {/* <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <GiMilitaryAmbulance
              style={{ fontSize: "5rem", color: "silver" }}
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>

      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <GiMilitaryAmbulance
              style={{ fontSize: "5rem", color: "silver" }}
            />
          </div>
        }
      >
        <Routes>
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>

      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <GiMilitaryAmbulance
              style={{ fontSize: "5rem", color: "silver" }}
            />
          </div>
        }
      >
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>

      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <GiMilitaryAmbulance
              style={{ fontSize: "5rem", color: "silver" }}
            />
          </div>
        }
      >
        <Routes>
        <Route path="/policy/privacyPolicy" element={<PrivacyPolicy />} />
        </Routes>
      </Suspense>

      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <GiMilitaryAmbulance
              style={{ fontSize: "5rem", color: "silver" }}
            />
          </div>
        }
      >
        <Routes>
          <Route path="/policy/refundPolicy" element={<RefundPolicy />} />
        </Routes>
      </Suspense>
  

      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <GiMilitaryAmbulance
              style={{ fontSize: "5rem", color: "silver" }}
            />
          </div>
        }
      >
        <Routes>
        <Route path="/blogs" element={<Blogs />} /> 
        </Routes>
      </Suspense>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <GiMilitaryAmbulance
              style={{ fontSize: "5rem", color: "silver" }}
            />
          </div>
        }
      >
        <Routes>
        <Route path="/blogs/blog01" element={<Blog01 />} />
        </Routes>
      </Suspense>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <GiMilitaryAmbulance
              style={{ fontSize: "5rem", color: "silver" }}
            />
          </div>
        }
      >
        <Routes>
        <Route path="/blogs/blog02" element={<Blog02 />} />
        </Routes>
      </Suspense>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <GiMilitaryAmbulance
              style={{ fontSize: "5rem", color: "silver" }}
            />
          </div>
        }
      >
        <Routes>
        <Route path="/blogs/blog03" element={<Blog03 />} />
        </Routes>
      </Suspense> */}
     
      <Footer />
    </>
  );
}

export default App;

