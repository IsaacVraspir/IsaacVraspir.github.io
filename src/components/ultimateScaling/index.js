/** @jsxImportSource @emotion/react */
import { wrapComponent } from "../userContext/userContext.js";
import _ from "lodash/fp";
import { css } from "@emotion/react";
import Navigator from "../navigator/index.js";
import { useEffect, useState } from "react";

const UltimateScaling = (props) => {
  const [fullscreenChromeWidth, setFullscreenChromeWidth] = useState(1920);
  const [fullscreenChromeHeight, setFullscreenChromeHeight] = useState(props.state.windowWidth < 1920 ? 955 : 969);
  const heightOfNavigator = props.state.heightOfNavigator;

  const [contentWasDesignedForWidth, setContentWasDesignedForWidth] = useState(fullscreenChromeWidth);

  /*- props.state.heightOfNavigator*/
  const [contentWasDesignedForHeight, setContentWasDesignedForHeight] = useState(fullscreenChromeHeight);

  //const [isAlreadyResizing, setIsAlreadyResizing] = useState(false);
  const [ultimateScale, setUltimateScale] = useState(1);
  const [getWidthBack, setGetWidthBack] = useState(1920);
  const [getHeightBack, setGetHeightBack] = useState(props.state.windowWidth < 1920 ? 955 : 969);

  useEffect(() => {
    setFullscreenChromeHeight(props.state.windowWidth < 1920 ? 955 : 969);
  }, [props.state.windowWidth]);

  /*
    How Transform Works
    1. Your element gets rendered
    2. Your element gets transformed (scale, rotate, skew, etc.)
  */

  useEffect(() => {
    console.log(
      `
        windowWidth, 
        windowHeight,
        width / contentWasDesignedForWidth,
        height / contentWasDesignedForHeight,
        contentWasDesignedForWidth,
        contentWasDesignedForHeight,
        getWidthBack,
        getHeightBack
      `,
      [
        props.state.windowWidth,
        props.state.windowHeight,
        props.state.windowWidth / contentWasDesignedForWidth,
        props.state.windowHeight / contentWasDesignedForHeight,
        contentWasDesignedForWidth,
        contentWasDesignedForHeight,
        getWidthBack,
        getHeightBack,
      ]
    );
    if (props.state.windowWidth / contentWasDesignedForWidth < props.state.windowHeight / contentWasDesignedForHeight) {
      //width ratio was less than height ratio
      setGetHeightBack(props.state.windowHeight / (props.state.windowWidth / contentWasDesignedForWidth));
      setGetWidthBack(contentWasDesignedForWidth);
    } else if (
      props.state.windowHeight / contentWasDesignedForHeight <
      props.state.windowWidth / contentWasDesignedForWidth
    ) {
      //height ratio was less
      setGetWidthBack(props.state.windowWidth / (props.state.windowHeight / contentWasDesignedForHeight));
      setGetHeightBack(contentWasDesignedForHeight);
    } else {
      //in the case of going back to 1920x969
      setGetWidthBack(contentWasDesignedForWidth);
      setGetHeightBack(contentWasDesignedForHeight);
    }

    setUltimateScale(
      Math.min(
        props.state.windowWidth / contentWasDesignedForWidth,
        props.state.windowHeight / contentWasDesignedForHeight
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
      {/*<Navigator />*/}

      <div
        //ultimate "content" div
        css={css`
          width: ${contentWasDesignedForWidth}px;
          height: ${contentWasDesignedForHeight}px;
          transform: scale(${ultimateScale});
          transform-origin: top left;
          background: purple;
          height: ${getHeightBack}px;
          width: ${getWidthBack}px;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          css={css`
            width: ${getWidthBack - 200}px;
            height: ${getHeightBack - 100}px;
            border-radius: 30px;
            border: 1px solid black;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          `}
        >
          <div
            css={css`
              width: ${getWidthBack - 400}px;
              height: ${getHeightBack - 200}px;
              border-radius: 30px;
              border: 1px solid black;
            `}
          >
            <div
              css={css`
                width: 200px;
                height: 200px;
                background: black;
                border-radius: 50%;
              `}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default wrapComponent(
  UltimateScaling,
  _.pick(["redirectToPage", "state.windowWidth", "state.windowHeight", "state.darkestColor", "state.heightOfNavigator"])
);
