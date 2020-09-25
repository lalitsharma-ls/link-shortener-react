import React,{useState} from "react"; 
import Notiflix from "./notiflix.js"
import Nav from "./Nav.js";
function LinkInfo(){
  var techStackStyle={
    maxWidth:"18rem",
    minHeight:"150px"
   } 
    var techStackUsedStyle={
    marginTop:"-18px"
   }
 
   var inputBoxStyle={
     width:"325px"
   }
   var clickStyle={
    fontSize:"50px"
   } 
    var dateStyle={
    fontSize:"48px"
   }
   const [shortLink,setShortLink] = useState('');
   const [clickCount,setClickCount] = useState('NA');
   const [linkCreationTime,setLinkCreationTime] = useState('NA');
   const [linkExpireTime,setLinkExpireTime] = useState('NA');
   const [linkRefers,setLinkRefers] = useState('NA');
   Notiflix.Notify.Init({ position:"right-bottom",useIcon:true, }); 
   const updateShortLink=(e)=>{
     setClickCount('NA');
     setLinkCreationTime('NA');
     setLinkExpireTime('NA');
     setLinkRefers('NA');
     document.querySelector("#linkCreationTime").style.fontSize="48px";
     document.querySelector("#linkExpireTime").style.fontSize="48px";     
     document.querySelector("#linkRefers").style.fontSize="48px";
     document.querySelector("#linkRefers").classList.add("text-center");
     setShortLink(e.target.value);
   }

   const getLinkAnalytics= async()=>{
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

      if(shortLink!=="" && regex.test(shortLink)){
        const requestOptions = {
          method: 'GET'
        };
        let urlShortLinkId=shortLink.split('.tk/')[1];
        let url=`http://api.ttnurl.tk/info/${urlShortLinkId}`
        let response= await fetch(url,requestOptions);
        let data = await response.json();
        
        if(data!= undefined && data.analytics!= undefined){
          document.querySelector("#linkCreationTime").style.fontSize="42px";
          document.querySelector("#linkExpireTime").style.fontSize="42px";
  
          console.log(data);
          setClickCount(data.analytics.visits);
          setLinkCreationTime(data.analytics.linkCreationTime);
          setLinkExpireTime(data.analytics.linkExpirationTime); 
          if(data.analytics.refers.length>0){
            document.querySelector("#linkRefers").style.fontSize="14px";
            document.querySelector("#linkRefers").classList.remove("text-center");
            setLinkRefers(data.analytics.refers.map(r=>{return <li>{r}</li>}));
          }
        }else{
          Notiflix.Notify.Failure('Link not found. please try again');
        }
      }else{
        Notiflix.Notify.Failure('Please provide a valid link to check analytics');
      }

   }
   return(
     <div>
      <Nav/>
     <div className="jumbotron">
     <h1 className="d-flex justify-content-center">TTN URL SHORTENER</h1>
     <p className="d-flex justify-content-center"> Paste short link to check its analytics</p>
     <p className="d-flex justify-content-center">
       <div className="form-row align-items-center">
       
       <div className="col-auto">
         <label className="sr-only" for="inlineFormInput">Name</label>
         <input type="text" className="form-control mb-2" id="linkInput"
          style={inputBoxStyle} placeholder="https://www.ttnrul.tk/short"
          onChange={updateShortLink} value={shortLink}/>
       </div>
 
       <div class="col-auto">
         <button class="btn btn-primary mb-2"
         onClick={getLinkAnalytics}>Analyse</button>
       </div>
       
       </div>
     </p>
    </div>   {/*jumbotron ends here */}
     <div>
       <p className="d-flex justify-content-center"  >Link analytics</p>
       <div className="row justify-content-center">
         <div className="col-md-4" style={techStackStyle}>
             <div className="card text-center  border-success bg-light mb-3" style={techStackStyle}> 
             <div className="card-body">
               <h5 className="card-title">Total Clicks</h5>
   <p className="card-text" id="totalClick" style={clickStyle}> {clickCount}</p>
             </div>
           </div>
         </div>
         <div className="col-md-4" style={techStackStyle}>
 
             <div className="card text-center  bg-light border-success mb-3" style={techStackStyle}> 
             <div className="card-body">
               <h5 className="card-title">Creation Time</h5>
               <p className="card-text" id="linkCreationTime" style={dateStyle}>{linkCreationTime}</p>
             </div>
           </div>
 
         </div>
         <div className="col-md-4" style={techStackStyle}>
 
         <div className="card text-center  bg-light border-success mb-3" style={techStackStyle}> 
         <div className="card-body">
           <h5 className="card-title">Expiration Time</h5>
           <p className="card-text" id="linkExpireTime"style={dateStyle}>{linkExpireTime}</p>
         </div>
       </div>
 
         </div>
         <div className="col-md-4" style={techStackStyle}>
 
         <div className="card bg-light border-success mb-3" style={techStackStyle}> 
         <div className="card-body">
           <h5 className="card-title text-center">Traffic Source</h5>
           <p className="card-text text-center" id="linkRefers" style={dateStyle}>{linkRefers}</p>
         </div>
       </div>
       
 
         </div>
       </div>
     </div>
     <div className="footer">
       <p className="d-flex justify-content-center">Developed by Lalit Sharma | Software Engineer at tothenew</p>
     </div>
 </div>
   )
}

export default LinkInfo;