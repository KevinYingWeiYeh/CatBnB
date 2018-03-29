import React from 'react';

class OwnerDashEntryFinished extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
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
							      Finished Request
						      </small>
						    </div>
					    </div>
				    </div>
			      <div className="row">
			        <div className ="col-md-3 col-md-offset-3">
			        Sitter name: {this.props.task.sitter_name}
			        </div>
			        <div className ="col-md-4 col-md-offset-3">
			        </div>
			        <div className='col-md-5 col-md-offset-3'>
			         Request Created At: {this.props.task.createdAt.slice(0,10)}
			        </div>
			      </div>
			      <div className='onwer-dash-entry-date'>
			        <div className="row">
			          <div className ="col-md-3 col-md-offset-3">
			          	<h6>Request Data </h6>
			            <div>Starting Data: {this.props.task.startDate.slice(0,10)}</div>
			            <div>Ending Data: {this.props.task.endDate.slice(0,10)} </div>
			          </div>
			          <div className ="col-md-4 col-md-offset-3">
			          </div>
			          <div className='col-md-2 col-md-offset-3'>
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
	            	</div>
	            	<div className ="col-md-3 col-md-offset-3">
	            	</div>
	            </div>
			      </div>
			    </div>
			  </div>
		  </div>
      )
  }
}
export default OwnerDashEntryFinished
