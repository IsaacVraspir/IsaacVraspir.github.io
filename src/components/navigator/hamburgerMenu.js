/** @jsxImportSource @emotion/react */
import { wrapComponent } from "../userContext/userContext.js";
import _ from "lodash/fp";
import { css, keyframes } from "@emotion/react";
import * as NavStyle from "./navStyle.js";
import { useState } from "react";
import usePrevious from "lib/usePrevious.js";

const HamburgerMenu = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const previousToggleMenu = usePrevious(toggleMenu);

  const AnimateShowHideMenu = (start, end) => keyframes`
    from{
      transform: translateX(${start}px);
    }
    to{
      transform: translateX(${end}px);
    }
  `;

  return (
    <NavStyle.FlexColumn
      onMouseDown={() => {
        setToggleMenu(!toggleMenu);
      }}
    >
      <div
        css={css`
          position: absolute;
          height: 300px;
          width: 200px;
          background: ${props.state.lighterDarkColor};
          z-index: 1;

          transform: translateX(-200px);
          ${toggleMenu == false && previousToggleMenu == true
            ? css`animation: ${AnimateShowHideMenu(0, -200)} 0.5s ease forwards;`
            : ``}

          ${toggleMenu == true && previousToggleMenu == false
            ? css`animation: ${AnimateShowHideMenu(-200, 0)} 0.5s ease forwards;`
            : ``}
        `}
        
      ></div>

      <NavStyle.HamburgerMenuLine
        css={css`
          background: ${props.state.lightestColor};
          margin-bottom: 4px;
        `}
      />
      <NavStyle.HamburgerMenuLine
        css={css`
          background: ${props.state.lightestColor};
          margin-bottom: 4px;
        `}
      />
      <NavStyle.HamburgerMenuLine
        css={css`
          background: ${props.state.lightestColor};
        `}
      />
    </NavStyle.FlexColumn>
  );
};

export default wrapComponent(
  HamburgerMenu,
  _.pick([
    "redirectToPage",
    "state.windowWidth",
    "state.heightOfNavigator",
    "state.isNightMode",
    "nightModeColorSwitch",
    "state.darkestColor",
    "state.lighterDarkColor",
    "state.lightestColor",
  ])
);
