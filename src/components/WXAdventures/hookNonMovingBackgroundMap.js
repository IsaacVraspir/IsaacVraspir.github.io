import React, { useState, useCallback, useRef, useEffect } from "react"
import { props } from "lodash/fp";
import pixiStart from "./pixiStart";
import * as PIXI from "pixi.js";

export default (
  nonMovingBackgroundGround,
  loader
) => {

  let grassBackgroundTileSprite = new PIXI.Sprite(loader.resources.grassBackgroundTile)
  nonMovingBackgroundGround.current.addChild(grassBackgroundTileSprite);

  return {
    variables: {
      
    },
    functions: {
    }
  }
}