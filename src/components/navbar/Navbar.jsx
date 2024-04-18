import React from 'react'
import "./navbar.css"
//Đã check
const Navbar = ({ title }) => {
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className='titleText'>
                    <p>{title}</p>
                </div>
            </div>
        </div>
    )
}
export default Navbar