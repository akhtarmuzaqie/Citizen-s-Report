import {useState, useEffect} from 'react'
import './style.css'


export default function Admindex() {
  const [state] = useState({
    token: JSON.parse(sessionStorage.getItem("tokenAdmin"))
  });

  useEffect(() => {
    if (!state.token) {
      window.location = "/admin"
    }
  });

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/admin");
  };

  return (<div>
    <nav className="navbar navbar-expand-lg bg-secondary navbar-dark text-light bfont">
      <div className="navbar-brand navbar-brand d-flex flex-row align-items-center">
        <h3 className="margin-leftlarger-font-size pmfont text-light">Citizen's Report</h3>
      </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav w-100">
          <li className="nav-item">
            <a className="btn btn-transparent text-light" href="/admindex">
              <i className="fas fa-home bfont"></i>{" "}
              Home</a>
            <a className="btn btn-transparent text-light" href="/reportindexadmin">
              <i className="fas fa-list bfont"></i>{" "}
              Complaint List</a>
            <a className="btn btn-transparent text-light" href="/ongoing">
              <i className="fas fa-spinner bfont"></i>{" "}
              In Progress</a>
            <a className="btn btn-transparent text-light" href="/history">
              <i className="fas fa-history bfont"></i>{" "}
              Complaint History</a>
          </li>
          <li className="nav-item ml-auto">
            <button className="btn btn-transparent text-light" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt bfont"></i>
              {" "}
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
    <center>
      <h1 className="adminTitle bfont">Admin Page</h1>
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