import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Fragment } from "react";
import PageTitle from "../../../../Layout/AppMain/PageTitle";

const Sections = ({}) => {
    return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition component="div" classNames="TabsAnimation" appear={true}
          timeout={1500} enter={false} exit={false}>
          <div>  
            <PageTitle heading="Sekcje"
              icon="pe-7s-menu icon-gradient bg-premium-dark"/>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  )
}

export default Sections;