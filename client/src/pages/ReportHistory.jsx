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
    if (!state.token) {
      window.location = "/admin";
    } else {
      axios.get(`http://localhost:2121/report/user/history`, {headers: {token: state.token}}).then(({data}) => {
        console.log(data);
        setState((state) => ({
          ...state,
          report: data
        }));
        // window.location.assign('/report')
      }).catch((err) => console.log(err));
    }
  }, [state.id_user, state.token]);

  const deleteReport = (reportId) => {
    axios.delete(`http://localhost:2121/report/user/${reportId}/del`, {headers: {token: state.token}}).then((response) => console.log(response)).catch((err) => console.log(err));
    window.location.reload();
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/admin");
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
    <center><button className="btn btn-success btn-block text-light" onClick={() => window.print()}>
      <i className="fas fa-print bfont"></i>{" "}Print This Page</button></center>
    <div className="bfont">
      <table className="table table-secondary table-striped table-hover bfont" id="section-to-print">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Response</th>
            <th scope="col">Username</th>
            <th scope="col">Date Created</th>
            <th scope="col">Status</th>
            <th scope="col" id="exclude-print">Action</th>
          </tr>
        </thead>
        {
          state.report.map((element, index) => {
            return (<Fragment key={index}>
              <tbody>
                <tr>
                  <th scope="row" className="align-middle">
                    {index + 1}
                  </th>
                  <td className="align-middle">{element.title}</td>
                  <td className="align-middle">{element.content}</td>
                  <td className="align-middle">{element.response}</td>
                  <td className="align-middle">{element.username}</td>
                  <td className="align-middle">{new Date(element.date_created).toLocaleString()}</td>
                  <td className="align-middle">{element.status}</td>
                  <td className="align-middle">
                    <button className="btn btn-danger btn-sm" data-toggle="modal" data-target={`#delModal${index}`} id="exclude-print">
                      <i className="fas fa-trash-alt bfont"></i>{" "}Delete
                    </button>
                  </td>
                </tr>

              </tbody>
            </Fragment>)
          })
        }
      </table>
      {
        state.report.map((element, index) => (<div key={index} className="modal fade" id={`delModal${index}`} tabIndex="-1" aria-labelledby="delModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-secondary">
                <h5 className="modal-title text-light" id="delModalLabel">
                  This Report Will Be Deleted!
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body bg-secondary text-light">Are You Sure ?</div>
              <div className="modal-footer bg-secondary">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  <i className="fas fa-times-circle bfont"></i>{" "}No
                </button>
                <button type="button" className="btn btn-danger" onClick={() => deleteReport(element.id_report)}>
                  <i className="fas fa-trash-alt bfont"></i>{" "}Yes
                </button>
              </div>
            </div>
          </div>
        </div>))
      }
    </div>
  </Fragment>);
}
