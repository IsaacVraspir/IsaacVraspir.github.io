import { wrapComponent } from "../userContext/userContext.js";
import _ from "lodash/fp";
import React from "react"

const InnerPageTwo = (props) => {
  return(
    <div
      onMouseDown={(evt) => {
        props.redirectToPage("/")
      }}
    >
      WHAT"S GOOD
    </div>
  )
}
export default wrapComponent(
  InnerPageTwo,
  _.pick([
    "redirectToPage",
  ])
);