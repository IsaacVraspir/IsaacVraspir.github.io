import createWrapComponent from "./createWrapComponent.js";
import {
  useEffect,
  useRef,
  default as React,
} from "react";

//list of contexts
import usePage from "./usePage.js";

const UserContext = React.createContext();

export const Consumer = UserContext.Consumer;
export const wrapComponent = createWrapComponent(Consumer);

/*
  Has Props: 
    currentPage
    changeAlertNotificationAppearance
*/

export const ContextProvider = props => {
  const hooksToImport = {
    usePage,
  };
  const contextHasRanAtLeastOnce = useRef(false);
  const reduceStartingPoint = useRef({ state: {}, constants: {} });
  const savedConstants = useRef({});
  const savedState = useRef({});

  const deepValue = (obj, path) => {
    for (var i = 0, path = path.split("."), len = path.length; i < len; i++) {
      obj = obj[path[i]];
    }
    return obj;
  };

  for (var member in savedState.current) delete savedState.current[member];

  //note that the big daddy hook needs to be instantiated first
  //if you don't need any dependencies just don't put anything in this list
  const hookDependencies = {
    usePage: [
      {
        type: "direct",
        pick: [props.widthOfCordovaSidebar, props.currentPage]
      }
    ],
  };

  //this makes sure that all the dependencies are injected properly
  const importedHooks = Object.keys(hooksToImport).reduce(
    (hookAccumulator, hookKey) => {
      //console.log("hookaccumulator",hookAccumulator);
      //if you have stuff you gotta pass in
      if (hookDependencies.hasOwnProperty(hookKey)) {
        //we gotta go through all of those things
        //and figure out what goes into the arguments
        const stuffToPassIn = hookDependencies[hookKey].reduce((
          argumentAccumulator,
          //remember, the thingToPassIn is still an Object here
          thingToPassIn
        ) => {
          //hook dependencies can be different
          switch (thingToPassIn.type) {
            case "hook":
              argumentAccumulator.push(
                ...thingToPassIn.pick.map(arg =>
                  deepValue(hookAccumulator, arg)
                )
              );
              break;
            case "direct":
            default:
              argumentAccumulator.push(...thingToPassIn.pick);
              break;
          }
          return argumentAccumulator;
        }, []);

        //HERE is where we actually call with the arguments
        hookAccumulator[hookKey] = hooksToImport[hookKey](...stuffToPassIn);
      } else {
        hookAccumulator[hookKey] = hooksToImport[hookKey]();
      }
      return hookAccumulator;
    },
    {}
  );
  //once the hooks are created properly
  //they need to pass in the stuff to context as the variable called value
  //value has everything you need, state, constants, and ...functions

  //console.log("but the context is still being rerendered");

  useEffect(() => {
    reduceStartingPoint.current = {};
  });

  const value = Object.keys(importedHooks).reduce(
    (aggregatedValues, hookKey) => {
      const importableValues = contextHasRanAtLeastOnce.current
        ? ["state"]
        : ["state", "constants"];
      importableValues.forEach(importableValue => {
        return importedHooks[hookKey].hasOwnProperty(importableValue)
          ? Object.keys(importedHooks[hookKey][importableValue]).forEach(
            stateOrConstantKey => {
              return (aggregatedValues[importableValue][stateOrConstantKey] =
                importedHooks[hookKey][importableValue][stateOrConstantKey]);
            }
          )
          : null;
      });
      //functions is the oddball
      //hence why it is here
      if (importedHooks[hookKey].hasOwnProperty("callbackFunctions")) {
        Object.keys(importedHooks[hookKey].callbackFunctions).forEach(
          callbackFunctionKey => {
            aggregatedValues[callbackFunctionKey] =
              importedHooks[hookKey].callbackFunctions[callbackFunctionKey];
          }
        );
      }
      return aggregatedValues;
    },
    { state: {}, constants: savedConstants.current }
  );

  if (contextHasRanAtLeastOnce.current) {
    value.constants = savedConstants.current;
  }
  //if this is the first time context is being ran,
  //we need to save these values for the future times context runs
  //so that it can copy the constants over
  else {
    //console.log("this is the first time context is running");
    savedConstants.current = value.constants;
  }

  contextHasRanAtLeastOnce.current = true;
  //savedState.current = {};

  value.state.currentPage = props.currentPage;
  return (
    <div>
      <UserContext.Provider value={value}>
        {props.children}
      </UserContext.Provider>
    </div>
  );
};
