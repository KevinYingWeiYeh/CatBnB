import React from 'react';
import {get, post, validateInput} from '../ajaxHelper.js';
import Dropzone from 'react-dropzone'
import $ from 'jquery';
import {validateInputs} from '../validationHelper.js';


class OwnerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      numOfCats: 1,
      food: '',
      medical: '',
      personality: 'Grumpy',
      other: '',
      address: null,
      zipcode: null,
      phone: null,
      email: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    let data = this.state
    data['fb_userId'] = this.props.auth.authResponse.userID;
    console.log('submit',data);
    validateInputs(this.state)
      .then(data => {
        post('/ownerprofile/create', JSON.stringify(data))
          .then(()=> {
            get('/owner/' + this.props.auth.authResponse.userID)
              .then(user => {
                this.props.setUser(user);
                this.props.returnHomePage('HomePage');
              })
            });
      })
      .catch(err => alert(err));
  }

  handleChange(e) {
    var update = {};
    update[e.target.id] = e.target.value;
    this.setState(update);
  }

  render() {
    return (
      <div className="owner-profile-inbox">
        <form onChange={this.handleChange} >
          <h2> Owner Profile: </h2>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">User Name</label>
            <input id="name" type="text" className="form-control" placeholder="User Name"></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <small className="form-text text-muted">We will never share your email with anyone else.</small>
            <input id="email" type="text" className="form-control" placeholder="Enter email"></input>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Phone</label>
            <input id="phone" type="text" className="form-control" placeholder="Enter phone number"></input>
          </div>
          <div className='container'>
            <div className="form-group form-inline">
             <div className='row'>
                <div className="col-lg-2">
                  <label htmlFor="exampleInputEmail1" >Address:</label>
                </div>
                <div className="col-lg-6">
                  <input id="address" type="text" className="form-control" placeholder="Address"></input>
                </div>
                <div className="col-lg-4">
                  <input id="zipcode" type="text" className="form-control" placeholder="Zip Code"></input>
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
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input"></input>
              Accept to be a user
            </label>
          </div>
          <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default OwnerProfile
