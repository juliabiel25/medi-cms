import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Fragment } from "react";
import PageTitle from "../../../../Layout/AppMain/PageTitle";

const Articles = ({}) => {
  return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition component="div" classNames="TabsAnimation" appear={true}
          timeout={1500} enter={false} exit={false}>
          <div>  
            <PageTitle heading="Artykuły"
              icon="pe-7s-news-paper icon-gradient bg-premium-dark"/>
                {/* <FormsDefault /> */}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  )
}

export default Articles;