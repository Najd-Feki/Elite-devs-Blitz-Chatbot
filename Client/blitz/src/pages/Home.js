import React from "react";
import tw from "twin.macro";
import Fade from "react-reveal/Fade";
import Hero from "components/hero/TwoColumnWithInput";
import Features from "components/features/ThreeColWithSideImage.js";
import MainFeature from "components/features/TwoColWithButton.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndRating.js";
import FAQ from "components/faqs/SingleCol.js";
import GetStarted from "components/cta/GetStarted";
import Footer from "components/footers/SimpleFooter";
import conceptionImg from "images/concept.jpg";
import responsiveImg from "images/smartphone.jpg";
import securityImg from "images/security.jpg";
import cloudImg from "images/cloud.jpg";
import Typical from "react-typical";
import { ReactComponent as BriefcaseIcon } from "feather-icons/dist/icons/briefcase.svg";
import { ReactComponent as MoneyIcon } from "feather-icons/dist/icons/dollar-sign.svg";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
  const HighlightedText = tw.span`text-primary-500`;

  return (
    <>
      <Hero roundedHeaderButton={true} />
      <Fade left>
        <Features
          subheading={<Subheading>Features</Subheading>}
          heading={
            <>
              <HighlightedText>
                <Typical steps={["Blitz.", 1500]} loop={Infinity} wrapper="div" />
              </HighlightedText>{" "}
              provides an amazing Service.
            </>
          }
          description={
            <>
              <HighlightedText>BLITZ</HighlightedText> chatbot will be your gate for a better personal development, faster learning and greater time
              managment
            </>
          }
        />
      </Fade>

      <MainFeature
        subheading={<Subheading>Quality Work</Subheading>}
        imageSrc={conceptionImg}
        imageBorder={true}
        imageDecoratorBlob={true}
        imageRounded={true}
        description={
          <>
            We are a team of young developers who gathered for one purpose which is the creation of <HighlightedText> BLITZ </HighlightedText>, the
            learning assistant who can change your future.
          </>
        }
      />

      <MainFeature
        subheading={<Subheading>Responsiveness</Subheading>}
        heading={
          <>
            Take <HighlightedText>BLITZ</HighlightedText> wherever you go.
          </>
        }
        description="Thanks to his responsive design,our website can fit on whatever device you are using, So you will never have to stop learning."
        imageRounded={true}
        imageBorder={true}
        textOnLeft={false}
        imageSrc={responsiveImg}
        imageDecoratorBlob={true}
        //decoratorBlobCss={tw`xl:w-40 xl:h-40 opacity-15 -translate-x-1/2 left-1/2`}
      />

      <MainFeature
        subheading={<Subheading>Security</Subheading>}
        heading={
          <>
            We Always Abide by Our <HighlightedText>Principles.</HighlightedText>
          </>
        }
        imageSrc={securityImg}
        showDecoratorBlob={false}
        imageRounded={true}
        imageBorder={true}
        imageDecoratorBlob={true}
        description="Security is a major concern that we allways try to improve and focus on in our policy, thats why we allow our users to access their accounts with secure passwords.
        We can also assure you that we strictly only use your data for your own benefit such as resume creation or searching for courses."
      />
      <MainFeature
        subheading={<Subheading>Speed</Subheading>}
        heading={
          <>
            Get your answers at the<HighlightedText> speed of light </HighlightedText>
          </>
        }
        textOnLeft={false}
        imageSrc={cloudImg}
        showDecoratorBlob={false}
        imageRounded={true}
        imageBorder={true}
        imageDecoratorBlob={true}
        description="Maintaining high speed responses and high availability are our main concerns, and that's why Blitz is based on cloud services such as google and Mongo's Atlas."
      />
      <Testimonial
        subheading={<Subheading>Testimonials</Subheading>}
        description={
          <>
            <HighlightedText>Blitz</HighlightedText> has helped many users attain their objectives and succeed, and he is always ready to give more !"
          </>
        }
        textOnLeft={true}
        heading={
          <>
            Our users <HighlightedText>Love Us.</HighlightedText>
          </>
        }
        testimonials={[
          {
            stars: 5,
            profileImageSrc:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
            heading: "Amazing User Experience",
            quote:
              "Blitz helped me find the perfect job that matches my skills, and I'm still using it daily to learn more and develop my knowledge.",
            customerName: "Amal gharsallah",
            customerTitle: "Executive Assistant , BIAT ",
          },
          {
            stars: 5,
            profileImageSrc:
              "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
            heading: "Perfect discussion flow !",
            quote: "Love the discussion and the way that blitz answers and reacts to my texts, the developers did a pretty great job!",
            customerName: "Ahmed Jouini",
            customerTitle: "Mechanical Engineer, SNCFT",
          },
        ]}
      />
      <FAQ
        subheading={<Subheading>FAQS</Subheading>}
        description={
          <>
            And we have got answers to all of them. You can look for your answers here or you can just ask <HighlightedText>Blitz</HighlightedText>{" "}
          </>
        }
        heading={
          <>
            You have <HighlightedText>Questions ?</HighlightedText>
          </>
        }
        faqs={[
          {
            question: "Is Blitz always available ?",
            answer: "Yes, Blitz is 24/7 available to help you and answer your questions",
          },
          {
            question: "How much should I pay for Blitz ?",
            answer: "Actually blitz is totally free! but you can of course help the developers by buying us a cup of coffee",
          },
          {
            question: "Can Blitz help me find a decent job ?",
            answer: "Yes! the main purpose of blitz is helping you achieve your dream job by providing the necessary courses that you need.",
          },
          {
            question: "Do you really support all types of devices?",
            answer: "Yes we do, thanks to our responsive design, you can use blitz on any device that supports a web browser",
          },
        ]}
      />
      <GetStarted />
      <Footer />
    </>
  );
};
