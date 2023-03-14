import React, {useState, useEffect} from "react";
import ReactEcharts from "echarts-for-react";

const API_URL = "https://api.frankfurter.app/latest";

const currencyListNames = ["GBP", "CHF", "USD", "CAD", "AUD"];

const Rates = () => {
    const [rates, setRates] = useState([]);
    const [rateNames, setRateNames] = useState([]);

    useEffect(() => {
        getRates();
    }, []);

    const getRates = async () => {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();


        let counter = 0;
        let storageRates = [];
        let storagesRateNames = [];

        for(let i = 0; i < currencyListNames.length; i++) {
            
            Object.keys(data.rates).forEach(function(key) {
                
                if(key === currencyListNames[counter]) {
                    storageRates[counter] = data.rates[key].toFixed(2);
                    storagesRateNames[counter] = key;

                    counter++;
                } 
            })
        }
        setRates(storageRates);
        setRateNames(storagesRateNames);
    };
    
    const labelOption = {
        show: true,
        rotate: 0,
        formatter: '{c}',
        fontSize: 16,
        rich: {
          name: {}
        }
      };

    const option = {
        grid: {
            left: 20,
            top: 0,
            right: 0,
            bottom: 20
        },
        xAxis: {
            type: 'category',
            data: rateNames,
            nameTextStyle:{
                fontFamily: 'Roboto'
            },
            axisLine: {
                 lineStyle: {
                    color: '#000'
                    }
            }
        },
        yAxis: {
            show: false
        },
        series: [
            {
                data: rates,
                type: 'bar',
                label: labelOption,
                itemStyle: {
                    color:"#366ED8",
                    borderWidth: 2,
                    borderType: 'solid',
                    borderColor: '#366ED8'
                  }
            }
        ],
        animationEasing: 'circularIn'
    };

    return (
        <div id="rates">
            <div className="ratesText">
                <h2>Wechselkurs</h2>
                <p>
                    Der Wechselkurs des Euros (EUR) zu anderen Währungen wie dem US-Dollar (USD), dem Britischen Pfund (GBP), dem Australischen Dollar (AUD), dem Kanadischen Dollar (CAD) und dem Schweizer Franken (CHF) kann sich täglich ändern und hängt von verschiedenen Faktoren ab, wie beispielsweise der Wirtschaftslage, politischen Entwicklungen oder Zinssätzen.
                </p>
            </div>
            <ReactEcharts className="ratesChart" option={option} />
        </div>
    );
}

export default Rates;