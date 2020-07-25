import React, {Component} from 'react';
import './Details.scss';
import DetailItem from './DetailItem/DetailItem';
import RatingItem from './RatingItem/RatingItem';
import ScrollToTopOnMount from '../../shared/ScrollToTopOnMount';
import CSSTransition from "react-transition-group/CSSTransition";
import TransitionGroup from "react-transition-group/TransitionGroup";

class Details extends Component {

    constructor(props) {
        super(props);
        const {code} = this.props.match.params;
        this.state = {
            code: code,
        };
    }

    render() {
        const code = this.state.code;
        return (
          <>
              <ScrollToTopOnMount/>
              <div className="product-detail">
                  <TransitionGroup component="ul" className="details-container">
                      <CSSTransition key={this.state.code} classNames="fade" timeout={300}>
                          <DetailItem code={code}/>
                      </CSSTransition>
                  </TransitionGroup>
                  <RatingItem code={code}/>
              </div>
          </>
        )
    }
};
export default Details;