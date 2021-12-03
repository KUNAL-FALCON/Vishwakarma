import React from 'react';

import '../css/navbar.css'


const Navbar = () => {
    return(
        <>
            <div className = "w3-top w3-center">
                <div className="w3-row w3-padding w3-black w3-center">
                    <div className = "w3-col s2 Navbar">
                        <a href = "http://localhost:3000/" className="w3-button w3-block w3-black">Home</a>
                    </div>
                    <div className = "w3-col s2">
                        <a href = "http://localhost:3000/About" className="w3-button w3-block w3-black">About Corona</a>
                    </div>
                    <div className = "w3-col s2">
                        <a href = "http://localhost:3000/IvsC" className="w3-button w3-block w3-black">India Fights Corona</a>
                    </div>
                    <div className = "w3-col s2">
                        <a href = "http://localhost:3000/Vaccine" className="w3-button w3-block w3-black">Get Vaccine</a>
                    </div>
                    <div className = "w3-col s2">
                        <a href = "http://localhost:3000/Contact" className="w3-button w3-block w3-black">Priority List</a>
                    </div>
                    </div>
            </div>
        </>
    )
}
export default Navbar;