import * as PIXI from "pixi.js";

export default (
  loader,
  nonMovingBackgroundGround,
  updateRenderer
) => {
  console.log("loader", loader)

  let grassBackgroundTileSprite = PIXI.Sprite.from(loader.resources["grassBackgroundTile"].texture)
  grassBackgroundTileSprite.x = 0;
  grassBackgroundTileSprite.y = 0;
  nonMovingBackgroundGround.current.addChild(grassBackgroundTileSprite);

  updateRenderer()

  return {
    variables: {
      
    },
    functions: {
    }
  }
}