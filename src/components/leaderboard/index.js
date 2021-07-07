import { wrapComponent } from "../userContext/userContext.js";
import _ from "lodash/fp";
import React, { useLayoutEffect } from "react"
import { css } from "@emotion/react"
import Navigator from "../navigator/index.js";

const Leaderboard = (props) => {
  const valorantAPICall = `https://na.api.riotgames.com/val/content/v1/contents?locale=en-US&api_key=RGAPI-75049035-5e1e-47c5-b991-cbf25d656105`

  async function fetchAsync (url) {
    let response = await fetch(url, {mode:`cors`});
    let data = await response.json();
    return data;
  }

  useLayoutEffect(() => {
    console.log("THE API CALL", fetchAsync(valorantAPICall));
  }, [])

  return (
    <div
      css={css`
        background: #191919;
        height: ${props.state.windowHeight}px;
        width: ${props.state.windowWidth}px;
      `}
    >
      <Navigator />


    </div>
  )
}
export default wrapComponent(
  Leaderboard,
  _.pick([
    "redirectToPage",
    "state.windowHeight",
    "state.windowWidth"
  ])
);