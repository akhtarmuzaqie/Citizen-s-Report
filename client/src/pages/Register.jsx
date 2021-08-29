import {Form, Input} from '../components/Form'
import {useState, useEffect} from 'react'
import axios from 'axios'
import './style.css'
export default function Register() {

  const [state, setState] = useState({
    email: '',
    password: '',
    username: '',
    telp: '',
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
    e.preventDefault();
    axios.post('/user', state).then(({data}) => console.log(data)).catch(err => console.log(err));
    window.location.assign('/login')
  }

  return (<div className="container d-flex justify-content-center align-items-center vh-100 bfont">
    <div className="row w-100">
      <div className="shadow rounded col-md-6 mx-auto p-4 bg-secondary text-light">
        <Form title="Citizen's Register" onSubmit={handleSubmit}>
          <Input name="email" placeholder="Email" type="email" onChange={handleChange}/>
          <Input name="username" placeholder="Username" type="text" onChange={handleChange}/>
          <Input name="password" placeholder="Password" type="password" onChange={handleChange}/>
          <Input name="telp" placeholder="Telephone" type="number" onChange={handleChange}/>
          <center>
            <button type="submit" className="btn btn-secondary subBtn">
              <i className="fas fa-arrow-alt-circle-right"></i>
              {" "}
              Submit</button>
            <p>Already Have An Account ?
              <br/>
              Login
              <a href="/login">
                {" "}Here</a>
            </p>
          </center>
        </Form>
      </div>
    </div>
  </div>)
}