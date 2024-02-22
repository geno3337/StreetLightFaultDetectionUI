import axios from "axios";
import React from "react";

const url="http://localhost:8080/"
// const  getAllLightDetail=()=>{
//     return(axios.get(url+'getAllLightDetail'))
// }

const getAllLightDetail=(page,size,sortId,sortType,key)=>{
    return(axios.get(url+"getAllLightDetail?page="+page+"&size="+size+"&sort="+sortId+","+sortType+"&key="+key))
}

const addLightDetail=(requestBody)=>{
    return(axios.post(url+"createLightDetail",requestBody))
}

const Service={
    getAllLightDetail,
    addLightDetail
}

export default Service