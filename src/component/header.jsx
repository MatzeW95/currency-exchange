import React from "react";

const Header = () => {

    function handleMenuOpen() {
        document.getElementById("headerNavContainerMobile").style.visibility = "visible";
    }

    function handleMenuClose() {
        document.getElementById("headerNavContainerMobile").style.visibility = "hidden";
    }

    return (
        <div className="nav">
            <div className="header">
                <a href="#hero" id="headerHeadline">
                    Currency Exchange
                </a>
                <div id="headerNavContainer">
                    <a href="#rates" className="navItem">Wechselkurs</a>
                    <a href="#calc" className="navItem">Wechselkursrechner</a>
                    <a href="#history" className="navItem">Historischer Verlauf</a>
                </div>
                <img src={require("../hamburgerMenu.png")} className="burgerMenu" onClick={handleMenuOpen}></img>
            </div>
            <div id="headerNavContainerMobile">
                <img src={require("../hamburgerMenu.png")} className="burgerMenu" id="burgerMenuClose" onClick={handleMenuClose}></img>
                <div id="headerContainerMobile">
                    <a href="#rates" className="navItemMobile" onClick={handleMenuClose}>Wechselkurs</a>
                    <a href="#calc" className="navItemMobile" onClick={handleMenuClose}>Wechselkursrechner</a>
                    <a href="#history" className="navItemMobile" onClick={handleMenuClose}>Historischer Verlauf</a> 
                </div>
            </div>
        </div>
    );
}

export default Header;