
/** @jsxImportSource @emotion/react */
import { wrapComponent } from "../userContext/userContext.js";
import _ from "lodash/fp";
import { css } from "@emotion/react"
import Navigator from "../navigator/index.js";

const LogoWithoutBackground = (props) => {
  return (
    <div
      css={css`
        background: #191919;
        height: ${1080}px;
        width: ${1920}px;
      `}
    >
      <div
        css={css`
          background: cyan;
          height: ${1080}px;
          width: ${1920}px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          css={css`
            font: 200px Knewave;
            color: white;
            -webkit-text-stroke-width: 13px;
            -webkit-text-stroke-color: black;
            text-shadow: 13px 13px black;
        `}
        >
          SkettiOdin
        </div>
      </div>


    </div>
  )
}
export default wrapComponent(
  LogoWithoutBackground,
  _.pick([
    "redirectToPage",
  ])
);