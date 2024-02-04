import React, { Fragment, useEffect, useState } from "react";
import { Btn, H4 } from "../../../../AbstractElements";
import { useForm } from "react-hook-form";
import './EditProfile.css'
import { Row, Col, CardHeader, CardBody, CardFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { EditProfile, Company, Username, UsersCountryMenu, AboutMe, UpdateProfile, FirstName, LastName, Address, EmailAddress, PostalCode, Country, City } from '../../../../Constant';
import { getUserDetails, updateProfile } from "../../../../api/integrateConfig";
// import  {useAccount } from 'wagmi';
import Swal from 'sweetalert2';

const EditMyProfile = ({setNameOfUser,setImagePath }) => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [formData,setFormdata] = useState({
        name:"",
        profilePicture:"",
        email:"",
        mobileNumber:""
    })

    // const { address} = useAccount();   
    const address = localStorage.getItem("address");


    const onEditSubmit = async (e) => {
        try{
        e.preventDefault();
        // alert(data)
        const token = localStorage.getItem("authToken")
        const updateIt = await updateProfile(formData , token);
        Swal.fire({
            icon:"success",
            title:"SUCCESSFULL",
            text:"Successfully edited profile",
          })

        }catch(error){

            console.log(`error in try catch block in the uodate profile section in handlesubmit : ${error.message}`)
        }
    }

    useEffect(()=>{               // new addition
        const fetchUserDetails = async()=>{
                // const accounts = await window.ethereum.request({ method : 'eth_requestAccounts'});
                // const userAddress = accounts[0];
                console.log(`user address is : ${address}`)
                try{
                const data = {address : localStorage.getItem("address")};
                const token = localStorage.getItem("authToken");
                const response = await getUserDetails(data, token);
                
                        // localStorage.setItem("userID" , response.userData.userId);
                        // console.log(`storage from the loacl storage is : ${localStorage.getItem("userID")}`)
                
                setFormdata({...response.userData})
                setNameOfUser(response.userData.name);
                setImagePath(response.userData.profilePicture);
                console.log(response)
                }catch(error){
                    // alert(`You have been logged out! Please log back in again`)
                    console.log(`error in getuserdetails when in Fnd : ${error.message}`)
                }
        }
        
        fetchUserDetails();
    }, [address]) 
    return (
        <Fragment>
            <Form className="card" onSubmit={onEditSubmit}>
                <CardHeader>
                    <H4 attrH4={{ className: "card-title mb-0" }}>{EditProfile}</H4>
                    <div className="card-options">
                        <a className="card-options-collapse" href="#javascript">
                            <i className="fe fe-chevron-up"></i>
                        </a>
                        <a className="card-options-remove" href="#javascript">
                            <i className="fe fe-x"></i>
                        </a>
                    </div>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col sm="6" md="6">
                            <FormGroup> <Label className="form-label" style={{ color: '#BEBFC2' }}>Username</Label>
                                <Input style={{ color: '#BEBFC2' }}  className="form-control" type="text" placeholder="Username" value={formData.name} onChange={(e)=>setFormdata((prev)=>({...prev,name:e.target.value}))}  /><span style={{ color: "red" }}>{errors.Username && 'Username is required'} </span>
                            </FormGroup>
                        </Col>


                        <Col sm="6" md="6">
                            <FormGroup><Label className="form-label" style={{ color: '#BEBFC2' }}>
                                {/* {EmailAddress} */}
                                User ID
                            </Label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="User ID"
                                    {...register("userId", { required: true })}
                                    value={formData.userId}
                                    readOnly
                                />
                                <span style={{ color: "red" }}>{errors.EmailAddress && ' User ID is required'} </span>
                            </FormGroup>
                        </Col>

                        <Col sm="6" md="6">
                            <FormGroup className="mb-3"><Label className="form-label" style={{ color: '#BEBFC2' }}>
                                {/* {Company} */}
                                Photo
                            </Label>
                                <Input className="form-control" type="file" placeholder="profilePicture" onChange={(e)=>setFormdata((prev)=>({...prev,profilePicture:e.target.files[0]}))} /><span style={{ color: "red" }}>{errors.company && 'Photo is required'} </span>
                            </FormGroup>
                        </Col>

                      

                        {/* USer name */}
                        {/* <Col sm="6" md="6">


                            <FormGroup><Label style={{ color: '#BEBFC2' }} className="form-label">
                                Sponser Name
                            </Label>
                                <Input className="form-control" type="text" placeholder="Sponser Name" {...register("Address", { required: true })} /><span style={{ color: "red" }}>{errors.Address && 'Sponser Name is required'} </span>
                            </FormGroup>
                        </Col> */}
                        <Col sm="6" md="6">
                            {/*  */}

                            <FormGroup><Label className="form-label" style={{ color: '#BEBFC2' }}>
                                {/* {City} */}
                                Email ID
                            </Label>
                                <Input className="form-control" type="Email ID" placeholder="Email ID" value={formData.email} onChange={(e)=>setFormdata((prev)=>({...prev,email:e.target.value}))} /><span style={{ color: "red" }}>{errors.City && 'Email ID is required'} </span>
                            </FormGroup>
                        </Col>
                        <Col sm="6" md="6">


                            <FormGroup><Label style={{ color: '#BEBFC2' }} className="form-label">
                                {/* {Address} */}
                                Mobile No.
                            </Label>
                                <Input className="form-control" type="text" placeholder="Mobile No." value={formData.mobileNumber} onChange={(e)=>setFormdata((prev)=>({...prev,mobileNumber:e.target.value}))} /><span style={{ color: "red" }}>{errors.Address && 'Mobile No. is required'} </span>
                            </FormGroup>
                        </Col>
                        <Col sm="6" md="6">


                            <FormGroup><Label style={{ color: '#BEBFC2' }} className="form-label">
                                {/* {Address} */}
                                Address
                            </Label>
                                <Input className="form-control" value={address} readOnly type="text" placeholder="Address" {...register("Address", { required: true })} /><span style={{ color: "red" }}>{errors.Address && 'Address is required'} </span>
                            </FormGroup>
                        </Col>

                      
                        {/* <Col sm="6" md="4">
                            <FormGroup><Label className="form-label" style={{color:'#BEBFC2'}}>{City}</Label>
                                <Input className="form-control" type="text" placeholder="City" {...register("City", { required: true })} /><span style={{ color: "red" }}>{errors.City && 'City is required'} </span>
                            </FormGroup>
                        </Col> */}
                        {/* <Col sm="6" md="3">
                            <FormGroup><Label className="form-label">{PostalCode}</Label>
                                <Input className="form-control" type="number" placeholder="ZIP Code" />
                            </FormGroup>
                        </Col>
                        <Col md="5">
                            <FormGroup><Label className="form-label">{Country}</Label>
                                <Input type="select" name="select" className="form-control btn-square">
                                    {UsersCountryMenu.map((items, i) =>
                                        <option key={i}>{items}</option>
                                    )}
                                </Input>
                            </FormGroup>
                        </Col> */}
                        {/* <Col md="12">
                            <div><Label className="form-label" style={{color:'#BEBFC2'}}>{AboutMe}</Label>
                                <Input type="textarea" className="form-control" rows="5" placeholder="Enter About your description" />
                            </div>
                        </Col> */}
                    </Row>
                </CardBody>
                <CardFooter className="text-end" style={{display:'flex', gap:'10px', justifyContent:'flex-end'}}>
                    <div  className="Edit-button">
                        {/* {UpdateProfile} */}
                        Edit
                        </div>
                        <Button attrBtn={{ color: "primary", type: "submit" }} >
                        {/* {UpdateProfile} */}
                        Submit
                        </Button>
                </CardFooter>
            </Form>
        </Fragment>
    )
}
export default EditMyProfile