/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import tw from "twin.macro";
import Header from "components/headers/light.js";
import Footer from "components/footers/SimpleFooter";
import Features from "components/features/ThreeColSimple.js";
import TeamCardGrid from "components/cards/ProfileThreeColGrid.js";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";

//import axios from "axios";
const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default () => {
  const [course, setcourse] = useState("");

  const apiCall = () => {
    //axios.get("https://courses.edx.org/api/courses/v1/courses/");
    fetch("https://courses.edx.org/api/enrollment/v1/enrollment")
      .then((response) => response.text())
      .then((text) => {
        setcourse(text);
      });
  };
  return (
    <>
      <Header />
      <Features
        subheading={<Subheading>Our Values</Subheading>}
        heading="We follow these."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "24/7 Support",
            description: "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport",
          },
          {
            imageSrc: ShieldIconImage,
            title: "Strong Teams",
            description: "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport",
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "Customer Satisfaction",
            description: "Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport",
          },
        ]}
        linkText=""
      />
      <TeamCardGrid subheading={<Subheading>Our Team</Subheading>} />
      <button onClick={apiCall}>SEND</button>
      <div>{course}</div>

      <Footer />
    </>
  );
};
