import React from "react";
import './Header.css';

function Header({label}) {
    return (
    <div>
        <h1 className="header">{label}</h1>
    </div>
    );
}
export default Header;