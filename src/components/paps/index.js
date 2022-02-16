/** @jsxImportSource @emotion/react */
import { wrapComponent } from "../userContext/userContext.js";
import _ from "lodash/fp";
import { css } from "@emotion/react"

const Paps = (props) => {
  return(
    <div
      css={css`
        height: ${props.state.windowHeight}px;
        width: ${props.state.windowWidth}px;
        background: red;
      `}
    >
    <div
      css={css`
        //background: ${props.state.darkestColor};
        //height: ${props.state.windowHeight}px;
        //width: ${props.state.windowWidth}px;

        width: ${1584}px;
        height: ${396}px;
        background: rgb(110,110,110);
        background: linear-gradient(114deg, rgba(110,110,110,1) 0%, rgba(255,255,255,1) 88%, rgba(110,110,110,1) 89%, rgba(255,255,255,1) 91%, rgba(255,255,255,1) 92%, rgba(110,110,110,1) 100%);      `}
    >
      
    </div>
    </div>
  )
}
export default wrapComponent(
  Paps,
  _.pick([
    "redirectToPage",
    "state.windowWidth",
    "state.windowHeight",
    "state.darkestColor",
  ])
);