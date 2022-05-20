import React from "react";
import { ExternalLink } from "react-external-link";

const Footer = () => {
  return (
    <footer
      className="page-footer font-small unique-color-dark"
      style={{ paddingLeft: "0px", marginTop:"2%"}}
    >
      <div style={{ backgroundColor: "#1c2431", color: "white" }}>
        <div style={{ backgroundColor: "#6351ce" }}>
          <div className="container">
            <div className="row py-4 d-flex align-items-center">
              <div className="col-md-6 col-lg-5 text-left text-md-left mb-4 mb-md-0">
                <h6 className="mb-0">Hope you're having a good time!</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="container text-center text-md-left mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase font-weight-bold">
                About GoodReads
              </h6>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                Here you can read your favourite book from thousands of books
                and rate it, Also you can view it's author info.
              </p>
              <p>Happy Reading ^-^</p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            
              <h6 className="text-uppercase font-weight-bold">
              <a className="li-ic">
                <i className="fab fa-linkedin-in white-text mr-4"> </i>
              </a>
              <h5></h5> Our LinkdIn</h6>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                <ExternalLink href="https://www.linkedin.com/in/ahmed-elkhouly99" style={{color:"#6351ce", textDecoration:"none"}}>
                  Ahmed Elkhouly
                </ExternalLink>
              </p>
              <p>
                <ExternalLink href="https://www.linkedin.com/in/abanoub-kamal-bd98/" style={{color:"#6351ce", textDecoration:"none"}}>
                  Abanoub Kamal
                </ExternalLink>
              </p>
              <p>
                <ExternalLink href="https://www.linkedin.com/in/mahmoud-shokry-73b9b11b4/" style={{color:"#6351ce", textDecoration:"none"}}>
                  Mahmoud Shoukry
                </ExternalLink>
              </p>
              <p>
                <ExternalLink href="https://www.linkedin.com/in/mennatallah-hamdy-4293381b5" style={{color:"#6351ce", textDecoration:"none"}}>
                  Mennatullah Hamdy
                </ExternalLink>
              </p>
              <p>
                <ExternalLink href="https://www.linkedin.com/in/eman-hesham-141673175/" style={{color:"#6351ce", textDecoration:"none"}}>
                  Eman Hesham
                </ExternalLink>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase font-weight-bold">
              {/* <a className="gi-ic"> */}
                <i className="fab fa-github white-text mr-4" color=""> </i>
              {/* </a> */}
               <h5></h5>  Our Github</h6>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: " 60px" }}
              />
              <p>
                <ExternalLink href="https://github.com/AhmedElKhouly99" style={{color:"#6351ce", textDecoration:"none"}}>
                  Ahmed Elkhouly
                </ExternalLink>
              </p>
              <p>
                <ExternalLink href="https://github.com/Abanoub-Kamal-Boshra?tab=overview&from=2022-01-01&to=2022-01-31" style={{color:"#6351ce", textDecoration:"none"}}>
                  Abanoub Kamal
                </ExternalLink>
              </p>
              <p>
                <ExternalLink href="https://github.com/Mahmoudshookry" style={{color:"#6351ce", textDecoration:"none"}}>
                  Mahmoud Shoukry
                </ExternalLink>
              </p>
              <p>
                <ExternalLink href="https://github.com/mennahamdy33" style={{color:"#6351ce", textDecoration:"none"}}>
                  Mennatullah Hamdy
                </ExternalLink>
              </p>
              <p>
                <ExternalLink href="https://github.com/eman-hesham97" style={{color:"#6351ce", textDecoration:"none"}}>
                  Eman Hesham
                </ExternalLink>
              </p>
            </div>
          </div>
        </div>

        <div
          className="footer-copyright text-center py-3"
          style={{ backgroundColor: "#151b27" }}
        >
          © 2022 Copyright:
          <a> ITI - IOT Track - </a>
          <ExternalLink href="https://goodreadsusers.herokuapp.com/">
                 Users App
                </ExternalLink>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
