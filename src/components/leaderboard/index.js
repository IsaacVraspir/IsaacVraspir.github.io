/** @jsxImportSource @emotion/react */
import { wrapComponent } from "../userContext/userContext.js";
import _ from "lodash/fp";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react"
import { css } from "@emotion/react"
import Navigator from "../navigator/index.js";
import $ from "jQuery";

import oldValorantContentJson from "components/jsonsCauseCorsAndKeys/valContent.json";
import oldValorantRankedJson from "components/jsonsCauseCorsAndKeys/valRankedAct2Episode3.json";

const Leaderboard = (props) => {
  const valorantContentAPICall = `https://cors-anywhere.herokuapp.com/https://na.api.riotgames.com/val/content/v1/contents?locale=en-US&api_key=GAPI-68ccf153-4183-40ae-9153-573b304f15ff`
  const valorantRankedAPICall = `https://cors-anywhere.herokuapp.com/https://na.api.riotgames.com/val/ranked/v1/leaderboards/by-act/2a27e5d2-4d30-c9e2-b15a-93b8909a442c?size=200&startIndex=0&api_key=GAPI-68ccf153-4183-40ae-9153-573b304f15ff`
  const currentValorantActId = useRef(); //"2a27e5d2-4d30-c9e2-b15a-93b8909a442c"
  const objectOfActIdsRef = useRef();

  const [finalTableJsx, setFinalTableJsx] = useState();

  const arrayOfTableValueObjects = useRef();
  //1. get the json from riot or use backup if error
  useLayoutEffect(() => {
    $.ajax({
      method: 'GET',
      crossDomain: true,
      url: valorantContentAPICall,
      dataType: 'json', //change the datatype to 'jsonp' works in most cases
      success: (res) => {
        let objectOfActIds = {};
        let indexOfEpisodes = 0;
        console.log("fresh ajax success", res);
        for (let i = 0; i < res.acts.length; i++) {
          let item = res.acts[i];
          if (item.type == "episode") { indexOfEpisodes++ }
          if (item.type == "act") {
            objectOfActIds[
              "episode" +
              indexOfEpisodes +
              "Act" +
              (item.name[item.name.length - 1])
            ] = item.id
          };
          if (item.isActive === true && item.type === "act") {
            currentValorantActId.current = item.id;
            getRankedData(item.id);
          }
          if (i == res.acts.length - 1) {
            objectOfActIdsRef.current = _.cloneDeep(objectOfActIds)
            console.log("finished making the object", objectOfActIdsRef.current)
          }
        }
      },
      error: () => {
        let objectOfActIds = {};
        let indexOfEpisodes = 0;
        console.log("error in ajax requesting valorant content")
        for (let i = 0; i < oldValorantContentJson.acts.length; i++) {
          let item = oldValorantContentJson.acts[i];
          if (item.type == "episode") { indexOfEpisodes++ }
          if (item.type == "act") {
            objectOfActIds[
              "episode" +
              indexOfEpisodes +
              "Act" +
              (item.name[item.name.length - 1])
            ] = item.id
          };
          if (item.isActive === true && item.type === "act") {
            currentValorantActId.current = item.id;
            getRankedData(item.id);
          }

          if (i == oldValorantContentJson.acts.length - 1) {
            objectOfActIdsRef.current = _.cloneDeep(objectOfActIds)
            console.log("finished making the object", objectOfActIdsRef.current)
          }
        }
      }
    })
  }, [])

  const getRankedData = (actId) => {
    const rankedUrlCall = `https://cors-anywhere.herokuapp.com/https://na.api.riotgames.com/val/ranked/v1/leaderboards/by-act/${actId}?size=200&startIndex=0&api_key=GAPI-68ccf153-4183-40ae-9153-573b304f15ff`
    $.ajax({
      method: 'GET',
      crossDomain: true,
      url: rankedUrlCall,
      dataType: 'json', //change the datatype to 'jsonp' works in most cases
      success: (res) => {
        console.log("fresh ajax ranked success", res);
        extractThingsFromAnArrayOfObjectsToMakeATable(res.players)
        arrayOfTableValueObjects.current = res.players;
      },
      error: () => {
        console.log("error in ajax requesting valorant ranked content", oldValorantRankedJson)
        extractThingsFromAnArrayOfObjectsToMakeATable(oldValorantRankedJson.players)
        arrayOfTableValueObjects.current = oldValorantRankedJson.players;
      }
    })
  }

  const extractThingsFromAnArrayOfObjectsToMakeATable = (jsonToBeTabled) => {
    //In the case of Valorant Ranked API - it is the keys inside the objects that we want to table by
    /*
      [
        {
          ranked: 1,
          name: Hiko
        }, 
        {
          ranked: 2,
          typeOfCar: Steel
        } 
      ]
    */
    let jsxArray = [];
    const makeGridRowOutOfAnArray = (arrayToMakeGridRowOf, rowIndex) => {
      //pass in column position, 
      for(let i = 0; i < arrayToMakeGridRowOf.length; i++){
        jsxArray.push(
          <div
            css={css`
              grid-column: ${i} / ${i};
              grid-row: ${rowIndex} / ${rowIndex};
              font: 16px montserrat;
              padding: 5px;
              text-align: center;
              background: #dddddd;
              border-width: 1px;
              color: black;
              border-radius: 5px;
              ${i == arrayToMakeGridRowOf.length ? `margin-right: 15px;` : ``}
            `}
          >
            {arrayToMakeGridRowOf[i]}
          </div>
        )
      }
    }

    console.log("json before we start making tables", jsonToBeTabled);

    for (let i = 0; i < jsonToBeTabled.length; i++) {
      //i+2 is pushing things below the top one pushed at last index
      //this should be fixed to be able to be filtered by any of the object values
      makeGridRowOutOfAnArray(Object.values(jsonToBeTabled[i]), i+2);

      if (i == jsonToBeTabled.length - 1) {
        //setState to make the UI show the table
        makeGridRowOutOfAnArray(Object.keys(jsonToBeTabled[i]), 1);
        setFinalTableJsx(jsxArray)
      }
    }
  }

  return (
    <div
      css={css`
        background: ${props.state.darkestColor};
        height: ${props.state.windowHeight}px;
        width: ${props.state.windowWidth}px;
      `}
    >
      <Navigator />

      <div
        /*
          ::-webkit-scrollbar the scrollbar.
          ::-webkit-scrollbar-button the buttons on the scrollbar (arrows pointing upwards and downwards).
          ::-webkit-scrollbar-thumb the draggable scrolling handle.
          ::-webkit-scrollbar-track the track (progress bar) of the scrollbar.
          ::-webkit-scrollbar-track-piece the track (progress bar) NOT covered by the handle.
          ::-webkit-scrollbar-corner the bottom corner of the scrollbar, where both horizontal and vertical scrollbars meet.
          ::-webkit-resizer the draggable resizing handle that appears at the bottom corner of some elements.
        */
        css={css`
          display: grid;
          grid-gap: 5px;
          padding: 15px;
          background: linear-gradient(58deg, rgba(52,84,209,1) 0px, #d1345b 126px, #acf39d 100%);
          background: ${props.state.lighterDarkColor};
          overflow: scroll;
          margin-right: 50px;
          margin-left: 50px;
          margin-top: 40px;
          max-height: ${props.state.windowHeight - props.state.heightOfNavigator - 100}px;

          //display: flex;
          //flex-direction: column;
          //align-items: center;
          //height: ${props.state.windowHeight - ((34) + 50 + 10)}px; //34 is title height, 50 is margin bottom, 10 is for scroll bar margin (margin-top: 5px in this div)
          //width: ${props.state.windowWidth - (60 + 15)}px;
          //overflow-x: hidden;
          //overflow-y: scroll;
          //margin-top: 5px;
          

          ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }
          
          /* Track */
          ::-webkit-scrollbar-track {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
          }
          
          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: #d1345b; 
            border-radius: 10px;
          }
          
          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: #d1345b; 
          }
        `}
      >
        {finalTableJsx}
      </div>

    </div>
  )
}

export default wrapComponent(
  Leaderboard,
  _.pick([
    "redirectToPage",
    "state.windowHeight",
    "state.windowWidth",
    "state.heightOfNavigator",
    "state.darkestColor",
    "state.lighterDarkColor"
  ])
);