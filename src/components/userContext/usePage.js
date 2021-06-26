import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
const UsePage = () => {
  const pageRef = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  
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

  useEffect(() => {
    if (redirect.alreadyRedirected === false && redirect.pathname !== "") {
      setRedirect({ alreadyRedirected: true, pathname: "" });
    }
  }, [redirect]);

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
    }
  };
  return {
    state: {
      windowWidth,
      windowHeight,
      redirect
    },
    callbackFunctions,
  };
};
export default UsePage;