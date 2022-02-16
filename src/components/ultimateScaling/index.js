/** @jsxImportSource @emotion/react */
import { wrapComponent } from "../userContext/userContext.js";
import _ from "lodash/fp";
import { css } from "@emotion/react"
import Navigator from "../navigator/index.js";
import { useEffect, useState} from "react";

const UltimateScaling = (props) => {
  const [fullscreenChromeWidth, setFullscreenChromeWidth] = useState(1920);
  const [fullscreenChromeHeight, setFullscreenChromeHeight] = useState(props.state.windowWidth < 1920 ? 955 : 969);
  const heightOfNavigator = props.state.heightOfNavigator;

  const contentWasDesignedForWidth = fullscreenChromeWidth;
  const contentWasDesignedForHeight = fullscreenChromeHeight - props.state.heightOfNavigator;
  //const [isAlreadyResizing, setIsAlreadyResizing] = useState(false);
  const [ultimateScale, setUltimateScale] = useState(1);
  const [getWidthBack, setGetWidthBack] = useState(0);
  const [getHeightBack, setGetHeightBack] = useState(0);

  useEffect(() => {
    setFullscreenChromeHeight(props.state.windowWidth < 1920 ? 955 : 969)
  }, [props.state.windowWidth])

  /*
    How Transform Works
    1. Your element gets rendered
    2. Your element gets transformed (scale, rotate, skew, etc.)

    So element is drawn at 1920x955-45 = 1920x910

    1200x955

    1200 / 1920 = 0.625
    910 * 0.625 = 568.75
    910 - 568.75 = 341.25
    (341.25 / 2) = 170.625
    910 + 170.625 = 1080.625
    even 910 + 341.25 = 1251.25 didn't work - needs more

    1200 / 1920 = 0.625
    .375 * 910 = 341.25

    910 * 0.625 = 568.75
    910 + 568.75 = 1478.75
    off by just a little bit
    
    1456 is perfect

    1456 / 910 = 1.6
    1456 - 910 = 546
    22.75 off on the other method

    1456 returns it to the original 910 height after a scale of .625
    1456 * .625 = 910
    ? * .625 = 910
    910 / .625 = 1456
    THERE IT IS DUDE

    1893 x 955
    scale(.9859375)
    height: 937.1790808240887
    width: 1920

    1893 / 1920 < 955 / 969 = .9859375 < 0.98555 so it wasn't actually 955

    1385 / 1920 = 0.72135416666
  */

  useEffect(() => {
    console.log("windowWidth, windowHeight", props.state.windowWidth, props.state.windowHeight);
    if(props.state.windowWidth / contentWasDesignedForWidth < props.state.windowHeight / contentWasDesignedForHeight){
      //width ratio was less than height ratio
      setGetHeightBack(contentWasDesignedForHeight / (props.state.windowWidth / contentWasDesignedForWidth));
      setGetWidthBack(contentWasDesignedForWidth);
    }
    if(props.state.windowHeight / contentWasDesignedForHeight < props.state.windowWidth / contentWasDesignedForWidth){
      //height ratio was less
      setGetWidthBack(contentWasDesignedForWidth / (props.state.windowHeight / contentWasDesignedForHeight));
      setGetHeightBack(contentWasDesignedForHeight);
    }

    setUltimateScale(
      Math.min(
        props.state.windowWidth / contentWasDesignedForWidth,
        props.state.windowHeight / contentWasDesignedForHeight
      )
    );
    console.log("whats the scale", Math.min(
      props.state.windowWidth / contentWasDesignedForWidth,
      props.state.windowHeight / contentWasDesignedForHeight
    ))
  }, [props.state.windowWidth, props.state.windowHeight]);

  return(
    <div
      css={css`
        height: ${props.state.windowHeight}px;
        width: ${props.state.windowWidth}px;
      `}
    >
      <Navigator />

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
            width: ${props.state.windowWidth - 200}px;  
            height: ${props.state.windowHeight - 100}px;
            border-radius: 30px;
            border: 1px solid black;
          `}
        >
        </div>
      </div>
    </div>
  )
}
export default wrapComponent(
  UltimateScaling,
  _.pick([
    "redirectToPage",
    "state.windowWidth",
    "state.windowHeight",
    "state.darkestColor",
    "state.heightOfNavigator",
  ])
);