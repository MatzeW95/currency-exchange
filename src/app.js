import React from "react";
import Header from "./component/header";
import Rates from "./component/rates";
import Calculator from "./component/calculator";
import History from "./component/history";

import "./style.css";

const App = () => { 
//img src <a href="https://www.freepik.com/free-vector/investor-with-laptop-monitoring-growth-dividends-trader-sitting-stack-money-investing-capital-analyzing-profit-graphs-vector-illustration-finance-stock-trading-investment_10173124.htm#query=financial%20illustration&position=0&from_view=search&track=ais">Image by pch.vector</a> on Freepik 
    return (
        <div className="app">
            <Header />
            <div id="hero">
                <div>
                    <h1>Currency Exchange</h1>
                    <p>
                        Willkommen auf unserer Webseite, die sich auf das Thema Wechselkurse spezialisiert hat. Hier finden Sie einen Währungsrechner und einen interaktiven Graphen, der die Historie von Wechselkursen darstellt.
                    </p>
                </div>
                <img id="heroImage" src={require('./hero.png')} />
            </div>
            <Rates />
            <Calculator />
            <History />
        </div>
    );
}
  
export default App;