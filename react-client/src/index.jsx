import React from 'react';
import ReactDOM from 'react-dom';
import get from './ajaxHelper.js';
import Map from './components/MapView.jsx';
import Headerbar from './components/HeaderbarView.jsx';
import Bottombar from './components/Bottombar.jsx';
import OwnerProfile from './components/OwnerProfileView.jsx';
import OwnerProfileRevise from './components/OwnerProfileViewRevise.jsx';
//import SitterProfile from './components/SitterProfileView.jsx';
import OwnerDashView from './components/OwnerDashView.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 'HomePage',
      auth: null,
      map: null,
      user: null
    };

    this.navClick = this.navClick.bind(this);
    this.setAuth = this.setAuth.bind(this);
    this.setMap = this.setMap.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setAuth(authObj) {
    this.setState({auth: authObj}, () => {
      // console.log('auth:', authObj);
    });

  }

  setMap(map) {
    this.setState({map: map});
  }

  setUser(user) {
    this.setState({user: user});
  }

  navClick(data) {
    console.log('this is the data for nav bar:', data);
    if(data === 'SignUp') this.setState({pageState: 'SignUp'});
    if(data === 'HomePage') this.setState({pageState: 'HomePage'});
    if(data === 'Profile')
    this.setState({
      pageState: 'Profile'
    })
    if(data === 'Dashboard')
    this.setState({
      pageState: 'Dashboard'
    })
  }

  render () {
    return (
      <div>
        <Headerbar setAuth={this.setAuth} pageState={this.navClick}
                   map={this.state.map} setUser={this.setUser} user={this.state.user} auth={this.state.auth}/>
        <div className = 'container'>
          { this.state.pageState === 'HomePage' ?
            <Map setMap={this.setMap} user={this.state.user} auth={this.state.auth}
                 map={this.state.map} />
            : this.state.pageState === 'SignUp' ?
                (
                  <div>
                    <OwnerProfile auth={this.state.auth} returnHomePage={this.navClick} setUser={this.setUser}/>
                  </div>
                )
              : this.state.pageState === 'Profile' ?
                (
                  <div>
                    <OwnerProfileRevise user={this.state.user} returnHomePage={this.navClick}/>
                  </div>
                )
                : this.state.pageState === 'Dashboard' ?
                  (
                    <div>
                      <OwnerDashView owner={this.state.user}/>
                    </div>
                  )
                  :
                  (
                    <div>
                      <SitterProfile />
                    </div>
                  )
          }
        </div>
        <Bottombar pageState={this.navClick}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
