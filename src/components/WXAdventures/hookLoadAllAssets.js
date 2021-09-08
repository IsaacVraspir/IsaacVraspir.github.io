import React, { useState, useCallback, useRef, useEffect } from "react"
import pixiStart from "./pixiStart";
import * as PIXI from "pixi.js";

//background
import grassBackgroundTile from "components/WXAdventures/Dungeon_Crawler/tiles/floor/floor_1.png";

export default (
  loader
) => {
  console.log("how many times")

  loader.add('grassBackgroundTile', grassBackgroundTile)

  return {
    variables: {
      
    },
    functions: {
    }
  }
}