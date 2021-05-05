/* eslint-disable import/no-anonymous-default-export */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import MetaTags from "react-meta-tags";
//import axios from "axios";
// import "./chatbot.css";
// export default () => {
//   useEffect(() => {
//     const script = document.createElement("script");

//     script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);
//   document.addEventListener("DOMContentLoaded", function () {
//     const dfMessenger = document.querySelector("df-messenger");
//     dfMessenger.addEventListener("df-user-input-entered", async function (event) {
//       event.stopPropagation();
//       event.stopImmediatePropagation();
//       console.log(event.target);
//       console.log(event.detail.input);
//       axios.post("http://localhost:5000/api/text_query", { text: event.detail.input });
//       //  event.stopPropagation();
//     });
//   });

//   // function send(e) {
//   //   setText(e.target.value);
//   //   console.log(e.target);
//   //   // await axios.post("http://localhost:5000/api/text_query", { text: text });
//   // }
//   return (
//     <>
//       <MetaTags>
//         <meta name="viewport" content="width-device-width, initial-scale=1"></meta>
//       </MetaTags>
//       <df-messenger
//         className={"df-messenger"}
//         chat-icon="https://i.ibb.co/p3t9gVK/Circle-cropped.png"
//         intent="WELCOME"
//         chat-title="Blitz"
//         agent-id="ed514c67-b338-4f11-8f26-db51093c5589"
//         language-code="en"
//       ></df-messenger>
//     </>
//   );
// };

const Chatbot = ({ auth }) => {
  const [text, setText] = useState([]);

  useEffect(() => {
    start();
  }, [auth]);

  return <div></div>;
  function start() {
    if (auth.user != null) {
      //  let userId = auth?.user?._id;

      console.log(auth);
      localStorage.setItem('idUser', auth.user._id);

      (function (d, m) {
        var kommunicateSettings = {
          // userId: auth.user._id,
          // email: auth.user.email,
          // password: auth.token,
          // authenticationTypeId: 0,
          defaultMessageMetaData: { _id: auth.user._id },

          appId: "f3444ef308eca1dcf11bd3dd9c11a4ab",
          popupWidget: false,
          automaticChatOpenOnNavigation: true,
          openConversationOnNewMessage: false,
          voiceInput: true,
        };
        //  console.log(userId);
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0];
        h.appendChild(s);
        window.kommunicate = m;
        m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});
      window.addEventListener("load", async function () {
        var iframe = await document.getElementById("kommunicate-widget-iframe"),
          iframeDoc = !!iframe["contentDocument"] ? iframe.contentDocument : iframe.contentWindow.document;

        let message = iframeDoc.getElementById("mck-text-box");
        message?.addEventListener("input", (event) => {
          console.log("AAAAAAAAAAAAAAAAAA");
          setText(text.push(event.target.textContent));
          console.log(text);
        });
      });
    }
  }
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Chatbot);
