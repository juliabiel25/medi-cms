import {
  ClinicNav,
  ContentNav
} from "./NavItems";
import React, { Component, Fragment } from "react";

import MetisMenu from "react-metismenu";
import { connect } from "react-redux";
import { setEnableMobileMenu } from "../../reducers/ThemeOptions";
import { withRouter } from "react-router-dom";

class Nav extends Component {
  state = {};

  toggleMobileSidebar = () => {
    let { enableMobileMenu, setEnableMobileMenu } = this.props;
    setEnableMobileMenu(!enableMobileMenu);
  };

  render() {
    return (
      <Fragment>
        <h5 className="app-sidebar__heading">Klinika</h5>
        <MetisMenu content={ClinicNav} onSelected={this.toggleMobileSidebar} activeLinkFromLocation
          className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>

        <h5 className="app-sidebar__heading">Treści</h5>
        <MetisMenu content={ContentNav} onSelected={this.toggleMobileSidebar} activeLinkFromLocation
          className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}
const mapStateToProps = (state) => ({
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
});

const mapDispatchToProps = (dispatch) => ({
  setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
