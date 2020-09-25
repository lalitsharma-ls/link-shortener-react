import React,{useEffect,useState} from "react";
import {Redirect,useParams} from "react-router-dom";

function RedirectComponent(){


    let { id } = useParams();
     const [location,setLocation]=useState('');
    useEffect(()=>{
        redirectFunction();
    })

    const redirectFunction =async ()=>{
        if(id=="info"){
            return <Redirect to='/info' />
        }else{

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ linkId: id,referrer:document.referrer })
              };
            let url='http://api.ttnurl.tk/expand/'
            let response = await fetch(url,requestOptions);
            let data= await response.json();
            window.location.href=data.originalLink!==undefined?data.originalLink:"ttnurl.tk";
            
        }
    }


    return(
    <div></div>
       
    )
}

export default RedirectComponent;