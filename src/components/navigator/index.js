/** @jsxImportSource @emotion/react */
import { wrapComponent } from "../userContext/userContext.js";
import _ from "lodash/fp";
import { css } from "@emotion/react";
import * as NavStyle from "./navStyle.js";
import HamburgerMenu from "components/navigator/hamburgerMenu.js";

const Navigator = (props) => {

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        height: ${props.state.heightOfNavigator}px;
        width: ${props.state.windowWidth}px;
        max-width: ${props.state.windowWidth}px;
        background: rgb(25, 25, 25);
        background: linear-gradient(58deg, rgba(52, 84, 209, 1) 0px, #d1345b 126px, #acf39d 100%);
        align-items: flex-start;
        overflow-x: hidden;
      `}
    >
      <div
        css={css`
          width: ${props.state.windowWidth}px;
          max-width: ${props.state.windowWidth}px;
          background: ${props.state.lighterDarkColor};
          height: 43px;
          display: flex;
          flex-direction: row;
          align-items: center;
        `}
      >
        <NavStyle.FlexRow
          css={css`
            margin-left: 20px;
            cursor: pointer;
          `}
        >
          <HamburgerMenu/>
          <NavStyle.NavLink
            css={css`
              background: ${props.state.lighterDarkColor};
              margin-left: 0px;
            `}
          >
            SkettiOdin
          </NavStyle.NavLink>
        </NavStyle.FlexRow>

        <NavStyle.NavLink
          css={css`
            background: ${props.state.lighterDarkColor};
          `}
          onMouseDown={(evt) => {
            props.redirectToPage("/");
          }}
        >
          Home
        </NavStyle.NavLink>

        <NavStyle.NavLink
          css={css`
            background: ${props.state.lighterDarkColor};
          `}
          onMouseDown={(evt) => {
            props.redirectToPage("/leaderboard");
          }}
        >
          Leaderboard
        </NavStyle.NavLink>

        <NavStyle.NavLink
          css={css`
            background: ${props.state.lighterDarkColor};
          `}
          onMouseDown={(evt) => {
            props.nightModeColorSwitch(!props.state.isNightMode);
          }}
        >
          Night Mode
        </NavStyle.NavLink>

        {/*
        <NavStyle.NavLink
          css={css`
            background: ${props.state.lighterDarkColor};
          `}
          onMouseDown={(evt) => {
            props.redirectToPage("/wxadventures");
          }}
        >
          WX Adventures
        </NavStyle.NavLink>
        */}

        <NavStyle.NavLink
          css={css`
            background: ${props.state.lighterDarkColor};
          `}
          onMouseDown={(evt) => {
            props.redirectToPage("/ultimateScaling");
          }}
        >
          UltimateScaling
        </NavStyle.NavLink>

        <NavStyle.NavLink
          css={css`
            background: ${props.state.lighterDarkColor};
          `}
          onMouseDown={(evt) => {
            props.redirectToPage("/tcgSim");
          }}
        >
          TcgSim
        </NavStyle.NavLink>

        {/*
          <NavStyle.NavLink
            css={css`
              background: ${props.state.lighterDarkColor};
            `}
            onMouseDown={(evt) => {
              props.redirectToPage("/paps")
            }}
          >
            Paps
          </NavStyle.NavLink>
          */}

        {/*
          <NavStyle.NavLink
            css={css`
            `}
            onMouseDown={(evt) => {
              props.redirectToPage("/logo")
            }}
          >
            Logo
          </NavStyle.NavLink>

          <NavStyle.NavLink
            css={css`
            `}
            onMouseDown={(evt) => {
              props.redirectToPage("/logoWithoutBackground")
            }}
          >
            Logo Without Background
          </NavStyle.NavLink>
        */}
      </div>
    </div>
  );
};
export default wrapComponent(
  Navigator,
  _.pick([
    "redirectToPage",
    "state.windowWidth",
    "state.heightOfNavigator",
    "state.isNightMode",
    "nightModeColorSwitch",
    "state.darkestColor",
    "state.lighterDarkColor",
    "state.lightestColor"
  ])
);
