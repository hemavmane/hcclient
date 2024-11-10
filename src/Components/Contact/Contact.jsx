import React, { useState, useRef, useEffect } from "react";
import "./Style/Contact.css";
import { useNavigate } from "react-router-dom";
import TabsTitle from "../Utils/TabsTitle";
import axios from "axios";
import emailjs from "emailjs-com";
import * as Yup from 'yup';

const Contact = () => {
  const [btn, setBtn] = useState(true);
  TabsTitle("Contact Us For More Information");

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    Phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    Phone: Yup.string().matches(/^\d{10}$/,"Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string()
    .required("email is required")
    .email("invalid email format"),
    message: Yup.string().required("message is required"),
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await validationSchema.validate(formData, {abortEarly: false});

      const config = {
        url: "/contact/addcontact",

        baseURL: "https://apihc.gdswellness.com/api",
        method: "post",
        headers: { "Content-type": "application/json" },
        data: {
          email: formData.email,
          name: formData.name,
          phone: formData.Phone,
          message: formData.message,
        },
      };

      let response = await axios(config);

      if (response.status === 200) {
        emailjs
          .sendForm(
            "service_0c4e5dw",
            "template_mur6j98",
            e.target,
            "Q7nXQWJ2D9APCTJs_"
          )
          .then(
            () => {
              console.log("SUCCESS!");
            },
            (error) => {
              console.log("FAILED...", error.text);
            }
          );
        alert("Message sent successfully");
        window.location.reload();
      }
    } catch (error) {
      // console.error("Error", error.inner);
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <div className="Contact">
      <h1>
        <span onClick={() => navigate("/")}>Home</span>/<span>contact</span>
      </h1>

      <div>
        <img
          src="https://img.freepik.com/premium-vector/medical-personnel-team-character-doctors-nurses-wearing-surgical-face-mask-standing_399963-1476.jpg?w=740"
          alt=""
        />

        <form onSubmit={handleSubmit}>
          <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="ContactError">{errors.name}</p>}
          </div>

          <div>
          <label htmlFor="phoneNo">Phone</label>
          <input
            id="phoneNo"
            value={formData.Phone}
            onChange={handleInputChange}
            name="Phone"
          />
          {errors.Phone && <p className="ContactError">{errors.Phone}</p>}  
          </div>

          <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="ContactError">{errors.email}</p>}
          </div>

          <div>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="2"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          {errors.message && <p className="ContactError">{errors.message}</p>}
          </div>
          
          <div className="ContactRecaptchaAndSubmitBtn">
            <button
              type="submit"
              style={{ cursor: "pointer" }}
              className={"ContactFormSubmitBtn ContactFormSubmitBtnSuccessful"}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* {
       
      (
          <p className="ContactUsMessageSent">Message Sent Successfully </p>
        )} */}
    </div>
  );
};

export default Contact;
