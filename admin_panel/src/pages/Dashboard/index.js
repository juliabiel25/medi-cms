import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React, { Fragment } from "react";

import AppFooter from "../../Layout/AppFooter/";
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import Articles from './elements/Articles';
import Doctors from './elements/Doctors';
import GeneralInfo from './elements/GeneralInfo';
import PageTitleAlt2 from "../../Layout/AppMain/PageTitleAlt2";
import { Route } from "react-router-dom";
import Sections from './elements/Sections';
import Services from './elements/Services';
import ThemeOptions from "../../Layout/ThemeOptions/";

const Dashboard = ({match}) => {
  return (
    <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner">
          <TransitionGroup>
            <CSSTransition component="div" classNames="TabsAnimation"
              appear={true} timeout={0} enter={false} exit={false}>  
              <div className="app-main__inner">
                {/* podstrony */}
                {match.url}
                <Route path={`${match.url}/elements/articles`} component={GeneralInfo}/>
                <Route path={`${match.url}/doctors`} component={Doctors}/>
                <Route path={`${match.url}/services`} component={Services}/>
                <Route path={`${match.url}/articles`} component={Articles} />
                <Route path={`${match.url}/sections`} component={Sections} />
             </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <AppFooter />
      </div>
    </div>
       
    </Fragment>
  );
}

export default Dashboard;