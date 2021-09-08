/** @jsxImportSource @emotion/react */
import { wrapComponent } from "../userContext/userContext.js";
import _ from "lodash/fp";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react"
import { css } from "@emotion/react"
import Navigator from "../navigator/index.js";
import $ from "jQuery";
import WixossTCG from "components/WXAdventures/WixossTCG.xml";
import * as PIXI from "pixi.js";
import hookNonMovingBackgroundMap from "./hookNonMovingBackgroundMap.js";
import hookLoadAllAssets from "./hookLoadAllAssets";

//export default React.memo(props => { 
const PixiStart = (props) => {
  console.log("why am i rerendering", props)

  const gameStage = useRef(new PIXI.Container())
  const gameContainer = useRef(null)
  const loader = PIXI.Loader.shared;

  const gameRenderer = useRef(
    new PIXI.Renderer({
      width: props.width,
      height: props.height,
      backgroundAlpha: true,
      antialias: true,
      sharedLoader: true
    })
  )

  //draws the fretboardRenderer view to the canvas
  const updateMamaContainer = element => {
    if (element !== null && gameContainer.current == null) {
      // the element is the DOM object that we will use as container to add pixi stage(canvas)
      gameContainer.current = element
      //now we are adding the application to the DOM element which we got from the Ref.
      if (
        gameContainer.current &&
        gameContainer.current.children.length <= 0
      ) {
        //console.log("DID Freboard pixi container GET APPENDED??");
        gameContainer.current.appendChild(gameRenderer.current.view)
      }
    }
  }

  //Containers
  const nonMovingBackgroundGround = useRef(new PIXI.Container());

  const allHooks = {
    hookLoadAllAssets,
    hookNonMovingBackgroundMap,
  };

  allHooks.hookLoadAllAssets = hookLoadAllAssets(
    loader
  )

  allHooks.hookNonMovingBackgroundMap = hookNonMovingBackgroundMap(
    nonMovingBackgroundGround,
    loader
  )

  return (
    <div
      css={css`
        position: relative;
        pointer-events: none;
      `}
      ref={element => {
        updateMamaContainer(element)
      }}
    ></div>
  )}

  export default wrapComponent(
    PixiStart,
    _.pick([
      ""
    ])
  );
