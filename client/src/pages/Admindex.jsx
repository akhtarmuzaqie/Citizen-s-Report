import {useState, useEffect} from 'react'
import './style.css'
import axios from 'axios'

export default function Admindex() {
    const [state, setState] = useState({
        token: JSON.parse(sessionStorage.getItem("tokenAdmin")),
        pendingReport: 0,
        totalReport: 0,
        totalUser: 0
      });

  useEffect(() => {
    if (!state.token) {
      window.location = "/admin"
    }else {
        axios
  
        .get(`http://localhost:2121/report/user/pending`)
        .then(({ data }) => {
          console.log(data);
          setState((state) => ({ ...state, pendingReport: data.length }));
  
          axios
          .get(`http://localhost:2121/report/user/total`)
          .then(({ data }) => {
            console.log(data);
            setState((state) => ({ ...state, totalReport: data.length }));
  
            axios
            .get(`http://localhost:2121/user/total`)
            .then(({ data }) => {
              console.log(data);
              setState((state) => ({ ...state, totalUser: data.length }));
            })
  
          })
  
        })
        .catch((err) => console.log(err));
  
        
      }
    });


  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/");
  };

  return (<div>
    <nav className="navbar navbar-expand-lg bg-secondary navbar-light montfont">
      <div className="navbar-brand navbar-brand d-flex flex-row align-items-center">
        <h3 className="margin-leftlarger-font-size pmfont text-light">Citizen's Reports</h3>
      </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav w-100">
          <li className="nav-item">
            <a className="btn btn-transparent text-light" href="/admindex">
              <i className="fas fa-home montfont"></i>{" "}
              Home</a>
            <a className="btn btn-transparent text-light" href="/reportindexadmin">
              <i className="fas fa-list montfont"></i>{" "}
              Complaint List</a>
            <a className="btn btn-transparent text-light" href="/history">
              <i className="fas fa-history montfont"></i>{" "}
              Complaint History</a>
          </li>
          <li className="nav-item ml-auto">
            <button className="btn btn-transparent text-light" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt montfont"></i>
              {" "}
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
    <center>
      <h1 className="adminTitle montfont">Admin Page</h1>
      {/* <div className="container-fluid">
        <div className="row justify-content-center space-between__admin-header">
          <div className="col-auto navbar-brand d-flex flex-row align-items-center border">
          <div className="row">
            <div className="col-md-4">{state.pendingReport}</div>
            <div>Pending Report</div>
          </div>
          <div className="row">
            <div className="col-md-4">{state.totalReport}</div>
            <div>Total Report</div>
          </div>
          <div className="row">
            <div className="col-md-4">{state.totalUser}</div>
            <div>Total User</div>
          </div>
          </div>
        </div>
      </div> */}
    </center>
  </div>)
}