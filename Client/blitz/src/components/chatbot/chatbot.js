/* eslint-disable import/no-anonymous-default-export */

import { isWindow } from "jquery";
import React, { useEffect, useState } from "react";
import { unmountComponentAtNode, render } from "react-dom";
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
export default () => {
  var pagelist = {
    "http://localhost:3000/profile": "This is your profile, you can find all your info and your resume here.",
    "http://localhost:3000/progress": "This is your progress page, here you can keep track of your achievements.",
  };
  const [text, setText] = useState([]);
  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "f3444ef308eca1dcf11bd3dd9c11a4ab",
        popupWidget: false,
        automaticChatOpenOnNavigation: true,
        openConversationOnNewMessage: false,
        voiceInput: true,
        onInit: function () {
          //Kommunicate.displayKommunicateWidget(true);

          //window.Kommunicate.launchConversation();

          var defaultSettings = {
            WELCOME_MESSAGE: pagelist[window.location.pathname],
            //page URL array
          };

          if (pagelist[window.location.pathname]) {
            window.kommunicate.updateSettings(defaultSettings);
          }
        },
      };

      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
    console.log("bruh");
    window.addEventListener("load", async function () {
      setTimeout(async () => {
        console.log("c bon t3ada");
        var iframe = await document.getElementById("kommunicate-widget-iframe"),
          iframeDoc = !!iframe["contentDocument"] ? iframe.contentDocument : iframe.contentWindow.document,
          cell = await iframeDoc.getElementsByClassName("mck-running-on notranslate vis");
        console.log("cell 0", cell[0]);
        await cell[0]?.remove();
        ///////////////////////////
        let message = iframeDoc.getElementById("mck-text-box");
        message.addEventListener("input", (event) => {
          setText(text.push(event.target.textContent));
          console.log(text);
        });
        /* let button = iframeDoc.getElementById("mck-msg-sbmt");
        button.addEventListener("click", async () => {
          axios.post("http://localhost:5000/api/text_query", { text: text[text.length - 1] });
          setText([]);
        });
        message.addEventListener("keyup", async (field) => {
          if (field.keyCode === 13) {
            console.log(text[text.length - 1]);
            axios.post("http://localhost:5000/api/text_query", { text: text[text.length - 1] });
            setText([]);
          }
        });*/
        // //console.log(message);
        // if (window.addEventListener) {
        //   // Normal browsers
        //   message.addEventListener("DOMSubtreeModified", contentChanged, false);
        // } else if (window.attachEvent) {
        //   // IE
        //   message.attachEvent("DOMSubtreeModified", contentChanged);
        // }

        // async function contentChanged(e) {
        //   // await axios.post("http://localhost:5000/api/text_query", { text: e });
        //   console.log(e.target);
        //}
      }, 2500);

      //while (cell.hasChildNodes()) {
      //  console.log(cell);
      //}

      //cell[0].parentNode.removeChild(cell[0]);
    });
  }, []);

  return <div></div>;
};
