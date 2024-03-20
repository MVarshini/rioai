import "./styles/chat.css";

/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

import Skeleton from "@mui/material/Skeleton";
import { uid } from "./helper";

export default function Messages(props) {
  const el = useRef(null);
  // useEffect(() => {
  //   el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  // });
  return (
    <div className="messages">
      {props.messages.map((m) => {
        // return (
        //   {
        //     m.msg === "skeleton" ?
        //     <div key={uid()} className={`chat-bubble ${m.position}`}>
        //     <Skeleton animation="wave" />
        //     </div>
        //     :
        //     <div key={uid()} className={`chat-bubble ${m.position}`}>
        //     {m.msg}
        //   </div>
        //   }

        // );
        {
          return m.msg === "skeleton" ? (
            <div key={uid()} className={`chat-bubble ${m.position}`}>
              <Skeleton animation="wave" />
            </div>
          ) : (
            <div key={uid()} className={`chat-bubble ${m.position}`}>
              {m.msg}
            </div>
          );
        }
      })}
      <div id={"el"} ref={el} />
    </div>
  );
}
