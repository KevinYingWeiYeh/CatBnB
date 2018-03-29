import React from 'react';

class SitterInfoViewReview extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.toggleView(this.props.index);
  }

  render() {
    console.log('Review',this.props.data);
    return (
      <div className="sitter-info-review-inbox media">
        <div className="media-left media-middle">
          <img className="media-object cat-icon" height="60" width="80" src="https://www.petdrugsonline.co.uk/images/page-headers/cats-master-header" alt="" />
        </div>
        <div className="media-body">
          <div className="sitter-view-title">{this.props.data.name}</div>
          <div className="sitter-view-detail">{this.props.data.review}</div>
          <div>Rates: {this.props.data.rating}/10</div>
        </div>
      </div>
    );
  }
}

export default SitterInfoViewReview;
