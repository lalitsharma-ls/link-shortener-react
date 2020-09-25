import React from "react"; 
import {Link} from "react-router-dom";
function Nav(){

  var style={
    marginRight:"5px"
  };
    return( 
<nav className="navbar navbar-inverse">
  <div className="container-fluid">
    <div className="navbar-header">
      <span className="navbar-brand"><Link to="/">TTNURL.TK</Link></span>
    </div> 
    <div className="nav  navbar-right">
      <span style={style}><Link to="/info">Link Analytics |</Link></span>
      <span style={style}><a href="https://github.com/lalitsharma-ls" target="_blank"> Get Code @Github</a></span>
    </div>
  </div>
</nav>
    );
}

export default Nav;