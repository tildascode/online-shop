import React, {Component} from 'react';
import axios from "axios";
import Button from "../../../components/UI/Button/Button";
import strings from "../../../shared/LocalizedStrings";
import './RatingItem.scss';

class RatingItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ratings: [],
            comment: '',
            stars: null,
            productCode: props.code,
            hideRatings: false
        }
    }

    componentDidMount() {
        this.getRatings();
    };

    getRatings = () => {
        axios.get(
          process.env.REACT_APP_API_URL + 'r/' + this.props.code,
          {withCredentials: true}
        ).then((response) => {
            if (response.data) {
                this.setState({ratings: response.data.ratings, hideRatings: response.data.hideRatings});
            } else {
                //redirect
            }
        });
    };

    inputChangedHandler = (e) => {
        const value = e.target.value;
        this.setState({comment: value});
    };

    submit = e => {
        e.preventDefault();
        const comment = this.state.comment;
        const stars = this.state.stars;
        const productCode = this.state.productCode;
        axios.post(process.env.REACT_APP_API_URL + 'r/' + productCode, {comment, stars}, {withCredentials: true})
          .then((response) => {
              if (response.data) {
                  //TODO don't make a second call
                  this.getRatings();
              } else {
                  //TODO handle errors
              }
          });
    };

    rateProduct = (value) => {
        this.setState({stars: value});

    };

    render() {
        const ratings = this.state.ratings;
        return (
          <div className="ratings">
              {this.state.hideRatings ? (<div></div>) : (<form className="rating-stars-form"
                                                               onSubmit={e => this.submit(e)}>
                  <div className="rating-stars">
                      <input type="radio" id="star5" name="rate" value="5" onClick={() => this.rateProduct(5)}/>
                      <label htmlFor="star5"></label>
                      <input type="radio" id="star4" name="rate" value="4" onClick={() => this.rateProduct(4)}/>
                      <label htmlFor="star4"></label>
                      <input type="radio" id="star3" name="rate" value="3" onClick={() => this.rateProduct(3)}/>
                      <label htmlFor="star3"></label>
                      <input type="radio" id="star2" name="rate" value="2" onClick={() => this.rateProduct(2)}/>
                      <label htmlFor="star2"></label>
                      <input type="radio" id="star1" name="rate" value="1" onClick={() => this.rateProduct(1)}/>
                      <label htmlFor="star1" title="text"></label>
                  </div>
                  <textarea className="ratings-text-area" onChange={e => this.inputChangedHandler(e)}
                            value={this.state.value}/>
                  <Button btnType={'btn-primary'}
                          disabled={this.state.stars ? false : true}>{strings.rating_form_submit}</Button>
              </form>)}
              <div className="comment_block">
                  {ratings.map(rating => (
                    <ul key={rating.userId} className="user_comment">
                        <div className="user_avatar">
                            <img src="https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/73.jpg" alt="Avatar"/>
                        </div>
                        <div className="comment_body">
                            <p>{rating.comment}</p>
                        </div>
                        <div className="rating-stars rated">
                            <label></label>
                            <label></label>
                            <label></label>
                            <label></label>
                            <label></label>
                        </div>
                        <div className="comment_toolbar">
                            <div className="comment_details">
                                <ul>
                                    <li> {rating.createdAt}</li>
                                    <li><span className="user">{rating.userId}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </ul>
                  ))}
              </div>
          </div>
        );
    }
}

export default RatingItem;