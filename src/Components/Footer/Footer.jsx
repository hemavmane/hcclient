import React from "react";
import "./Style/Footer.css";
import { useNavigate, Link } from "react-router-dom";

import { MdOutlineMarkEmailRead } from "react-icons/md";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="Footer">
      <div className="FooterContainer_01">
        <div className="FooterPolicy FooterContentContainers">
          <h3>Policy</h3>
          <ul>
            <li onClick={() => navigate("/policy/privacyPolicy")}>
              Privacy Policy
            </li>
            <li onClick={() => navigate("/policy/refundPolicy")}>
              Refund Policy
            </li>
            <li>T & C</li>
          </ul>
        </div>
        <div className="FooterFollowUs FooterContentContainers">
          <h3>Follow Us</h3>
          <ul>
            <li><Link to="https://www.instagram.com/healthconsultancyonline/" target="_blank">Instagram</Link></li>
            <li><Link to="https://www.facebook.com/healthconsultancyonline" target="_blank">Facebook</Link></li>
            <li><Link to="https://www.linkedin.com/company/hconline/" target="_blank">Linkedin</Link></li>
          </ul>
        </div>
        <div className="FooterAddress FooterContentContainers">
          <h3>Address</h3>
          <ul>
            <li>1818 S State College Blvd</li>
            <li>#360, Anaheim, California-92806,USA</li>
            {/* <li>phone : 011-46846-54652</li> */}
            <li style={{display:"flex",alignItems:"center"}}><MdOutlineMarkEmailRead style={{fontSize:"20px",marginRight:"8px"}} />info@healthconsultancy.online</li>
          </ul>
        </div>
      </div>

      <div className="FooterContainer_02">
        <p>
          {"© 2024 Health Consultancy : Developed by "}
          <Link
            style={{
              color: "#FF006E",
              textDecoration: "none",
              fontWeight: "500",
            }}
            to="https://www.justoconsulting.com/"
            target="_blank"
          >
            Justo Consulting
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
