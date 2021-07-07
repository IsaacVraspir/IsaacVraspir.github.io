/** @jsxImportSource @emotion/react */
import { wrapComponent } from "../userContext/userContext.js";
import _ from "lodash/fp";
import { css } from "@emotion/react"
import * as NavStyle from "./navStyle.js"

const Navigator = (props) => {
  return(
    <div
      css={css`
        display: flex;
        flex-direction: row;
        height: 45px;
        width: ${props.state.windowWidth}px;
        background: rgb(25,25,25);
        background: linear-gradient(58deg, rgba(52,84,209,1) 0px, #d1345b 126px, #acf39d 100%);
        align-items: center;
      `}
    >
      <div
        css={css`
          width: ${props.state.windowWidth}px;
          background: #191919;
          height: 39px;
          display: flex;
          flex-direction: row;
          align-items: center;
        `}
      >

      <NavStyle.NavLink
        css={css`
        `}
        onMouseDown={(evt) => {
          props.redirectToPage("/")
        }}
      >
        Home
      </NavStyle.NavLink>

      <NavStyle.NavLink
        css={css`
        `}
        onMouseDown={(evt) => {
          props.redirectToPage("/leaderboard")
        }}
      >
        Leaderboard
      </NavStyle.NavLink>
      </div>

    </div>
  )
}
export default wrapComponent(
  Navigator,
  _.pick([
    "redirectToPage",
    "state.windowWidth"
  ])
);