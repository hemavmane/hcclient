import React,{useState} from "react";
import "./Style/Header.css";
import {  NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import healthconsultancyLogo from "../Images/healthconsultancyLogo.webp";
const Header = () => {
  const [menuOpen,setMenuOpen]=useState(false);
  return (
    <nav className="HeaderNav">
      <div className="HeaderNavCompanyName">
        <NavLink to="/">
            <img className="healthconsultancyLogo" src={healthconsultancyLogo} alt="LogoIcon" />
        </NavLink>
      </div>
      <ul className={ menuOpen ? "open":"" }>
        <li>
          <NavLink to="/" onClick={()=>setMenuOpen(!menuOpen)}>HOME</NavLink>
        </li>
        
        <li>
          <NavLink to="/about" onClick={()=>setMenuOpen(!menuOpen)}>ABOUT US</NavLink>
        </li>
        <li>
          <NavLink to = "/contact" onClick={()=>setMenuOpen(!menuOpen)}  >CONTACT US</NavLink>
        </li>
        <li>
          <NavLink to = "/blogs" onClick={()=>setMenuOpen(!menuOpen)}  >BLOGS</NavLink>
        </li>
      </ul>
      <div className="HeaderNavHamburger" >
        {!menuOpen ? <GiHamburgerMenu className="Hamburger"  onClick={()=>{setMenuOpen(!menuOpen)}}/> : <IoCloseSharp className="CloseIcon" onClick={()=>{setMenuOpen(!menuOpen)}}/>}
      
      </div>
    </nav>
  );
};

export default Header;
