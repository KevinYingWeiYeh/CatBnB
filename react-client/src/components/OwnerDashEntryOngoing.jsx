import React from 'react';
import {post} from '../ajaxHelper.js';

class OwnerDashEntryOngoing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	review: '',
    	rating: 10
    }
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleSummit = this.handleSummit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleCancel(){
  	console.log('cancel button')
    let data = {id: this.props.task.task_id}
    post('/task/cancel',JSON.stringify(data))
      .then(() => this.props.reRender());

  }

  handleConfirm(){
    let data = {id: this.props.task.task_id}
    post('/task/confirm',JSON.stringify(data))
      .then(() => this.props.reRender());
  }

  handleReject(){
    let data = {id: this.props.task.task_id}
    post('/task/reject',JSON.stringify(data))
      .then(() => this.props.reRender());
  }

  handleSummit(){
  	console.log(this.props.task);
    let data = this.state;
    data.id = this.props.task.task_id;
    data.owner_id = this.props.task.owner_id;
    data.sitter_id = this.props.task.sitter_id;
    console.log(data);
    post('/task/summit',JSON.stringify(data))
      .then(() => this.props.reRender());
  }

  handleChange(e) {
    var update = {};
    update[e.target.id] = e.target.value;
    this.setState(update);
  }

  render() {
    return (
    	<div>
			  <div className='onwer-dash-entry'>
			    <hr></hr>
			    <div className='container'>
			    	<div className='onwer-dash-entry-title'>
				    	<div className='row'>
				    		<div className='col-md-3'>
				    			No# {this.props.keys + 1}
				    		</div>
				    		<div className='col-md-2'>
					      	<h5>Task Status: </h5>
					      </div>
					      <div className='col-md-7'>
						      <small>
							      {
							      	this.props.task.status === "sent" ?
							      		"Request sent to sitter already and waiting sitter to response"
							      		: this.props.task.status === "confirmed" ?
							      		"The sitter accpet the request, would you accept it?"
							      			: this.props.task.status === "paid" ?
							      		  "Paid Request & Sitter is ready to take care your cats"
							      		  	: "Request is finished, ready to leave commate and rate?"
							      }
						      </small>
						    </div>
					    </div>
				    </div>
			      <div className="row">
			        <div className ="col-md-3 col-md-offset-3">
			        Sitter name: {this.props.task.sitter_name}
			        </div>
			        <div className ="col-md-4 col-md-offset-3">
			         {
			         	this.props.task.status === 'confirmed' ?
		          		'Offering for Total Fee: $ ' + this.props.task.finalPrice
		            		: this.props.task.status === 'paid' || this.props.task.status === 'ready' ?
		            			'Paid Fee: $' + this.props.task.finalPrice
		            			: 'Request Rate: $ ' + this.props.task.price + ' / ' +this.props.task.unit
			          }
			        </div>
			        <div className='col-md-5 col-md-offset-3'>
			         Request Created At: {this.props.task.createdAt.slice(0,10)}
			        </div>
			      </div>
			      <div className='onwer-dash-entry-date'>
			        <div className="row">
			          <div className ="col-md-3 col-md-offset-3">
			          	<h6>Request Data</h6>
			            <div>Starting Data: {this.props.task.startDate.slice(0,10)} </div>
			            <div>Ending Data: {this.props.task.endDate.slice(0,10)} </div>
			          </div>
			          <div className ="col-md-4 col-md-offset-3">
			          	{
			          		this.props.task.status === 'ready' ?
			          		  	<div className="form-group">
			          		  		<div className='onwer-dash-entry-input'>
									          <label htmlFor="exampleTextarea">Review:</label>
									          <textarea id="review" className="form-control" rows="3" onChange={this.handleChange}></textarea>
								          </div>
							        	</div>
			          		: <div></div>
			          	}
			          </div>
			          <div className='col-md-2 col-md-offset-3'>
			          {
			          	this.props.task.status === 'ready' ?
					        <div className="form-group">
					        	<div className="onwer-dash-entry-input">
						          <label htmlFor="exampleSelect1">Rates:</label>
						          <select id="rating" className="form-control " onChange={this.handleChange}>
						            <option>10</option>
						            <option>9</option>
						            <option>8</option>
						            <option>7</option>
						            <option>6</option>
						            <option>5</option>
						            <option>4</option>
						            <option>3</option>
						            <option>2</option>
						            <option>1</option>
						          </select>
					          </div>
					        </div>
					        : <div></div>
			          }
			          </div>
			          <div className ='col-md-3 col-md-offset-3'>
			          </div>
			        </div>
	            <div className="row">
	            	<div className ="col-md-3 col-md-offset-3">
	            	</div>
	            	<div className ="col-md-3 col-md-offset-3">
	            	</div>
	            	<div className ="col-md-3 col-md-offset-3">
		            	{
			          		this.props.task.status === 'accepted' ?
				          		<button type="button" className="btn btn-primary btb" onClick={this.handleConfirm}>Accept and Pay</button>
				          		: <div></div>
		          		}
	            	</div>
	            	<div className ="col-md-3 col-md-offset-3">
		            	{	this.props.task.status === 'accepted' ?
		          		<button type="button" className="btn btn-danger" onClick={this.handleReject}>Reject</button>
		            		: this.props.task.status === 'sent' ?
		            		<button type="button" className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
		            			: this.props.task.status === 'confirmed' ?
		            			<button type="button" className="btn btn-danger" onClick={this.handleCancel}>Cancel & Refund</button>
		            				: <button type="button" className="btn btn-primary" onClick={this.handleSummit}>Summit</button>
		          		}
	            	</div>
	            </div>
			      </div>
			    </div>
			  </div>
		  </div>
      )
  }
}
export default OwnerDashEntryOngoing
