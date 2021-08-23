import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
const UsePage = () => {
  const pageRef = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [heightOfNavigator, setHeightOfNavigator] = useState(45);
  const [darkestColor, setDarkestColor] = useState("#191919");
  const [lighterDarkColor, setLighterDarkColor] = useState("#313131");
  const [isNightMode, setIsNightMode] = useState(true);
  
  const [redirect, setRedirect] = useState({
    alreadyRedirected: true,
    pathname: "",
  });

  //Figures out the window's dimensions and sets the App's state with it
  const updateDimensions = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    let callback = (dimensions) => {
      if (dimensions) {
        const parts = dimensions.split(",");
        width = parseInt(parts[0]);
        height = parseInt(parts[1]);
      }

      ReactDOM.unstable_batchedUpdates(() => {
        setWindowWidth(width);
        setWindowHeight(height);
      });
    };
      callback(undefined);
  };

  //redirect global located at top of App.js
  useEffect(() => {
    if (redirect.alreadyRedirected === false && redirect.pathname !== "") {
      setRedirect({ alreadyRedirected: true, pathname: "" });
    }
  }, [redirect]);

  //update width and height state on resize
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [pageRef]);

  //componentdidmount
  useEffect(() => {
    updateDimensions();
  }, [pageRef, windowHeight, windowWidth]);

  const callbackFunctions = {
    redirectToPage: (whichPage) => {
      //console.log("redirecting", whichPage)
      setRedirect({ alreadyRedirected: false, pathname: whichPage });
    },
    nightModeColorSwitch: (nightModeToBe) => {
      if(nightModeToBe == true){
        setDarkestColor("#191919");
        setLighterDarkColor("#313131");
        setIsNightMode(true);
      }
      if(nightModeToBe == false){
        setDarkestColor("#DDD");
        setLighterDarkColor("#CCC");
        setIsNightMode(false);
      }
    }
  };
  return {
    state: {
      windowWidth,
      windowHeight,
      redirect,
      heightOfNavigator,
      darkestColor,
      lighterDarkColor,
      isNightMode
    },
    callbackFunctions,
  };
};
export default UsePage;