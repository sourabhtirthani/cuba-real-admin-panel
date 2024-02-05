import { axiosBase } from "./config";


export const createAccount = async(data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            console.log(`in the axios function `)
            const response = await axiosBase.post('api/admin/profile/create', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            resolve(response.data);

        }catch(error){
            console.log(`error in create account : ${error.message}`);
            reject(error)
        }
    })
}


export const getUserDetails = async(data, token)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const response = await axiosBase.get(`api/admin/details/${data.address}`, {
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });
            resolve(response.data);
        }catch(error){
            console.log(`error in get user details function intergrate config : ${error.message}`);
            reject(error)
        }
    })
};

export const updateProfile = async(data, token)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            // console.log(`the data in update profile in axios is ${data}`)
            //updated code
            // console.log(data)
            const formData = new FormData();
            formData.append("address" , data.address);
            formData.append("name",data.username);
            formData.append("email",data.email);
            formData.append("transactionHash" , data.transactionHash);
            formData.append("profilePicture" , data.profilePicture);
            formData.append("mobileNumber" , data.mobileNumber);

            const response = await axiosBase.patch('api/admin/profile/update' , data  , {
                headers : {
                    'Content-Type': 'multipart/form-data',  //multipart
                    'Authorization': token
                },
            });
            console.log(`response recieved from the user is : ${response.data}`)
            resolve(response.data);
        }catch(error){
            console.log(`error in uodate profile in integrate api : ${error.message}`);
            reject(error);
        }
    })
}


export const fetchSlot = async(data1, token)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const response = await axiosBase.post('api/admin/fetchSlots' , data1 ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            } );
            resolve(response.data);
        }catch(error){
            reject(error);
        }
    })
}

export const fetchPackage = async(data, token)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const response = await axiosBase.post('api/admin/fetchPackages' , data , {
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization': token
                }
            });
            resolve(response.data)
        }catch(error){
            reject(error);
        }
    })
}


export const fetchUsersList = async(data1, token)=>{
    return new Promise(async(resolve , reject)=>{
        try{
            const response = await axiosBase.get(`api/admin/allusers?startDate=${data1.startDate}&endDate=${data1.endDate}` , {
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization': token
                }
            })
            resolve(response.data);
        }catch(error){
            console.log(`error in fetch user list in axios config : ${error.message}`);
            reject(error)
        }
    })
}


export const fetchAllActivities = async(token)=>{
    return new Promise(async(resolve , reject)=>{
        try{
            // const token = localStorage.getItem("authToken")
            console.log(`the token is ${token}`)
            const response = await axiosBase.get(`api/admin/activities/all` , {
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization': token
                }
            });
            resolve(response.data);

        }catch(error){
            console.log(`error in fetch all activities in axios config : ${error.message}`)
            reject(error);
        }
    })
}


export const loginAdmin = async(data1)=>{
    return new Promise(async(resolve , reject)=>{
        try{
            const response = await axiosBase.post(`api/admin/profile/login` , data1 , {
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            resolve(response.data);
        }catch(error){
            console.log(`error in login admin in axios : ${error.message}`)
            reject(error);
        }
    })
}

export const sendAnnouncement = async(data1, token)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            // const token = localStorage.getItem("authToken")
            const response = await axiosBase.post(`api/admin/announcements` , data1 , {
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization': token
                }
            })
            resolve(response.data);
        }catch(error){
            console.log(`error in sending announcement in axios  : ${error.message}`);
            reject(error);
        }
    })
}


export const fetchAllIncomeInfo = async(data1)=>{
    return new Promise(async(resolve , reject)=>{
        try{
            const response = await axiosBase.get(`/api/activities/dashboard/${data1.address}`, {
                headers : {
                    'Content-Type' : 'application/json',
                }
            });
            resolve(response.data);

        }catch(error){
            console.log(`error in fetch all income info : ${error.message}`);
        }
    })
}



export const fetchAllIncomeTransaction = async(token)=>{
    return new Promise(async(resolve , reject)=>{
        try{
            const response = await axiosBase.get(`/api/admin/incomes` , {
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization': token
                }
            })
                resolve(response.data);
        }catch(error){
            console.log(`error in fetch all income transaction in axios : ${error.message}`);
            reject(error)
        }
    })
}