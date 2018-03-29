import React from 'react';

class SitterEntry extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.props.index);
    this.props.changeView(this.props.index);
  }

  render() {
    return (
      <div onClick={this.handleClick} className="sitter-view-inbox media">
        <div className="media-left media-middle">
          <img className="media-object" height="120" width="160" src={this.props.sitter.photo} alt="" />
        </div>
        <div className="media-body">
          <div className="sitter-view-title">{this.props.sitter.name}</div>
          <div className="sitter-view-detail">{this.props.sitter.description}</div>
          <div>Price: ${this.props.sitter.price} /{this.props.sitter.unit}</div>
          <div>Rating: {this.props.sitter.rating}/10</div>
        </div>
      </div>
    );
  }
}

export default SitterEntry;
