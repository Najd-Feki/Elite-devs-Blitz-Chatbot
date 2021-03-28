/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";

import defaultCardImage from "images/shield-icon.svg";

import { ReactComponent as SvgDecoratorBlob3 } from "images/svg-decorator-blob-3.svg";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomizeIconImage from "images/customize-icon.svg";
import FastIconImage from "images/fast-icon.svg";
import ReliableIconImage from "images/reliable-icon.svg";
import SimpleIconImage from "images/simple-icon.svg";

const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 md:py-24`}
`;
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const VerticalSpacer = tw.div`mt-10 w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 max-w-sm`}
`;

const Card = styled.div`
  ${tw`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-8`}
  .imageContainer {
    ${tw`animate-pulse border text-center rounded-full p-5 flex-shrink-0`}
    img {
      ${tw`transition  duration-500  transform hover:-translate-y-1 hover:scale-110 w-6 h-6`}
    }
  }

  .textContainer {
    ${tw`sm:ml-4 mt-4 sm:mt-2`}
  }

  .title {
    ${tw`mt-4 tracking-wide font-bold text-2xl leading-none`}
  }

  .description {
    ${tw`mt-1 sm:mt-4 font-medium text-secondary-100 leading-loose`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

export default ({
  cards = null,
  heading = "Amazing Features",
  subheading = "Features",
  description = "BLITZ chatbot will be your gate for a better personal development, faster learning and greater time managment",
}) => {
  const defaultCards = [
    {
      imageSrc: ShieldIconImage,
      title: "Secure",
      description: "We strictly only use your data for your own benefit such as resume creation or searching for courses.",
    },
    { imageSrc: SupportIconImage, title: "24/7 Support", description: "You can ask blitz or the developers for help whenever you want." },
    {
      imageSrc: CustomizeIconImage,
      title: "Customizable",
      description: "With Blitz's help you can customize your data,your profile or your preferences.",
    },
    {
      imageSrc: ReliableIconImage,
      title: "Reliable",
      description: "Our database is heavily backed up to guarantee the safety of your data and the ease of your access to our services",
    },
    {
      imageSrc: FastIconImage,
      title: "Fast",
      description: "We focused on the optimization and using the best cloud providers so you can have the fastest response time ",
    },
    { imageSrc: SimpleIconImage, title: "Easy", description: "We can guarantee the best user experience with the simplicty of our design." },
  ];

  if (!cards) cards = defaultCards;

  return (
    <Container>
      <ThreeColumnContainer>
        {subheading && <Subheading>{subheading}</Subheading>}
        <Heading>{heading}</Heading>
        {description && <Description>{description}</Description>}
        <VerticalSpacer />
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <span className="imageContainer">
                <img src={card.imageSrc || defaultCardImage} alt="" />
              </span>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                <p className="description">{card.description || "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."}</p>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
      <DecoratorBlob />
    </Container>
  );
};
