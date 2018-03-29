import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class SitterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
  }


  render () {
    return (
      <form>
        <h2> Sitter Profile </h2>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">User Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="User Name"></input>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else.</small>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
        </div>
          <div className="form-group row">
          <label htmlFor="exampleInputEmail1" className="col.sm-4">Address:</label>
          <input type="text" className="form-control col.sm-4" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Address"></input>
          <input type="text" className="form-control col.sm-4" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Zip Code"></input>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Phone Number</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Phone Number"></input>
        </div>
        <div className="form-group">
          <label htmlFor="exampleTextarea">Experience:</label>
          <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="exampleTextarea">Other:</label>
          <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputFile">Pictures input</label>
          <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"></input>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input"></input>
            Accept to be a sitter
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

export default SitterProfile
