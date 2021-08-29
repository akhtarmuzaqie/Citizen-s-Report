import {Fragment, useState, useEffect} from "react";
import axios from "axios";
import "./style.css";

export default function Login() {
  const [state, setState] = useState({
    content: "",
    status: "",
    report: [],
    id_user: JSON.parse(sessionStorage.getItem("id")),
    token: JSON.parse(sessionStorage.getItem("tokenAdmin")),
    username: JSON.parse(sessionStorage.getItem("username"))
  });

  useEffect(() => {
    axios.get(`http://localhost:2121/report/user/pending`, {headers: {token: state.token}})
    .then(({data}) => {
      console.log(data);
      setState((state) => ({
        ...state,
        report: data
      }));
      // window.location.assign('/report')
    }).catch((err) => console.log(err));
  }, [state.id_user, state.token]);

  const updateStatus = (reportId, status) => {
    if (state.content.trim().length > 0) {
      axios.put(`http://localhost:2121/report/user/${reportId}/upStatus`, {
        status,
        response: state.content,
        id_admin: state.id_user
      }, {headers: {token: state.token}}).then((response) => console.log(response)).catch((err) => console.log(err));
      window.location.reload();
    }
  };

  const upOnGoing = (reportId, status) => {
    axios.put(`http://localhost:2121/report/user/${reportId}/upStatus`, {
      status,
      response: state.content,
      id_admin: state.id_user
    }, {headers: {token: state.token}}).then((response) => console.log(response)).catch((err) => console.log(err));
    window.location.reload();
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/admin");
  };

  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  return (<Fragment>
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
    <div>
      <table className="table table-secondary table-striped table-hover bfont">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Date Reported</th>
            <th scope="col">Username</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {
          state.report.map((element, index) => (
          <tbody key={index}>
            <tr>
              <th scope="row" className="align-middle">{index + 1}</th>
              <td className="align-middle">{element.title}</td>
              <td className="align-middle">{element.content}</td>
              <td className="align-middle">{new Date(element.date_created).toLocaleString()}</td>
              <td className="align-middle">{element.username}</td>
              <td className="align-middle">{element.status}</td>
              <td className="align-middle">
              <div className="btn-group d-flex" role="group">
                  <button className="btn btn-success btn-sm" data-toggle="modal" data-target={`#appModal${index}`}>
                    <i className="fas fa-check-square bfont"></i>{" "}Approve
                  </button>
                  <button className="btn btn-danger btn-sm" data-toggle="modal" data-target={`#rejModal${index}`}>
                    <i className="fas fa-times-circle bfont"></i>{" "}Reject
                  </button>
                </div>
                {
                  state.report.map((element, index) => (<div key={index} className="modal fade" id={`appModal${index}`} tabIndex="-1" aria-labelledby="AppModLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header bg-dark text-light">
                          <h5 className="modal-title" id="AppModLabel">
                            Approve This Complaint ?
                          </h5>
                          <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body bg-dark text-light">
                          Are You Sure ?
                        </div>
                        <div className="modal-footer bg-dark text-light">
                          <button type="button" className="btn btn-danger" data-dismiss="modal">
                            <i className="fas fa-times-circle bfont"></i>{" "}No
                          </button>
                          <button type="button" className="btn btn-success" onClick={() => upOnGoing(element.id_report, "In Progress")}>
                            <i className="fas fa-check-square bfont"></i>{" "}
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>))
                }
                {
                  state.report.map((element, index) => (<div key={index} className="modal fade" id={`rejModal${index}`} tabIndex="-1" aria-labelledby="RejModLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header bg-dark text-light">
                          <h5 className="modal-title" id="RejModLabel">
                            Reject This Complaint ?
                          </h5>
                          <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body bg-dark text-light">
                          <h6 className="my-3">Write The Reason Why You Reject This Complaint:</h6>
                          <textarea className="form-control" name="content" placeholder="Response" style={{
                              height: "300px"
                            }} onChange={handleChange} required="required"/>
                        </div>
                        <div className="modal-footer bg-dark text-light">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">
                            <i className="fas fa-times-circle bfont"></i>{" "}Cancel
                          </button>
                          <button type="submit" className="btn btn-danger" onClick={() => updateStatus(element.id_report, "Rejected")}>
                            <i className="fas fa-check-square bfont"></i>{" "}Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>))
                }
              </td>
            </tr>
          </tbody>))
        }
      </table>
    </div>
  </Fragment>);
}