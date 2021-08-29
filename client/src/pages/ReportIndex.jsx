import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

export default function Login() {
  const [state, setState] = useState({
    content: "",
    status: "",
    report: [],
    id_user: JSON.parse(sessionStorage.getItem("id")),
    token: JSON.parse(sessionStorage.getItem("token")),
    username: JSON.parse(sessionStorage.getItem("username")),
  });

  useEffect(() => {
    if (!state.token) {
      window.location = "/login";
    } else {
      axios.get(`http://localhost:2121/report/user/${state.id_user}`, {headers: {token: state.token}}).then(({data}) => {
        console.log(data);
        setState((state) => ({
          ...state,
          report: data
        }));
      }).catch((err) => console.log(err));
    }
  }, [state.id_user, state.token]);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/");
  };

  return (
    <Fragment>
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
              <a className="btn btn-transparent text-light" href="/report">
                <i className="fas fa-plus bfont"></i>{" "}
                Make New Complaint</a>
              <a className="btn btn-transparent text-light" href="/reportindex">
                <i className="fas fa-list bfont"></i>{" "}
                My Complaint</a>
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
        <table className="table table-striped table-hover table-secondary bfont">
          <thead className="">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Response</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          {state.report.map((element, index) => (
            <tbody key={index}>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{element.title}</td>
                <td>{element.content}</td>
                <td>{element.response}</td>
                <td>{element.status}</td>
              </tr>
            </tbody>
          ))}
        </table>
    </Fragment>
  );
}