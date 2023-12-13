import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React, { Component, Fragment } from "react";
import Tabs, { TabPane } from "rc-tabs";

// import FormsDefault from "./Examples/FormBasic";
// import InputGroups from "./Examples/InputGroup/InputGroups";
import PageTitle from "../../../../Layout/AppMain/PageTitle";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import TabContent from "rc-tabs/lib/SwipeableTabContent";

// Examples

export default class CRMDashboard1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab2: "222",
      activeTab1: "11",
      popoverOpen1: false,
      popoverOpen2: false,
      popoverOpen3: false,
      popoverOpen4: false,
    };
  }

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
              <Tabs defaultActiveKey="1" renderTabBar={() => <ScrollableInkTabBar />} renderTabContent={() => <TabContent />}>
                <TabPane tab="Basic" key="1">
                  {/* <FormsDefault /> */}
                </TabPane>
                <TabPane tab="Input Groups" key="2">
                  {/* <InputGroups /> */}
                </TabPane>
              </Tabs>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
