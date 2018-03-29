import React from 'react';
import SitterEntry from './SitterEntryView.jsx'
import SitterInfo from './SitterInfoView.jsx'

const SitterList = (props) => (
  <div className="container">
    <div className="sitter-view-box">
      { props.sitterClicked ?
        (<div>
          <SitterInfo toggleView={props.toggleView} data={props.sitters[props.selected]}
                      user={props.user} auth={props.auth}/>
         </div>)
      : (<div>
          {props.sitters.map((sitter, index) =>
            <SitterEntry key={index} index={index} sitter={sitter} changeView={props.changeView} />)}
        </div>) }
    </div>
  </div>
);

export default SitterList;
