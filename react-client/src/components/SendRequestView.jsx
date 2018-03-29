import React from 'react';
import {post}from '../ajaxHelper.js';
import {validateDates} from '../validationHelper.js';
// import DatePicker from 'DatePicker'

class SendRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate:null,
      ownerText:null
    };
    this.sendRequest = this.sendRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  sendRequest() {
    validateDates(this.state)
      .then(state => {
        if(this.props.auth){
          let data = {
            id: this.props.user.id,
            'sitter_id': this.props.data.id,
            startDate: state.startDate,
            endDate: state.endDate,
            message: state.ownerText
          }
          post('/owner/sendtask', JSON.stringify(data));
          $('#exampleModal').modal('hide');
        } else {
          $('#exampleModal').modal('hide');
          alert('You need to log in first!');
        }
      })
      .catch(err => alert(err));
  }

  handleChange(event) {
    var obj ={}
    obj[event.target.id]= event.target.value;
    this.setState(obj);
  }

  render() {
    return (
      <div>
        <div className='request-btn'>
          <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap" >Contact sitter</button>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLabel">You are sending a reservation request to</h3>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row sitter-info-name">
                  <h4 className="col-lg-9">
                    Name: {this.props.data.name}
                  </h4>
                  <h5 className="col-lg-3">
                    Rate: ${this.props.data.price}/{this.props.data.unit}
                  </h5>
                </div>
                <div className="row sitter-request-data">
                  <div className="col-lg-5">
                    <div>
                      Date:
                    </div>
                    <small>(requertment)</small>
                  </div>
                  <div className="col-lg-2">
                    <div className='sitter-request-data-inline'>
                      StartDate:
                    </div>
                    <div className='sitter-request-data-inline'>
                      EndDate:
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className='sitter-request-data-inline'>
                      <input type='date' id='startDate' onChange={this.handleChange}></input>
                    </div>
                    <div className='sitter-request-data-inline'>
                      <input type='date' id='endDate' onChange={this.handleChange}></input>
                    </div>
                  </div>
                </div>
                  <div className="div-group">
                        <label htmlFor="message-text" className="div-control-label">Request Detail:</label>
                        <textarea className="div-control box" id="ownerText" rows="3" onChange={this.handleChange}></textarea>
                  </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.sendRequest}>Send Quest</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default SendRequest;
