/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

//font: 24px Monaco;
//color: white;
//border-left: 3px solid white;
//border-right: 3px solid white;
//border-top: 1px solid white;
//border-bottom: 1px solid white;
export const NavLink = styled("div")`
  font: 24px Knewave;
  color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  text-shadow: 1px 1px black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
  padding-left: 15px;
  padding-right: 15px;
  height: 39px;
  border-radius: 0px;
  user-select: none;
  flex-wrap: nowrap;
  white-space: nowrap;
`;

export const FlexRow = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const FlexColumn = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HamburgerMenuLine = styled("div")`
  width: 20px;
  height: 2px;
  background: white;
`