import React from 'react';
import {post, validateInput} from '../ajaxHelper.js';
import Dropzone from 'react-dropzone'
import $ from 'jquery';

class OwnerProfileRevise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfCats: this.props.user.numOfCats,
      food: this.props.user.food,
      medical: this.props.user.medical,
      personality: this.props.user.personality,
      other: this.props.user.other,
      address: this.props.user.address,
      zipcode: this.props.user.zipcode,
      phone: this.props.user.phone
    }

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleUpdate(e) {
    e.preventDefault();
    let data = this.state;
    data.id = this.props.user.id

    post('/ownerprofile/update', JSON.stringify(this.state));
    this.props.returnHomePage('HomePage');
  }

  handleChange(e) {
    console.log(e.target.id);
    let update = {};
    update[e.target.id] = e.target.value;
    this.setState(update);
  }

  render() {
    return (
      <div className="owner-profile-inbox">
        <form onChange={this.handleChange}>
          <h2> Owner Profile </h2>
          <div className='owner-profile-name'>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">User Name:</label>
              <h3>{this.props.user.name}</h3>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address:</label>
              <small className="form-text text-muted">We will never share your email with anyone else.</small>
              <h3>{this.props.user.email}</h3>
            </div>
          </div>
          <hr></hr>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Phone</label>
            <input id="phone" type="text" className="form-control" placeholder={this.props.user.phone}></input>
          </div>
          <div className='container'>
            <div className="form-group form-inline">
             <div className='row'>
                <div className="col-lg-2">
                  <label htmlFor="exampleInputEmail1" >Address:</label>
                </div>
                <div className="col-lg-6">
                    <input id="address" type="text" className="form-control owner-profile-address" placeholder={this.props.user.address}></input>
                </div>
                <div className="col-lg-4">
                  <input id="zipcode" type="text" className="form-control" placeholder={this.props.user.zipcode}></input>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleSelect1">How many cats you have:</label>
            <select id="numOfCats" className="form-control">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleTextarea">Food:</label>
            <textarea id="food" className="form-control" rows="1"></textarea>
          </div>
            <div className="form-group">
            <label htmlFor="exampleTextarea">Medical:</label>
            <textarea id="medical" className="form-control" rows="1"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="exampleSelect2">Personality:</label>
            <select id="personality" className="form-control">
              <option>Grumpy</option>
              <option>Quiet</option>
              <option>Social</option>
              <option>Shy</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleTextarea">Other:</label>
            <textarea id="other" className="form-control" rows="3"></textarea>
          </div>
          {/* <div className="form-group">
            <label htmlFor="exampleInputFile">Pictures input</label>
            <input type="file" className="form-control-file"></input>
          </div> */}
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input"></input>
              Accept to be a user
            </label>
            {/* <Dropzone onDrop={this.uploadFile.bind(this)}/> */}
          </div>
          <button onClick={this.handleUpdate} type="submit" className="btn btn-primary">Update Profile</button>
        </form>
      </div>
    )
  }
}

export default OwnerProfileRevise
