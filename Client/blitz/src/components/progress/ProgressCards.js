/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import tw, { css } from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as PenIcon } from "feather-icons/dist/icons/pen-tool.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import Skeleton from "react-loading-skeleton";
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import { Line } from "rc-progress";

import Fade from "react-reveal/Fade";
import axios from "axios";
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track {
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl static focus:outline-none`;
const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`,
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex truncate  h-12 flex-col sm:flex-row sm:justify-between sm:items-center`;

const Title = tw.h5`text-xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`truncate text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`truncate flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;
const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;

const ProgressCards = ({ auth }) => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [sliderRef, setSliderRef] = useState(null);

  const [courses, setCourses] = useState([]);
  const sliderSettings = {
    arrows: false,
    slidesToShow: courses.length === 1 ? 1 : courses.length === 2 ? 2 : 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const endpoint = "http://localhost:5000/";
  const getCourses = async () => {
    try {
      const courses = await axios
        .get(endpoint + "course/temp", {
          params: {
            id: auth.user._id,
            temp: 2,
          },
        })
        .then((result) => {
          result.data.forEach((course) => {
            //getCourseById(course.id);
            course.completion_ratio = progress;
          });
          setCourses(result.data);
        });
    } catch (err) {
      console.error(err);
    }
  };
  // const getCourseById = async (id) => {
  //   const params = "?fields[course]=@all&?fields[user]=@all";
  //   try {
  //     const courseProgress = await axios.get(`${endpoint}courses/756150/${params}`, {
  //       auth: {
  //         username: process.env.REACT_APP_UDEMY_CLIENT_ID,
  //         password: process.env.REACT_APP_UDEMY_CLIENT_SECRET,
  //       },
  //     });

  //     setProgress(courseProgress.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const handleTitle = (title) => {
    setTitle(title);
  };
  const handleBody = (body) => {
    setBody(body);
  };
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    getCourses();
  }, [setCourses, auth]);

  const setCourseAndDate = async (id) => {
    await axios.post(endpoint + "course/date", { userId: auth.user._id, courseId: id });
  };

  let time = 1000;
  let prog;
  return courses.length ? (
    <Container>
      <Content>
        <HeadingWithControl>
          <Fade left>
            <Heading>Your Courses</Heading>
          </Fade>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}>
              <ChevronLeftIcon />
            </PrevButton>
            <NextButton onClick={sliderRef?.slickNext}>
              <ChevronRightIcon />
            </NextButton>
          </Controls>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {courses.length === 1 ? (
            <Fade left duration={time}>
              <Card>
                <UncontrolledPopover trigger="hover" placement="bottom" target="Popover1">
                  <PopoverBody>{title}</PopoverBody>
                  <PopoverHeader>{body}</PopoverHeader>
                </UncontrolledPopover>
                <CardImage imageSrc={courses[0].image_480x270} />
                <TextInfo>
                  <TitleReviewContainer>
                    <button id="Popover1">
                      <Title onMouseEnter={() => handleTitle(courses[0].title)}>{courses[0].title}</Title>
                    </button>
                    <RatingsInfo>
                      <StarIcon />
                      {courses[0].rating ? <Rating>{courses[0].rating}</Rating> : <div></div>}
                    </RatingsInfo>
                  </TitleReviewContainer>
                  <SecondaryInfoContainer>
                    <IconWithText>
                      <IconContainer>
                        <PenIcon />
                      </IconContainer>
                      <Text>{courses[0].visible_instructors[0].display_name}</Text>
                    </IconWithText>
                    <IconWithText>
                      <IconContainer>
                        <PriceIcon />
                      </IconContainer>
                      <Text>{courses[0].price}</Text>
                    </IconWithText>
                  </SecondaryInfoContainer>
                  <Description onMouseEnter={() => handleBody(courses[0].headline)}>{courses[0].headline}</Description>
                  <div hidden>{(prog = Math.floor(Math.random() * 100) + 1)}</div>
                  <Line percent={0}></Line>
                  <Title style={{ textAlign: "center" }}>{0 + "%"}</Title>
                </TextInfo>

                <PrimaryButton
                  href={`https://www.udemy.com${courses[0].url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setCourseAndDate(courses[0]._id);
                  }}
                >
                  Start Now
                </PrimaryButton>
              </Card>
            </Fade>
          ) : (
            courses.map((course, id) => (
              <Fade left duration={time}>
                <Card key={id}>
                  <UncontrolledPopover trigger="hover" placement="bottom" target="Popover1">
                    <PopoverBody>{title}</PopoverBody>
                    <PopoverHeader>{body}</PopoverHeader>
                  </UncontrolledPopover>
                  <CardImage imageSrc={course.image_480x270} />
                  <TextInfo>
                    <TitleReviewContainer>
                      <button id="Popover1">
                        <Title onMouseEnter={() => handleTitle(course.title)}>{course.title}</Title>
                      </button>
                      <RatingsInfo>
                        <StarIcon />
                        {course.rating ? <Rating>{course.rating}</Rating> : <div></div>}
                      </RatingsInfo>
                    </TitleReviewContainer>
                    <SecondaryInfoContainer>
                      <IconWithText>
                        <IconContainer>
                          <PenIcon />
                        </IconContainer>
                        <Text>{course.visible_instructors[0].display_name}</Text>
                      </IconWithText>
                      <IconWithText>
                        <IconContainer>
                          <PriceIcon />
                        </IconContainer>
                        <Text>{course.price}</Text>
                      </IconWithText>
                    </SecondaryInfoContainer>
                    <Description onMouseEnter={() => handleBody(course.headline)}>{course.headline}</Description>
                    <div hidden>{(prog = Math.floor(Math.random() * 100) + 1)}</div>
                    <Line percent={0}></Line>
                    <Title style={{ textAlign: "center" }}>{0 + "%"}</Title>
                  </TextInfo>

                  <PrimaryButton
                    href={`https://www.udemy.com${course.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setCourseAndDate(course._id);
                    }}
                  >
                    Start Now
                  </PrimaryButton>
                </Card>
              </Fade>
            ))
          )}
        </CardSlider>
      </Content>
    </Container>
  ) : (
    <>
      <Content>
        <Fade left>
          <Heading style={{ textAlign: "left" }}>Your Courses</Heading>
          <CardSlider ref={setSliderRef} {...sliderSettings}>
            <div>
              <Skeleton style={{ borderRadius: "5rem" }} width={"23rem"} height={"35rem"}></Skeleton>
            </div>
            <div>
              <Skeleton style={{ borderRadius: "5rem" }} width={"23rem"} height={"35rem"}></Skeleton>
            </div>
            <div>
              <Skeleton style={{ borderRadius: "5rem" }} width={"23rem"} height={"35rem"}></Skeleton>
            </div>
          </CardSlider>
        </Fade>
      </Content>
    </>
  );
};
export default ProgressCards;
