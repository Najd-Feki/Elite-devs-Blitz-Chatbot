/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings";
import { SectionDescription } from "components/misc/Typography";
import { ReactComponent as TwitterIcon } from "images/twitter-icon.svg";
import { ReactComponent as LinkedinIcon } from "images/linkedin-icon.svg";
import { ReactComponent as GithubIcon } from "images/github-icon.svg";

const HeadingContainer = tw.div``;
const Heading = tw(SectionHeading)``;
const Subheading = tw(SubheadingBase)`text-center mb-3`;
const Description = tw(SectionDescription)`mx-auto text-center`;

const Cards = tw.div`flex flex-wrap flex-row justify-center sm:max-w-2xl lg:max-w-5xl mx-auto`;
const Card = tw.div`mt-24 w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center`;
const CardImage = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`w-64 h-64 bg-contain bg-center rounded`}
`;
const CardContent = styled.div`
  ${tw`flex flex-col items-center mt-6`}
  .position {
    ${tw`uppercase font-bold tracking-widest text-xs text-primary-500`}
  }
  .name {
    ${tw`mt-1 text-xl font-medium text-gray-900`}
  9
`;

const CardLinks = styled.div`
  ${tw`mt-6 flex`}
  .link {
    ${tw`mr-8 last:mr-0 text-gray-400 hocus:text-primary-500 transition duration-300`}
    .icon {
      ${tw`fill-current w-6 h-6`}
    }
  }
`;

export default ({
  heading = "Meet These Fine Folks.",
  subheading = "Our Team",
  description = "",
  cards = [
    {
      imageSrc:
        "https://scontent.ftun9-1.fna.fbcdn.net/v/t1.6435-9/127511943_3404903246244438_4275642630581499280_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ANcGyHma4fAAX-Cxlmr&_nc_ht=scontent.ftun9-1.fna&oh=047a74bfab0a149f196cdbf987d96b68&oe=60A42951",
      position: "SR. DESIGNER",
      name: "Yessine Ben Jemaa",
      links: [
        {
          url: "https://twitter.com",
          icon: TwitterIcon,
        },
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc:
        "https://scontent.ftun9-1.fna.fbcdn.net/v/t1.6435-9/158587918_4431142546902097_7456340571619257763_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=d6pY8thIqTsAX-YtztM&_nc_ht=scontent.ftun9-1.fna&oh=d7cfe3a63e595de1d7a5f49e2a8b858a&oe=60A65923",
      position: "LEAD DEVELOPER",
      name: "Najd Feki",
      links: [
        {
          url: "https://twitter.com",
          icon: TwitterIcon,
        },
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc:
        "https://scontent.ftun9-1.fna.fbcdn.net/v/t1.6435-9/84797564_3269333533082666_7878052069154750464_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=174925&_nc_ohc=zSrswqo1U3AAX_bN9dd&_nc_ht=scontent.ftun9-1.fna&oh=6f8b1a3775933729118c3fe41f27b7ef&oe=60A532C8",
      position: "Jr. Designer",
      name: "Omar Fehri",
      links: [
        {
          url: "https://twitter.com",
          icon: TwitterIcon,
        },
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc:
        "https://scontent.ftun9-1.fna.fbcdn.net/v/t1.18169-9/14502791_1180312932043309_1013721772409168669_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=174925&_nc_ohc=VCk4YPb18osAX8WMscu&_nc_ht=scontent.ftun9-1.fna&oh=c7238684f44fe7e36ba7547c1bc516ae&oe=60A5A666",
      position: "SR. Developer",
      name: "Mahdi Hrairi",
      links: [
        {
          url: "https://twitter.com",
          icon: TwitterIcon,
        },
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc:
        "https://scontent.ftun9-1.fna.fbcdn.net/v/t1.6435-9/65258626_2057820554341462_5324066461126230016_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=39B3wXL_eL8AX8Wghyf&_nc_ht=scontent.ftun9-1.fna&oh=b905d205cbc31700b65e6e79af343106&oe=60A71017",
      position: "Lead Developer",
      name: "Malik Haddar",
      links: [
        {
          url: "https://twitter.com",
          icon: TwitterIcon,
        },
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com",
          icon: GithubIcon,
        },
      ],
    },
  ],
}) => {
  return (
    <Container>
      <ContentWithPaddingXl>
        <HeadingContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          {heading && <Heading>{heading}</Heading>}
          {description && <Description>{description}</Description>}
        </HeadingContainer>
        <Cards>
          {cards.map((card, index) => (
            <Card key={index}>
              <CardImage imageSrc={card.imageSrc} />
              <CardContent>
                <span className="position">{card.position}</span>
                <span className="name">{card.name}</span>
                <CardLinks>
                  {card.links.map((link, linkIndex) => (
                    <a key={linkIndex} className="link" href={link.url}>
                      <link.icon className="icon" />
                    </a>
                  ))}
                </CardLinks>
              </CardContent>
            </Card>
          ))}
        </Cards>
      </ContentWithPaddingXl>
    </Container>
  );
};
