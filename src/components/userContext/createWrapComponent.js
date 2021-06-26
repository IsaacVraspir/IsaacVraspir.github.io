import { default as React } from "react";
import _ from "lodash/fp";

const createWrapComponent = ConsumerArgument => {
  class SmartUpdater extends React.Component {
    constructor(props) {
      super(props);
      let extractedOutFunctions = {};
      for (let key in this.props) {
        if (typeof this.props[key] === "function" && key !== "theComponent") {
          extractedOutFunctions[key] = this.props[key];
        }
      }
      let extractedOutConstantsAndFunctions = { ...extractedOutFunctions };
      if (typeof this.props.constants !== "undefined") {
        extractedOutConstantsAndFunctions.constants = this.props.constants;
      }
      this.passedInConstantsAndFunctions = extractedOutConstantsAndFunctions;
    }

    shouldComponentUpdate(nextProps, nextState) {
      //console.log("normal props is",nextProps);
      const thingsThatMayChange = ["normalProps", "state"];
      for (let i = 0; i < thingsThatMayChange.length; i++) {
        for (let key in nextProps[thingsThatMayChange[i]]) {
          if (
            !_.isEqual(
              this.props[thingsThatMayChange[i]][key],
              nextProps[thingsThatMayChange[i]][key]
            ) &&
            key !== "match" &&
            key !== "location" &&
            key !== "history" &&
            key !== "staticContext"
          ) {
            //console.log("this was different:",key,this.props.theComponent);
            return true;
          }
        }
      }
      return false;
    }
    render() {
      const TheComponent = this.props.theComponent;
      return (
        <TheComponent
          state={this.props.state}
          {...this.passedInConstantsAndFunctions}
          {...this.props.normalProps}
        />
      );
    }
  }
  return (TheComponent, mapContextToProps = id => id) => {
    return props => (
      <ConsumerArgument
        children={context => (
          <SmartUpdater
            normalProps={props}
            {...mapContextToProps(context)}
            theComponent={TheComponent}
          />
        )}
      />
    );
  };
};

export default createWrapComponent;