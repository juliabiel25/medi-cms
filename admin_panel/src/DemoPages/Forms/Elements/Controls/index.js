import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React, { Fragment } from "react";
import Tabs, { TabPane } from "rc-tabs";

import FormsDefault from "./Examples/FormBasic";
import InputGroups from "./Examples/InputGroup/InputGroups";
import PageTitle from "../../../../Layout/AppMain/PageTitle";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import TabContent from "rc-tabs/lib/SwipeableTabContent";

// Examples


class FormElementsControls extends React.Component {
  render() {
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div" classNames="TabsAnimation" appear={true}
            timeout={1500} enter={false} exit={false}>
            <div>  
              <PageTitle heading="Form Controls"
                subheading="Wide selection of forms controls, using the Bootstrap 5 code base, but built with React."
                icon="pe-7s-display1 icon-gradient bg-premium-dark"/>
                  <FormsDefault />
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}

export default FormElementsControls;
