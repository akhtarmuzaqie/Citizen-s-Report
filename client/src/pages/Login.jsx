import {Form, Input} from '../components/Form'
import {useState, useEffect} from 'react'
import axios from 'axios'
import './style.css'
export default function Login() {

  const [state, setState] = useState({
    email: "",
    password: "",
    message: "",
    id_user: JSON.parse(sessionStorage.getItem('id')),
    token: JSON.parse(sessionStorage.getItem('token'))
  })
  const handleChange = (e) => {
    setState(state => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    if (state.token) {
      window.location = "/report"
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault(e)
    axios.post('http://localhost:2121/user/auth', state).then(({data}) => {
      if (data.message) {
        setState(state => ({
          ...state,
          message: data.message
        }))
      } else {
        if(data !== "Something Is Wrong") {
          sessionStorage.setItem('email', JSON.stringify(data.email))
          sessionStorage.setItem('id', JSON.stringify(data.id_user))
          sessionStorage.setItem('username', JSON.stringify(data.username))
          sessionStorage.setItem('password', JSON.stringify(data.password))
          sessionStorage.setItem('telp', JSON.stringify(data.telp))
          sessionStorage.setItem('token', JSON.stringify(data.token))
          window.location.assign('/report')
        }
      }
    }).catch(err => console.log(err))
  }

  return (<div className="container d-flex justify-content-center align-items-center vh-100 montfont">
    <div className="row w-100">
      <div className="shadow rounded col-md-6 mx-auto p-4 bg-dark text-light">
        <Form title="Login Form" onSubmit={handleSubmit}>
          <Input name="email" placeholder="Email" type="email" onChange={handleChange}/>
          <Input name="password" placeholder="Password" type="password" onChange={handleChange}/> {state.message && <div id="message" className="my-3">{state.message}</div>}
          <center>
            <button type="submit" className="btn btn-secondary subBtn">
              <i className="fas fa-arrow-alt-circle-right"></i>
              {" "}
              Log In</button>
            <p>Don't Have An Account ?
              <br/>
              You Can Register<a href="/register">
                {" "}Here</a>
            </p>
          </center>
        </Form>
      </div>
    </div>
  </div>)
}