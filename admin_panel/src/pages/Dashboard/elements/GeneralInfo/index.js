import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Fragment } from "react";
import PageTitle from "../../../../Layout/AppMain/PageTitle";

const GeneralInfo = ({}) => {
    return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition component="div" classNames="TabsAnimation" appear={true}
          timeout={1500} enter={false} exit={false}>
          <div>  
            <PageTitle heading="Informacje ogólne"
              icon="pe-7s-info icon-gradient bg-premium-dark"/>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  )
}

export default GeneralInfo;