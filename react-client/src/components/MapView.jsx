import React from 'react';
import {get} from '../ajaxHelper.js';
import SitterList from './SitterListView.jsx';
import {sitters} from '../sampleData.js';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sitterData: [],
      sitters: [],
      selected: null,
      sitterClicked: false,
      markers: []
    }

    this.icon = 'http://maps.google.com/mapfiles/ms/icons/blue.png';
    this.selectedIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png';

    this.updateMarkers = this.updateMarkers.bind(this);
    this.changeView = this.changeView.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.sittersInBound = this.sittersInBound.bind(this);
  }

  componentDidMount() {
    var mapOptions = {
      // centre hard coded to Hack Reactor SF
      center: new google.maps.LatLng(37.7837, -122.4089),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(this.mapContainer, mapOptions);
    this.props.setMap(map);

    google.maps.event.addListener(map, 'click', (e) => {
      this.state.markers.forEach(marker => marker.setIcon(this.icon));
      this.setState({sitterClicked: false});
    });

    google.maps.event.addListener(map, 'bounds_changed', (e) => {
      if (this.state.sitterData.length > 0) {
        this.setState({sitters: this.sittersInBound(this.state.sitterData, map.getBounds())}, () => {
          console.log(this.state.sitters);
        });
      }
    })

    var context = this;
    get('/sitters').then(data => {
      this.setState({sitters: data});
      this.setState({sitterData: data}, () => {
        // wait for sitter list to load then update markers on map
        context.updateMarkers(map);
      });
    });
  };

  updateMarkers(map) {
    var markers = [];
    this.state.sitters.forEach((sitter, index) => {

      var markerOptions = {
        position: new google.maps.LatLng(sitter.latitude, sitter.longitude),
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png'
      };
      var marker = new google.maps.Marker(markerOptions);
      marker.setMap(map);
      markers.push(marker);
      // TODO: uncomment to add little pop-ups when you click on markers
      // var infoWindowOptions = {
      //   content: sitter.name
      // };
      // var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

      // TODO TODO TODO TODO TODO Look HERE!!!!!! TODO TODO TODO TODO TODO
      // TODO: Uncomment this section to enable clicking on markers to change
      //       to a different SitterInfoView, the issue we have here is we need
      //       and extra cache storage to store the current SitterInfo being
      //       displayed instead of the index being passed around now. Because
      //       when 'sitters' gets filtered, index is not going to refrence
      //       to the correct data. Sorry we don't have time to finish this off
      //       I'm typing this message at 3:50pm!! :(
      // TODO TODO TODO TODO TODO Look HERE!!!!!! TODO TODO TODO TODO TODO

      // google.maps.event.addListener(marker, 'click', (e) => {
      //   // infoWindow.open(map, marker);
      //
      //   // reset other icons to default when one is selected
      //   this.state.markers.forEach(marker => marker.setIcon(this.icon));
      //   marker.setIcon(this.selectedIcon);
      //   this.setState({selected: index}, () => {
      //     this.setState({sitterClicked: true});
      //   })
      // });
    })
    this.setState({markers: markers});
  }

  sittersInBound(sitters, bounds) {
    var latRange = [bounds.f.b, bounds.f.f];
    var lngRange = [bounds.b.b, bounds.b.f];
    return sitters.filter(sitter => {
      if (sitter.latitude > latRange[0] && sitter.latitude < latRange[1] &&
          sitter.longitude > lngRange[0] && sitter.longitude < lngRange[1]) {
        return true;
      }
    })
  }

  // change to a different sitterInfo
  changeView(index) {
    this.setState({selected: index}, () => {
      this.setState({sitterClicked: !this.state.sitterClicked});
      this.state.markers[index].setIcon(this.selectedIcon);

      this.props.map.setCenter(new google.maps.LatLng(
        this.state.sitterData[index].latitude,
        this.state.sitterData[index].longitude)
      );
      this.props.map.setZoom(15);
    })
  }

  // toggle between sitterList and sitterInfo
  toggleView() {
    this.setState({sitterClicked: !this.state.sitterClicked});
    this.state.markers.forEach(marker => marker.setIcon(this.icon));
  }

  render() {
    return (
      <div className = 'row homepage-map-inbox homepage'>
        <div className = 'col-sm-6 homepage-map-inbox'>
          <SitterList sitterData={this.state.sitterData} changeView={this.changeView}
                      toggleView={this.toggleView} selected={this.state.selected}
                      sitterClicked={this.state.sitterClicked} user={this.props.user}
                      auth={this.props.auth} sitters={this.state.sitters} />
        </div>
        <div className = 'col-sm-6 homepage-map-map-inbox'>
          <div id="map" ref={x => { this.mapContainer = x; }}></div>
        </div>
      </div>
    );
  }
}


export default Map;
