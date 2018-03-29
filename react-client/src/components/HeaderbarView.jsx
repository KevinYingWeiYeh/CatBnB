import React from 'react';
import Login from './LoginView.jsx';

class Headerbar extends React.Component {
  constructor(props) {
    super(props);

    this.initializeAutocomplete = this.initializeAutocomplete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUpdate() {
    // careful of timing issue, searchbox must be rendered after map completes loading
    this.initializeAutocomplete(this.props.map);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  initializeAutocomplete(map) {
    if (!map) return;
    var autocomplete = new google.maps.places.Autocomplete(this.searchBox);
    var infoWindow = new google.maps.InfoWindow();

    var marker = new google.maps.Marker({
      map: map
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      infoWindow.close();
      var place = autocomplete.getPlace();
      map.setCenter(place.geometry.location);
      map.setZoom(15);

      marker.setPosition(place.geometry.location);
      infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
      infoWindow.open(map, marker);
      google.maps.event.addListener(marker,'click',function(e){

        infoWindow.open(map, marker);
      });
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container">
        <img className='logo' src="noun_773861_cc.svg" height="60" width="90" onClick={this.props.pageState.bind(null,'HomePage')}></img>
          <h3 className="navbar-brand" onClick={this.props.pageState.bind(null,'HomePage')}>CatBnB</h3>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              { this.props.auth === null || this.props.auth.status === 'unknown' ?
                 <div></div>
                : this.props.user === null ?
                  <div className="nav-link" onClick={this.props.pageState.bind(null,'SignUp')} >Create Profile</div>
                  :
                    <div className='row'>
                      <div className="nav-link col-lg-2"></div>
                      <div className="nav-link col-lg-5" onClick={this.props.pageState.bind(null,'Profile')} >Profile</div>
                      <div className="nav-link col-lg-5" onClick={this.props.pageState.bind(null,'Dashboard')} >Dashboard</div>
                    </div>
              }

              </li>
            </ul>
            <form onSubmit={this.handleSubmit} className="form-inline my-2 my-lg-0">
              <input ref={x => { this.searchBox = x; }} className="form-control mr-sm-2" type="text" placeholder="Input Your Address" aria-label="Search"></input>
               {/* <button onClick={this.handleSubmit} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
            </form>
              <div className="form-inline ">
                <Login setAuth={this.props.setAuth} setUser={this.props.setUser} />
              </div>
          </div>
        </div>
      </nav>
    );
  }
}


export default Headerbar
