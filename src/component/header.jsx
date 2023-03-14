import React from "react";

const Header = () => {
    return (
        <div className="header">
            <a href="#hero" id="headerHeadline">
                Currency Exchange
            </a>
            <div id="headerNavContainer">
                <a href="#rates" className="navItem">Wechselkurs</a>
                <a href="#calculatorHistory" className="navItem">Wechselkursrechner</a>
                <a href="#history" className="navItem">Historischer Verlauf</a>
            </div>
        </div>
    );
}

export default Header;