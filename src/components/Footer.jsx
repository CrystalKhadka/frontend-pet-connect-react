import React from "react";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";
import { toast } from "react-toastify";

const Footer = () => {
  const handleEmailClick = () => {
    toast.success("Email copied to clipboard");
  };
  return (
    <>
      <footer className="bg-black text-white p-3 footer">
        <div className="d-flex justify-content-between align-items-center mx-5">
          <div>
            <div className="d-flex">
              <img
                src="./assets/icons/icon.jpg"
                alt="Icon"
                className="footer-logo"
              />
              <h3>Pet Connect</h3>
            </div>
            <p>Swipe. Adopt. Love.</p>
          </div>
          <div className="d-flex flex-column">
            <span className=" h2" >
              Help
            </span>
            <a href="/terms" className="">
              Terms & Conditions
            </a>
            <a href="/privacy" className="">
              Privacy Policy
            </a>
          </div>
          <div>
            <span className="row mx-2">Contact Us</span>
            <span className="row mx-2 " onClick={handleEmailClick}>
              khadkacrystal@gmail.com
            </span>
            <div className="row my-2 mx-1">
              <a
                href="https://www.instagram.com/khadkacrystal/?hl=en"
                className="col-4"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/crystal.khadka/"
                className="col-4"
              >
                <FaFacebookF />
              </a>
              <a href="https://github.com/CrystalKhadka" className="col-4">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
