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
    *THERE IT IS DUDE**********
    Example:
    1893 x 955
    scale(.9859375)
    height: 937.1790808240887
    width: 1920

    1893 / 1920 < 955 / 969 = .9859375 < 0.98555 so it wasn't actually 955

    1385 / 1920 = 0.72135416666

    HEIGHT
    958 x 390
    setWidthBack = 1920 / (390 / 955) = 4480
    1920 = 958 + 962
    0.408 * ? = 962
    2355.66666667 * .408 = 962
    962 / (390 / 955) = 2355.66666667
    (1920 - 958) / (390 / 955)

    props.state.windowHeight / contentWasDesignedForHeight
    390 / 910 = .428 
    .428 * ? = 


    why
    .408
    after
    height: 955
    width: 2061.82
    before
    width: 1078px;
    height: 390px;

    ultimateScale = 390 / 955 = .408
    1920 * .408 = 784.083769634
    1920 + 784.083769634 = 2704.08376963 -> a little too wide when plugged in
    2640 is what you want forced in

    2640 - 1920 = 720
    390 / 955 = .408
    720 * .408 = 294.031413613
    2640 / 1920 = 1.375
    1920 / 2640 = 0.72727272727
    above div is height: 390px width: 1078px;
    1920 - 1078 = 842
    1078 / 1920 = 0.56145833333
    1920 / 1078 = 1.78107606679

    2640 * (390 / 955) = 1078.1151 IS THAT COINCIDENCE???? it must be a decimal
    1078 / (390 / 955) = 2639.71794872
    *THERE IT IS DUDE**********

    Very small height where width wins ratio battle is still bad

    1510 x 792
    width scale was less so
    setGetHeightBack = 955 / (1510 / 1920) = 1214.30463576
    setGetWidthBack = 1920
    0.7864583333333334

    1007 height

    792 / 0.786458333333 = 1007
    THERE IT IS DUDE AGAIN!!
    Let's make that the new width ratio getHeightBack

    Fullscreen reset is still a problem
    so in the useeffect lets just make sure to reset it
  */

  /*
  const [borderOutsideDivArray, setBorderOutsideDivArray] = useState([
    contentWasDesignedForWidth - 200,
    contentWasDesignedForHeight - 100,
  ]);
  */

  /*
  const calculateScaledHeightAndWidth = (widthPassedIn, heightPassedIn, windowWidthPassedIn, windowHeightPassedIn) => {
    console.log(
      "arrayReturned inside",
      widthPassedIn,
      heightPassedIn,
      windowWidthPassedIn,
      windowHeightPassedIn,
      windowWidthPassedIn / contentWasDesignedForWidth,
      windowHeightPassedIn / contentWasDesignedForHeight
    );
    if (windowWidthPassedIn / contentWasDesignedForWidth < windowHeightPassedIn / contentWasDesignedForHeight) {
      //width ratio was less than height ratio
      //setGetHeightBack(contentWasDesignedForHeight / (props.state.windowWidth / contentWasDesignedForWidth));
      console.log("arrayReturned width", [
        widthPassedIn / (windowWidthPassedIn / contentWasDesignedForWidth),
        contentWasDesignedForWidth,
      ]);
      return [widthPassedIn / (windowWidthPassedIn / contentWasDesignedForWidth), contentWasDesignedForWidth];
    }
    if (windowHeightPassedIn / contentWasDesignedForHeight < windowWidthPassedIn / contentWasDesignedForWidth) {
      //height ratio was less
      //setGetWidthBack((contentWasDesignedForWidth - props.state.windowWidth) / (props.state.windowHeight / contentWasDesignedForHeight))
      //setGetWidthBack(contentWasDesignedForWidth / (props.state.windowHeight / contentWasDesignedForHeight));
      console.log("arrayReturned height", [
        heightPassedIn / (windowHeightPassedIn / contentWasDesignedForHeight),
        contentWasDesignedForHeight,
      ]);
      return [heightPassedIn / (windowHeightPassedIn / contentWasDesignedForHeight), contentWasDesignedForHeight];
    }
  };
  */

  /*
  useEffect(() => {
    //console.log("arrayReturned", contentWasDesignedForWidth, contentWasDesignedForHeight, props.state.windowWidth, props.state.windowHeight);
    console.log("arrayReturned", contentWasDesignedForWidth, contentWasDesignedForHeight, getHeightBack, getWidthBack);
    let arrayReturned = calculateScaledHeightAndWidth(contentWasDesignedForWidth - 200, contentWasDesignedForHeight - 100, getHeightBack, getWidthBack);
    console.log("arrayReturned", arrayReturned);
    
    setBorderOutsideDivArray(
      arrayReturned[0], 
      arrayReturned[1]
    )
  }, [props.state.windowWidth, props.state.windowHeight, getHeightBack, getWidthBack])

  console.log("test", borderOutsideDivArray)
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
      //setGetHeightBack(contentWasDesignedForHeight / (props.state.windowWidth / contentWasDesignedForWidth));
      setGetHeightBack(props.state.windowHeight / (props.state.windowWidth / contentWasDesignedForWidth));
      setGetWidthBack(contentWasDesignedForWidth);
    } else if (
      props.state.windowHeight / contentWasDesignedForHeight <
      props.state.windowWidth / contentWasDesignedForWidth
    ) {
      //height ratio was less
      //setGetWidthBack((contentWasDesignedForWidth - props.state.windowWidth) / (props.state.windowHeight / contentWasDesignedForHeight))
      //setGetWidthBack(contentWasDesignedForWidth / (props.state.windowHeight / contentWasDesignedForHeight));
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
    /*
    console.log(
      "whats the scale",
      Math.min(
        props.state.windowWidth / contentWasDesignedForWidth,
        props.state.windowHeight / contentWasDesignedForHeight
      )
    );
    */
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
