import React from 'react';
import {get, post, validateInput} from '../ajaxHelper.js';
import OwnerDashEntryOngoing from './OwnerDashEntryOngoing.jsx'
import OwnerDashEntryFinished from './OwnerDashEntryFinished.jsx'

class OwnerDashView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      status: {
        onGoing: false,
        finished: false,
      },
      qty: {
        sent: 0,
        accepted:0,
        confirmed: 0,
        ready: 0,
        finished: 0,
        rejected: 0,
        cancelled: 0,
      }
    }
    this.sync = this.sync.bind(this);
    this.reRender = this.reRender.bind(this);
  }
  
  componentWillMount() {
    get('/owner/dashboard/' + this.props.owner.id)
    .then(data => {
      this.setState({
        data: data,
      })
    })
    .then( ()=>{
      this.sync();
    });  
  }

  sync() {
    var qty = {
        sent: 0,
        confirmed: 0,
        accepted: 0,
        ready: 0,
        finished: 0,
        rejected: 0,
        cancelled: 0,
      };
    this.state.data.forEach(ele => qty[ele.status]++)
    this.setState({ qty: qty })
  }

  click(item) {
    var status = Object.keys(this.state.status).reduce((a,e) => {
      a[e] = this.state.status[e]
      return a;
    },{})
    if(status[item]) {
      status[item] = false;
    } else {
      status[item] = true
    }
    this.setState({
      status: status
    })
  }

  reRender(){
    get('/owner/dashboard/' + this.props.owner.id)
      .then(data => {
        this.setState({
          data: data,
          status:{
            onGoing: false,
            finished: false
          }
        })
      })
      .then( ()=>{
        this.sync();
      });

 }
  
  render() {
    return (
      <div className="owner-dash-inbox">
        <h2> Dashboard: </h2>
        <hr></hr>
        <div className='Owner-dash-view'>
          <div className='row' onClick={this.click.bind(this,'onGoing')}>
            <div className='col-lg-8'>
              <h3>On-Going Tasks</h3>
            </div>
            <div className='col-lg-4'>
              <h3>You have {this.state.qty.sent + this.state.qty.confirmed + this.state.qty.ready + this.state.qty.accepted} tasks</h3>
            </div>
          </div>
          { 
            this.state.status.onGoing ?
                this.state.data.filter(ele => ele.status === 'sent' || ele.status === 'confirmed' || ele.status === 'accepted' ||ele.status === 'ready' ).map((ele, index) => {
                  return (
                    <div className='Owner-dash-view-data' key={index}>
                      <OwnerDashEntryOngoing task={ele} keys={index} reRender={this.reRender}/>
                    </div>
                  )  
                })
              :
              <div></div>
          }
          <hr></hr>
          <div className='row' onClick={this.click.bind(this,'finished')}>
            <div className='col-lg-8'>
              <h3>Finished Tasks</h3>
            </div>
            <div className='col-lg-4'>
              <h3>You have {this.state.qty.cancelled + this.state.qty.finished + this.state.qty.rejected } tasks</h3>
            </div>
          </div>
          { 
            this.state.status.finished ?
                this.state.data.filter(ele => ele.status === 'cancelled' || ele.status === 'finished' || ele.status === 'rejected').map((ele, index) => {

                  return (
                    <div className='Owner-dash-view-data' key={index}>
                      {<OwnerDashEntryFinished task={ele} keys={index} reRender={this.reRender}/>}
                    </div>
                  )  
                })
              :
              <div></div>
          }
        </div>         
      </div>
    )
  }
}
export default OwnerDashView