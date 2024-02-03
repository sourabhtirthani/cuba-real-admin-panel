import React, { Fragment, useState, useEffect } from "react";
import { Facebook, Linkedin, Twitter } from "react-feather";
import { Form, FormGroup, Input, Label, Row, Col, Button } from "reactstrap";
import { Btn, H4, P, H6, Image } from "../../../AbstractElements";
import { Link } from "react-router-dom";
import logoWhite from "../../../assets/images/logo/logo.png";
import logoDark from "../../../assets/images/logo/logo_dark.png";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../../../api/integrateConfig";


const RegisterFrom = ({ logoClassMain }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [inviteCode, setInviteCode] = useState("refId")
  const [ref, setRef] = useState();

  const navigate = useNavigate();
  // const {address , referBy, email , name, mobileNumber} = req.body;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralID: '',
    referralName: '',
    address: '',
    referBy: '',
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const refParam = searchParams.get("ref");
    console.log("🚀 ~ useEffect ~ refParam:", refParam);
    if (refParam) {
      setRef(refParam);
    }
  }, [window.location.search]);


  // const handleChange = (e)=>{
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (e)=>{

  e.preventDefault();
  console.log(`formdata is :`)
  console.log(formData)
  // const response = await createAccounts
  try{
  const response = await createAccount(formData);
  console.log(`the response recieved from response is : ${response.message}`);
  console.log(response)
  localStorage.setItem("address" , formData.address)
  localStorage.setItem("userID" , response.userId)
  }catch(error){
    console.log(error)
  }
  // navigate(`${process.env.PUBLIC_URL}/dashboard/default/`);


}

  return (
    <Fragment>
      <div className="login-card">
        <div>
          <div>
            <Link
              className={`logo ${logoClassMain ? logoClassMain : ""}`}
              to={process.env.PUBLIC_URL}
            >
              <Image
                attrImage={{
                  className: "img-fluid for-light",
                  src: logoWhite,
                  alt: "looginpage",
                }}
              />
              <Image
                attrImage={{
                  className: "img-fluid for-dark",
                  src: logoDark,
                  alt: "looginpage",
                }}
              />
            </Link>
          </div>
          <div className="login-main">
            <Form className="theme-form login-form"  onSubmit={handleSubmit}>
              <H4>Create your account</H4>
              <P>Enter your personal details to create account</P>
              <FormGroup>
                <Label className="col-form-label m-0 pt-0">Your Name</Label>
                <Row className="g-2">
                  <Col xs="6">
                    <Input
                      className="form-control"
                      type="text"
                      required=""
                      name="firstName"
                      placeholder="Fist Name"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs="6">
                    <Input
                      className="form-control"
                      type="text"
                      required=""
                      placeholder="Last Name"
                      name="lastName"
                      onChange={handleChange}

                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup style={{ position: "relative" }}>
                <Label className="col-form-label m-0 pt-0">Email Address</Label>
                <div style={{ position: "relative" }}>
                  <Input
                    className="form-control button-in-input"
                    type="email"
                    required=""
                    placeholder="Test@gmail.com"
                    name="email"
                    onChange={handleChange}
                  />
                  <Button
                    className="get-opt-button"
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      height: "100%",
                    }}
                  >
                    Get Otp
                  </Button>
                </div>
              </FormGroup>

              <FormGroup className="position-relative">
                <Label className="col-form-label m-0 pt-0">Password</Label>
                <div className="position-relative">
                  <Input
                    className="form-control"
                    type={togglePassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="*********"
                    onChange={handleChange}
                  />
                  <div
                    className="show-hide"
                    onClick={() => setTogglePassword(!togglePassword)}
                  >
                    <span className={togglePassword ? "" : "show"}></span>
                  </div>
                </div>
              </FormGroup>
              <FormGroup className="position-relative">
                <Label className="col-form-label m-0 pt-0">
                  {" "}
                  Confirm Password
                </Label>
                <div className="position-relative">
                  <Input
                    className="form-control"
                    type={togglePassword ? "text" : "password"}
                    name="confirmPassword"
                    // required
                    placeholder="*********"
                    onChange={handleChange}
                  />
                  <div
                    className="show-hide"
                    onClick={() => setTogglePassword(!togglePassword)}
                  >
                    <span className={togglePassword ? "" : "show"}></span>
                  </div>
                </div>
              </FormGroup>

              <FormGroup className="position-relative">
                <Label className="col-form-label m-0 pt-0">
                  Referral ID
                </Label>
                <div className="position-relative">
                  <Input
                    className="form-control"
                    type="name"
                    name="referralID"
                    required
                    defaultValue={ref}
                    onChange={handleChange}
                  />

                </div>
              </FormGroup>
              <FormGroup className="position-relative">
                <Label className="col-form-label m-0 pt-0">
                  Referral Name
                </Label>
                <div className="position-relative">
                  <Input
                    className="form-control"
                    type="text"
                    name="referralName"
                    onChange={handleChange}

                  />

                </div>
              </FormGroup>
              <FormGroup className="position-relative">
                <Label className="col-form-label m-0 pt-0">
                  Wallet Address
                </Label>
                <div className="position-relative">
                  <Input
                    className="form-control"
                    type="text"
                    name="address"
                    required
                    onChange={handleChange}
                  />
                </div>
              </FormGroup>
              <FormGroup className="position-relative">
                <Label className="col-form-label m-0 pt-0">
                  Referral Address
                </Label>
                <div className="position-relative">
                  <Input
                    className="form-control"
                    type="text"
                    name="referBy"
                    required
                    onChange={handleChange}
                  />
                </div>
              </FormGroup>

              <FormGroup className="m-0">
                <div className="checkbox">
                  <Input id="checkbox1" type="checkbox" />
                  <Label className="text-muted" for="checkbox1">
                    Agree with <span>Privacy Policy</span>
                  </Label>
                </div>
              </FormGroup>
              <FormGroup>
                <Btn
                  attrBtn={{
                    className: "d-block w-100",
                    color: "primary",
                    type: "submit",
                  }}
                >
                  Create Account
                </Btn>
              </FormGroup>

              <P attrPara={{ className: "mb-0 text-start" }}>
                Already have an account?
                <Link
                  className="ms-2"
                  to={`${process.env.PUBLIC_URL}/login`}
                >
                  Sign in
                </Link>
              </P>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterFrom;