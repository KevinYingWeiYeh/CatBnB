import React from 'react';
import SendRequest from './SendRequestView.jsx';
import SitterInfoViewReview from './SitterInfoViewReview.jsx'
import {get} from '../ajaxHelper.js';

class SittersInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.getReviews = this.getReviews.bind(this);
  }

  componentWillMount() {
    this.getReviews();
  }

  componentWillUpdate() {
    get('/reviews/' + this.props.data.id)
    .then(reviews => this.state.reviews = reviews);
  }

  getReviews() {
    if (this.props.data) {
      get('/reviews/' + this.props.data.id)
      .then(reviews => this.setState({reviews: reviews}));
    }
  }

  handleClick() {
    this.props.toggleView();
  }

  render() {
    return (
      <div>
        <div className="sitter-info">
          <div className="container">
            <div className="row">
              <div onClick={this.handleClick} className="col-lg-12">
                <h3 className="sitter-info-title">Sitter Infomation</h3>
                <div className="row">
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-4">
                        Name:
                      </div> 
                      <div className="col-lg-8">
                        <h5 className='sitter-info-detail'>
                          {this.props.data.name}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    Rate: $
                    {this.props.data.price}/Day
                  </div>
                </div>
                <div className='row'>
                  <div className="col-lg-8">
                    <div className='row'>
                      <div className="col-lg-4">
                        ZIP Code: 
                      </div>
                      <div className="col-lg-8">
                        <h5 className='sitter-info-detail'>
                          {this.props.data.zipcode}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 inline">
                    <div>
                       <img className="sitter-info-svg" src='checked.svg' height="18" width="18"></img>
                        Boarding
                    </div>
                    <div>
                       <img className="sitter-info-svg" src='checked.svg' height="18" width="18"></img>
                        Coming in
                    </div>
                  </div>
                </div>
                <div>description: 
                  <div className='sitter-view-detail'>
                    {this.props.data.description}
                  </div>
                </div>
                <hr></hr>
                <div className="sitter-info-picture">
                  <div className='row'>
                    <div className="col-lg-4">
                      <img className="media-object" height="120" width="160" src={this.props.data.photo} />
                    </div>
                    <div className="col-lg-4">
                      <img className="media-object" height="120" width="160" src="https://assets3.thrillist.com/v1/image/2642224/size/tmg-article_tall.jpg" alt="" />
                    </div>
                    <div className="col-lg-4">
                      <img className="media-object" height="120" width="160" src="https://assets3.thrillist.com/v1/image/2642231/size/tmg-article_tall.jpg" alt="" />
                    </div>
                  </div>
                </div>
                <hr></hr>
                <div className="sitter-info-reviewbox">
                  <div>
                    {this.state.reviews.map((data, index) => <SitterInfoViewReview key={index} data={data} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        <hr></hr>
        </div>
        <div className="row">
          <div className="col-lg-8">
          </div>
          <div className="col-lg-4">
            <SendRequest data={this.props.data} user={this.props.user} auth={this.props.auth}/>
          </div>
        </div>
      </div>
    );
  }
};

export default SittersInfo;
