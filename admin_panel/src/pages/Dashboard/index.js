import React, { Fragment } from "react";

import AppFooter from "../../Layout/AppFooter/";
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import DoctorForm from "./elements/Doctors/DoctorForm";
import DoctorProfile from "./elements/DoctorProfile";
import Doctors from "./elements/Doctors";
import GeneralInfo from "./elements/GeneralInfo";
import NewDoctorForm from "./elements/Doctors/NewDoctorForm";
import NewNewsForm from "./elements/News/NewNewsForm";
import NewServiceForm from "./elements/Services/NewServiceForm";
import News from "./elements/News";
import NewsForm from "./elements/News/NewsForm";
import { Route } from "react-router-dom";
import Sections from "./elements/Sections";
import ServiceForm from "./elements/Services/ServiceForm";
import Services from "./elements/Services";
import ThemeOptions from "../../Layout/ThemeOptions/";

const Dashboard = ({ match }) => {
  return (
    <Fragment>
      {/* <ThemeOptions /> */}
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <Route
              exact
              path={`${match.url}/general`}
              component={GeneralInfo}
            />
            <Route exact path={`${match.url}/doctors`} component={Doctors} />
            <Route
              exact
              path={`${match.url}/doctors/new`}
              component={NewDoctorForm}
            />
            <Route
              exact
              path={`${match.url}/doctors/edit`}
              component={DoctorForm}
            />
            <Route exact path={`${match.url}/services`} component={Services} />
            <Route
              exact
              path={`${match.url}/services/edit`}
              component={ServiceForm}
            />
            <Route
              exact
              path={`${match.url}/services/new`}
              component={NewServiceForm}
            />
            <Route exact path={`${match.url}/news/edit`} component={NewsForm} />
            <Route
              exact
              path={`${match.url}/news/new`}
              component={NewNewsForm}
            />
            <Route exact path={`${match.url}/news`} component={News} />
            <Route exact path={`${match.url}/sections`} component={Sections} />
          </div>
          {/* <AppFooter /> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
