/** @jsxImportSource @emotion/react */
import _ from "lodash/fp";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react"
import { css } from "@emotion/react"
//import WixossTCG from "components/WXAdventures/WixossTCG.xml";
import * as PIXI from "pixi.js";
//import hookNonMovingBackgroundMap from "./hookNonMovingBackgroundMap.js";
import hookLoadAllAssets from "./hookLoadAllAssets";

export default React.memo(props => { 
  console.log("why am i rerendering", props)

  const gameStage = useRef(new PIXI.Container())
  const gameContainer = useRef(null)
  const loader = PIXI.Loader.shared;

  const gameRenderer = useRef(
    new PIXI.Renderer({
      width: props.width,
      height: props.height,
      antialias: true,
      sharedLoader: true
    })
  )

  //draws the gameRenderer view to the canvas
  const updateMamaContainer = element => {
    if (element !== null && gameContainer.current == null) {
      // the element is the DOM object that we will use as container to add pixi stage(canvas)
      gameContainer.current = element
      //now we are adding the application to the DOM element which we got from the Ref.
      if (
        gameContainer.current &&
        gameContainer.current.children.length <= 0
      ) {
        gameContainer.current.appendChild(gameRenderer.current.view)
      }
    }
  }

  //Containers
  const nonMovingBackgroundGround = useRef(new PIXI.Container());

  //add containers to stage - order matters
  gameStage.current.addChild(nonMovingBackgroundGround.current)

  const allHooks = {
    hookLoadAllAssets,
  };

  useEffect(() => {
    allHooks.hookLoadAllAssets = hookLoadAllAssets(
      loader,
      nonMovingBackgroundGround,
      updateRenderer
    )

    updateRenderer();
  }, [])

  //destroy when leaving
  useEffect(() => {
    return () => {
      gameRenderer.current.reset();
      gameRenderer.current.destroy();
      loader.reset();
    }
  }, []);

  const updateRenderer = (deltaTime) => {
    requestAnimationFrame(updateRenderer)

    gameRenderer.current.render(gameStage.current)
  }

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
  )}, (prevProps, nextProps) => {
  return false;
})

