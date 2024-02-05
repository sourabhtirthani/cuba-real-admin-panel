import React, { Fragment, useState, useEffect, useContext } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4, P } from "../AbstractElements";
import { EmailAddress, ForgotPassword, Password, RememberPassword, SignIn } from "../Constant";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import man from "../assets/images/dashboard/profile.png";

import CustomizerContext from "../_helper/Customizer";
import OtherWay from "./OtherWay";
import { ToastContainer, toast } from "react-toastify";
import { loginAdmin } from "../api/integrateConfig";

const Signin = ({ selected }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);

  const [value, setValue] = useState(localStorage.getItem("profileURL" || man));
  const [name, setName] = useState(localStorage.getItem("Name"));

  useEffect(() => {
    localStorage.setItem("profileURL", man);
    
  }, [value, name]);

  const loginAuth = async (e) => {
    e.preventDefault();
    setValue(man);
    
    try{
      const data1 = {
        email : email,
        password : password
      }
      const response = await loginAdmin(data1);
      if(response.token){
        localStorage.setItem("login", JSON.stringify(true));
        localStorage.setItem("authToken" , response.token);
        localStorage.setItem("address" , response.address);
        localStorage.setItem("userID" , response.userId);
        localStorage.setItem("Name", response.name);
        setName(response.name);
        history(`${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`);
        toast.success("Successfully logged in!..");
      }else{
        toast.error("Invalid Username or password!");
      }

    }catch(error){
      console.log(`error while logging in `);
      toast.error("Login error! Please try logging in again!");
    }
  //   if (email === "test@gmail.com" && password === "test123") {
  //     localStorage.setItem("login", JSON.stringify(true));
  // //     localStorage.setItem("authToken" , response.token);
  // // localStorage.setItem("address" , response.address);
  // // localStorage.setItem("userID" , response.userId);
  //     history(`${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`);
  //     toast.success("Successfully logged in!..");

  //   } else {
  //     toast.error("You enter wrong password or username!..");
  //   }
  };

  return (
    <Fragment>
      <Container fluid={true} className="p-0 login-page">
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                <Form className="theme-form">
                  <H4 >{selected === "simpleLogin" ? "" : "Sign In With Simple Login"}</H4>
                  <P>{"Enter your email & password to login"}</P>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label className="col-form-label">{Password}</Label>
                    <div className="position-relative">
                      <Input className="form-control" type={togglePassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} />
                      <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}>
                        <span className={togglePassword ? "" : "show"}></span>
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label className="col-form-label m-0 pt-0">
                      Wallet Address (Trust Wallet, Metamask)
                    </Label>
                    <div className="position-relative">
                      <Input
                        className="form-control"
                        type="text"
                        name="walletAddress"
                        placeholder="Enter your wallet address"
                        required
                      />
                    </div>
                    <small className="text-muted">Joining Amount: $11</small>
                  </FormGroup>

                  <div className="position-relative form-group mb-0">
                    <div className="checkbox">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" for="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div>

                    <Link className='link' to={`${process.env.PUBLIC_URL}/pages/authentication/forget-pwd`}>
                      {ForgotPassword}
                    </Link>
                    <Btn attrBtn={{ color: "primary", className: "d-block w-100 mt-2", onClick: (e) => loginAuth(e) }}>{SignIn}</Btn>
                  </div>
                  <OtherWay />
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default Signin;
