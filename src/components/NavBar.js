import React from 'react'
import { NavLink } from 'react-router-dom'
import { getDataElements } from '../utils/APIUtils'
import './NavBar.css'
export default function NAvBar() {
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
                            <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboards/:id">Dashboards</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Program Indicators
                              </NavLink>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <NavLink className="dropdown-item" to="#">Action</NavLink>
                                <NavLink className="dropdown-item" to="#">Another action</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item" to="#">Something else here</NavLink>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Data Elements
                              </NavLink>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <NavLink className="dropdown-item" to="#">Action</NavLink>
                                <NavLink className="dropdown-item" to="#">Another action</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item" to="#">Something else here</NavLink>
                            </div>
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