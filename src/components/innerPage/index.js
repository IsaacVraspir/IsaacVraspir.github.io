
import { Link } from "react-router-dom";
import { wrapComponent } from "../userContext/userContext.js";
import _ from "lodash/fp";
import React from "react"

const InnerPage = (props) => {
  return(
    <div>
      <Link to="/">Home</Link>
      <Link to="/pageTwo">pageTwo</Link>
      yo
      <div
        onMouseDown={(evt) => {
          props.redirectToPage("/pageTwo")
        }}
      >
        heyclick

      </div>
    </div>
  )
}
export default wrapComponent(
  InnerPage,
  _.pick([
    "redirectToPage",
  ])
);