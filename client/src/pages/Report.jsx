import {Form, Input} from '../components/Form'
import {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import $ from 'jquery'
import './style.css'
export default function Login() {

  const [state, setState] = useState({
    title: "",
    content: "",
    status: "",
    id_user: JSON.parse(sessionStorage.getItem('id')),
    token: JSON.parse(sessionStorage.getItem('token')),
    username: JSON.parse(sessionStorage.getItem("username"))
  })

  useEffect(() => {
    if (!state.token) {
      window.location = "/login";
    } else {
      axios.get(`http://localhost:2121/report/user/${state.id_user}`).then(({data}) => {
        console.log(data);
        setState((state) => ({
          ...state,
          report: data
        }));
        // window.location.assign('/report')
      }).catch((err) => console.log(err));
    }
  }, [state.id_user, state.token]);

  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    axios.post("http://localhost:2121/report", state).then(({data}) => {}).catch((err) => console.log(err));
    window.location.reload()
    $("#entry-point").removeClass("d-none");
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/");
  };

  return (<Fragment>
    <nav className="navbar navbar-expand-lg  bg-secondary navbar-dark text-light montfont">
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
              <i className="fas fa-plus montfont"></i>{" "}
              Make New Complaint</a>
            <a className="btn btn-transparent text-light" href="/reportindex">
              <i className="fas fa-list montfont"></i>{" "}
              My Complaint</a>
          </li>
          
          <li className="nav-item ml-auto">
            <p>{state.username}</p>
            <button className="btn btn-transparent text-light" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt montfont"></i>
              {" "}
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
    <div className="container d-flex justify-content-center align-items-center vh-100 montfont">
      <div className="row w-100">
        <div className="shadow rounded col-md-8 mx-auto p-4 bg-dark text-light">
          <Form title="Complaint Form" onSubmit={handleSubmit}>
            <Input name="title" placeholder="Title" type="text" onChange={handleChange} required="required"/>
            <textarea className="form-control" style={{
                height: "300px"
              }} name="content" placeholder="Write Your Complaint Here" onChange={handleChange} required="required"></textarea>
            {/*<label className="mt-3">Your Name:</label>
            <input type="text" className="form-control bg-dark text-light" style={{"border-style": "none"}}value={state.username} disabled/> //*/
            }
            <button type="submit" className="btn btn-secondary mt-4">
              <i className="fas fa-arrow-alt-circle-right montfont"></i>{" "}
              Send</button>
            <div id="entry-point" className="d-none text-success">Success</div>
          </Form>
        </div>
      </div>
    </div>
  </Fragment>)
}