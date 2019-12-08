import React from 'react'
import { NavLink } from 'react-router-dom'
import { getDataElements } from '../utils/APIUtils'
import './NavBar.css'
export default function NAvBar(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <NavLink className="navbar-brand" to="#">WEB PORTAL</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/">{props.dash1} <span className="sr-only"></span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dash2">{props.dash2}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dash3">{props.dash3}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dash4">{props.dash4}</NavLink>
                        </li>



                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" id="searchButton" type="submit" onClick={load}>Search</button>
                    </form>
                </div>
            </nav>
        </div >
    )
}

const load = (event) => {
    event.preventDefault()
    const data = getDataElements()
}