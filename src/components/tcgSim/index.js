/** @jsxImportSource @emotion/react */
import { wrapComponent } from "../userContext/userContext.js";
import _ from "lodash/fp";
import { css } from "@emotion/react";
import Navigator from "../navigator/index.js";
import { useEffect, useState } from "react";

const TcgSim = (props) => {
  const [fullscreenChromeWidth, setFullscreenChromeWidth] = useState(1920);
  const [fullscreenChromeHeight, setFullscreenChromeHeight] = useState(props.state.windowWidth < 1920 ? 955 : 969);
  const [contentWasDesignedForWidth, setContentWasDesignedForWidth] = useState(fullscreenChromeWidth);
  const [contentWasDesignedForHeight, setContentWasDesignedForHeight] = useState(fullscreenChromeHeight);

  const [ultimateScale, setUltimateScale] = useState(1);
  const [getWidthBack, setGetWidthBack] = useState(1920);
  const [getHeightBack, setGetHeightBack] = useState(props.state.windowWidth < 1920 ? 955 : 969);

  useEffect(() => {
    setFullscreenChromeHeight(props.state.windowWidth < 1920 ? 955 : 969);
  }, [props.state.windowWidth]);

  useEffect(() => {
    let heightWithNavSubtracted = props.state.windowHeight ;
    if (props.state.windowWidth / contentWasDesignedForWidth < heightWithNavSubtracted / contentWasDesignedForHeight) {
      //width ratio was less than height ratio
      setGetHeightBack(heightWithNavSubtracted / (props.state.windowWidth / contentWasDesignedForWidth));
      setGetWidthBack(contentWasDesignedForWidth);
    } else if (
      heightWithNavSubtracted / contentWasDesignedForHeight <
      props.state.windowWidth / contentWasDesignedForWidth
    ) {
      //height ratio was less
      setGetWidthBack(props.state.windowWidth / (heightWithNavSubtracted / contentWasDesignedForHeight));
      setGetHeightBack(contentWasDesignedForHeight);
    } else {
      //in the case of going back to 1920x969
      setGetWidthBack(contentWasDesignedForWidth);
      setGetHeightBack(contentWasDesignedForHeight);
    }

    setUltimateScale(
      Math.min(
        props.state.windowWidth / contentWasDesignedForWidth,
        heightWithNavSubtracted / contentWasDesignedForHeight
      )
    );
  }, [props.state.windowWidth, props.state.windowHeight]);

  return (
    <div
      css={css`
        height: ${props.state.windowHeight}px;
        width: ${props.state.windowWidth}px;
      `}
    >
      <div
        //ultimate "content" div
        css={css`
          transform: scale(${ultimateScale});
          transform-origin: top left;
          background: purple;
          height: ${getHeightBack}px;
          width: ${getWidthBack}px;
        `}
      >
        
      </div>
    </div>
  );
};
export default wrapComponent(
  TcgSim,
  _.pick(["redirectToPage", "state.windowWidth", "state.windowHeight", "state.darkestColor", "state.heightOfNavigator"])
);