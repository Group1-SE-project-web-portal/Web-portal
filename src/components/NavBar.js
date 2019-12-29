import React from "react";
import { NavLink } from "react-router-dom";
import { getDataElements } from "../utils/APIUtils";
import { Button } from "reactstrap";
import "./NavBar.css";
import IconButton from "@material-ui/core/IconButton"
import dhs2logo from "../components/dhis2-icon-rgb-positive.png"
export default function NAvBar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <NavLink className="navbar-brand" to="#">
          <IconButton>
            <img src ={dhs2logo} alt="Home" width="35" height="35"/>
          </IconButton>
          WEB PORTAL
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

<<<<<<< HEAD
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/"><Button onClick={props.loadDash1}>{props.dash1}</Button> <span className="sr-only"></span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dash2"><Button onClick={props.loadDash2}>{props.dash2}</Button></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dash3"><Button onClick={props.loadDash3}>{props.dash3}</Button></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dash4"><Button onClick={props.loadDash4}>{props.dash4}</Button></NavLink>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" id="searchButton" type="submit" >Search</button>
                    </form>
                </div>
            </nav>
        </div >
    )
}
=======
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                <Button onClick={props.loadDash1}>{props.dash1}</Button>{" "}
                <span className="sr-only"></span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dash2">
                <Button onClick={props.loadDash2}>{props.dash2}</Button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dash3">
                <Button onClick={props.loadDash3}>{props.dash3}</Button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dash4">
                <Button onClick={props.loadDash4}>{props.dash4}</Button>
              </NavLink>
            </li>
            <search />
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              id="searchButton"
              type="submit"
              onClick={load}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

const load = event => {
  event.preventDefault();
  const data = getDataElements();
};
>>>>>>> 9f6ac559daaa299b3083fbafd0b3c3120c946391
