import { useState, useEffect } from "react";
import "../App.css";
import "./Form.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { Button } from "@mui/material";

export default function Register() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rpPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!values.name) {
      errors.name = "First name is required!";
    } else if (values.name.length < 3) {
      errors.name = "The name must be more than 3 characters";
    } else if (values.name.length > 30) {
      errors.name = "The name must not exceed 30 characters";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 10) {
      errors.password = "Password must be more than 10 characters";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Password must contain a special character";
    }
    if (!values.rpPassword) {
      errors.rpPassword = "Repeat Password is required";
    } else if (values.password !== values.rpPassword) {
      errors.rpPassword = "Password doesn't match";
    }
    return errors;
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      localStorage.clear();
      localStorage.setItem("userName", formValues.name);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [formErrors, isSubmit, formValues, navigate]);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="links">
          <Link to="/">
            <Button variant="contained">Go Back</Button>
            {/* <button className="register">Go Back</button> */}
          </Link>
        </div>
      </nav>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="success">Registration Successful</div>
          ) : (
            <div></div>
          )}
          <div className="form">
            <div className="field">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.name}</p>
            <div className="field">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className="field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.password}</p>
            <div className="field">
              <input
                type="password"
                name="rpPassword"
                placeholder="Repeat Your Password"
                value={formValues.rpPassword}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.rpPassword}</p>
            <button className="button">Register</button>
          </div>
        </form>
      </div>
    </>
  );
}
