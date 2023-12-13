import React, { Fragment } from "react";

import AppFooter from "../../Layout/AppFooter/";
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import Articles from './elements/Articles';
import DoctorProfile from './elements/DoctorProfile';
import Doctors from './elements/Doctors';
import GeneralInfo from './elements/GeneralInfo';
import { Route } from "react-router-dom";
import Sections from './elements/Sections';
import Services from './elements/Services';
import ThemeOptions from "../../Layout/ThemeOptions/";

const Dashboard = ({match}) => {
  return (
    <Fragment>
      {/* <ThemeOptions /> */}
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <Route exact path={`${match.url}/general`} component={GeneralInfo}/>
            <Route exact path={`${match.url}/doctors`} component={Doctors}/>
            <Route exact path={`${match.url}/doctors/:id`} component={DoctorProfile}/>
            <Route exact path={`${match.url}/services`} component={Services}/>
            <Route exact path={`${match.url}/articles`} component={Articles} />            
            <Route exact path={`${match.url}/sections`} component={Sections} />            
          </div>
          {/* <AppFooter /> */}
        </div>
      </div>       
    </Fragment>
  );
}

export default Dashboard;