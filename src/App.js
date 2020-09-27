import React,{useState} from "react";
import Nav from "./Nav.js";
import LinkInfo from "./LinkInfo.js";
import RedirectComponent from "./RedirectComponent.js"
import { BrowserRouter as Router,Switch,Route } from "react-router-dom"; 
import Notiflix from "./notiflix.js"
function App(){
    return(
          <Router>
            <div>
              
              <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/info" exact component={LinkInfo}/>
                <Route path="/:id" exact component={RedirectComponent}/>
              </Switch>
            </div>
          </Router>
    );
}

export default App;

const Home=()=>{
  var techStackStyle={
   maxWidth:"18rem"
  } 
   var techStackUsedStyle={
   marginTop:"-18px"
  }

  var inputBoxStyle={
    width:"325px"
  }
  Notiflix.Notify.Init({ position:"right-bottom",useIcon:true, }); 
  const[originalLink, setOriginalLink]=useState('');

  const updateOriginalLink=(e)=>{
   setOriginalLink(e.target.value);
  }
  const generateShortLink= async()=>{
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    if(originalLink!="" && regex.test(originalLink)){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ link: originalLink })
      };
  
    const response = await fetch('https://api.ttnurl.tk/link/short', requestOptions);
    const data= await response.json();
  
    if (data!=undefined && data.shortenLink!=""){
  
      Notiflix.Report.Success(
        'Link Shorted Successfully',`Generated link is ${data.shortenLink}`,
        'done');
        setOriginalLink('');
    }else{
      Notiflix.Notify.Failure('Some error occurred. please try again');
    }
  }else{
    Notiflix.Notify.Failure('Please provide a valid link to short.');
    setOriginalLink('');
  }

  }
  return(
    <div>
    <Nav/>
    <div className="jumbotron">
    <h1 className="d-flex justify-content-center">TTN URL SHORTENER</h1>
    <p className="d-flex justify-content-center"> Paste any link to convert it into a short link</p>
    <p className="d-flex justify-content-center">
      <div className="form-row align-items-center">
      
      <div className="col-auto">
        <label className="sr-only" for="inlineFormInput">Name</label>
        <input type="url" className="form-control mb-2" id="linkInput" 
        style={inputBoxStyle} placeholder="https://www.example.com"
        onChange={updateOriginalLink} value={originalLink}
        />
      </div>

      <div class="col-auto">
        <button class="btn btn-primary mb-2"
        onClick={generateShortLink}
        >Generate</button>
      </div>
      
      </div>
    </p> 

   </div>   {/*jumbotron ends here */}
    <div>
      <p className="d-flex justify-content-center" style={techStackUsedStyle} >Tech Stack Used</p>
      <div className="row justify-content-center">
        <div className="col-md-4" style={techStackStyle}>
            <div className="card text-center  border-success bg-light mb-3" style={techStackStyle}> 
            <div className="card-body">
              <h5 className="card-title">React</h5>
              <p className="card-text">Frontend of this application is built on react which helps us in separating application concerns.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4" style={techStackStyle}>

            <div className="card text-center  bg-light border-success mb-3" style={techStackStyle}> 
            <div className="card-body">
              <h5 className="card-title">Spring Boot</h5>
              <p className="card-text">Backend is built using spring-boot(java) which exposes its api to be consumed by any client.</p>
            </div>
          </div>

        </div>
        <div className="col-md-4" style={techStackStyle}>

        <div className="card text-center  bg-light border-success mb-3" style={techStackStyle}> 
        <div className="card-body">
          <h5 className="card-title">Elastic Search</h5>
          <p className="card-text">Elastic search is the fastest search engine library and it is used to fetch and store the generated links.</p>
        </div>
      </div>

        </div>
        <div className="col-md-4" style={techStackStyle}>

        <div className="card text-center  bg-light border-success mb-3" style={techStackStyle}> 
        <div className="card-body">
          <h5 className="card-title">MySQL</h5>
          <p className="card-text">MySQL is used to log high level information about the links in our system like number of links in system.</p>
        </div>
      </div>
      

        </div>
      </div>
    </div>
    <div>
      <div className="row justify-content-center">
        <div className="col-md-4" style={techStackStyle}>
            <div className="card text-center  border-success bg-light mb-3" style={techStackStyle}> 
            <div className="card-body">
              <h5 className="card-title">Nginx Server</h5>
              <p className="card-text">Nginx server is open source web server which is used to host static website built on react.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4" style={techStackStyle}>

            <div className="card text-center  bg-light border-success mb-3" style={techStackStyle}> 
            <div className="card-body">
              <h5 className="card-title">Reverse Proxy</h5>
              <p className="card-text">As spring boot application runs on port different than 80 so using it to route request internally.</p>
            </div>
          </div>

        </div>
        <div className="col-md-4" style={techStackStyle}>

        <div className="card text-center  bg-light border-success mb-3" style={techStackStyle}> 
        <div className="card-body">
          <h5 className="card-title">SBAS</h5>
          <p className="card-text">SBAS is spring boot as a service, which makes service easy to start, stop and restart on deployment.</p>
        </div>
      </div>

        </div>
        <div className="col-md-4" style={techStackStyle}>

        <div className="card text-center  bg-light border-success mb-3" style={techStackStyle}> 
        <div className="card-body">
          <h5 className="card-title">SSL Certificate</h5>
          <p className="card-text">SSL Certificate is used to create an encrypted channel between client and server to prevent eavesdropping.</p>
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