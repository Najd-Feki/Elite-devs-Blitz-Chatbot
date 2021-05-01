/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "components/headers/light";
import Zoom from "react-reveal/Flash";
import Fade from "react-reveal/Fade";
import tw from "twin.macro";
import "../assets/progress/progress.css";
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import assist from "images/assist.jpg";
import Features from "components/features/TwoColWithButton";
import Typical from "react-typical";
import ProgressCards from "components/progress/ProgressCards";
import Footer from "components/footers/SimpleFooter";

import { connect } from "react-redux";

import axios from "axios";
const Progress = ({ auth }) => {
  const Subheading = tw.div`uppercase  font-bold text-primary-500`;
  const HighlightedText = tw.div`text-primary-500 `;
  const Legend = tw.span` block italic text-primary-100 text-center`;
  const LegendTitle = tw.span` block font-bold text-lg text-primary-500 text-center`;

  const [date, setdate] = useState(moment().format("YYYY-MM-D"));
  const [open, setOpen] = useState(false);

  const data = {
    name: "Active status grid",
    days: ["2021-04-22", "2021-04-23"],
  };

  let daysRecordedA = [];
  auth.user?.loginDates.forEach((element) => {
    daysRecordedA.push(element.slice(0, 10));
  });
  let daysRecorded = [...new Set(daysRecordedA)];

  console.log(daysRecorded);
  const dayGrids = [];
  for (var i = 0; i < 365; i++) {
    let dayGridDate = moment("2021-01-01").add(i, "days").format("YYYY-MM-D");
    if (daysRecorded.includes(dayGridDate.toString())) {
      if (!open) setOpen(true);
      dayGrids.push(
        <Zoom duration={3500}>
          <div onMouseEnter={() => setdate(dayGridDate)} id={"PopoverFocus"} dataLevel={2} key={i} />
        </Zoom>
      );
    } else {
      dayGrids.push(<div key={i} />);
    }
  }
  return (
    <>
      <Header />
      <Features
        imageSrc={assist}
        subheading={<Subheading>Progress</Subheading>}
        heading={
          <>
            Keep track of your
            <HighlightedText>
              <Typical steps={["Achievements.", 1500, "Courses.", 1500, "Certificates.", 1500]} loop={Infinity} wrapper="div" />
            </HighlightedText>
          </>
        }
        description="In this page you can view your courses, your certificates and you progress so you can keep track of your studies."
        imageRounded={true}
        imageBorder={true}
        textOnLeft={false}
        imageDecoratorBlob={true}
      ></Features>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Fade top right duration={1200}>
        <LegendTitle>{data.name}</LegendTitle>
        <div className="graph">
          <ul className="months">
            <li>Jan</li>
            <li>Feb</li>
            <li>Mar</li>
            <li>Apr</li>
            <li>May</li>
            <li>Jun</li>
            <li>Jul</li>
            <li>Aug</li>
            <li>Sep</li>
            <li>Oct</li>
            <li>Nov</li>
            <li>Dec</li>
          </ul>
          <ul className="days">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <div className="squares">{dayGrids}</div>
        </div>
        <Legend>Last 365 Days</Legend>
        {open ? (
          <UncontrolledPopover children="hover focus click" trigger="hover" placement="bottom" target="PopoverFocus">
            <PopoverHeader>{date}</PopoverHeader>
            <PopoverBody>You were active on this day</PopoverBody>
          </UncontrolledPopover>
        ) : (
          <div></div>
        )}
      </Fade>
      <ProgressCards auth={auth}></ProgressCards>
      <Footer></Footer>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Progress);
