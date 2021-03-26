import {Fragment} from "react";
import './style.css'
export default function Index() {
  return (
  <Fragment>
    <div className="container-fluid ">
      <div className="row justify-content-center">
        <div className="col-auto navbar-brand d-flex flex-column align-items-center ind-mt">
          <h1 className=" pmfont">Here Is</h1>
          <h1 className="display-1 pmfont">Citizen's Reports !</h1>
        </div>
      </div>
      <div className="row justify-content-center align-items-center margin-top montfont">
        <a className="btn btn-primary col-2 btn-lg" href="/login">
          <i className="fas fa-sign-in-alt"></i>
          {" "}
          Login
        </a>
        <a className="btn btn-outline-secondary col-2 offset-md-1 btn-lg " href="/register">
          <i className="fas fa-plus-square"></i>
          {" "}
          Register
        </a>
      </div>
    </div>
  </Fragment>
  );
}