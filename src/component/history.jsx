import React, {useEffect, useState} from "react";
import ReactEcharts from "echarts-for-react";
import { graphic } from 'echarts';

const History = () => {

    const API_URL = "https://api.frankfurter.app/";

    const selectValue = [{value: "AUD", name: "Australian Dollar"},
   {value: "BGN", name: "Bulgarian Lev"},
   {value: "BRL", name: "Brazilian Real"},
   {value: "CAD", name: "Canadian Dollar"},
   {value: "CHF", name: "Swiss Franc"},
   {value: "CNY", name: "Chinese Renminbi Yuan"},
   {value: "CZK", name: "Czech Koruna"},
   {value: "DKK", name: "Danish Krone"},
   {value: "GBP", name: "British Pound"},
   {value: "HKD", name: "Hong Kong Dollar"},
   {value: "HUF", name: "Hungarian Forint"},
   {value: "IDR", name: "Indonesian Rupiah"},
   {value: "ILS", name: "Israeli New Sheqel"},
   {value: "INR", name: "Indian Rupee"},
   {value: "ISK", name: "Icelandic Króna"},
   {value: "JPY", name: "Japanese Yen"},
   {value: "KRW", name: "South Korean Won"},
   {value: "MXN", name: "Mexican Peso"},
   {value: "MYR", name: "Malaysian Ringgit"},
   {value: "NOK", name: "Norwegian Krone"},
   {value: "NZD", name: "New Zealand Dollar"},
   {value: "PHP", name: "Philippine Peso"},
   {value: "PLN", name: "Polish Złoty"},
   {value: "RON", name: "Romanian Leu"},
   {value: "SEK", name: "Swedish Krona"},
   {value: "SGD", name: "Singapore Dollar"},
   {value: "THB", name: "Thai Baht"},
   {value: "TRY", name: "Turkish Lira"},
   {value: "USD", name: "United States Dollar"},
   {value: "ZAR", name: "South African Rand"}];

    const [historyData, setHistoryData] = useState([]);
    const [historyNames, setHistoryNames] = useState([]);
    const [input, setInput] = useState("USD");

    const handleInputChange = (event) => {
        setInput(event.target.value);
    }

    const option = {
        color: '#064ACB',
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
        },
        grid: {
            left: '5%',
            top: '10%',
            right: 0,
            bottom: '30%'
        },
        toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none',
                iconStyle: {
                    BorderColor: "green"
                }
              }
            }
        },
        xAxis: {
            type: 'category',
            data: historyNames,
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
            type: 'value',
            nameTextStyle:{
                fontFamily: 'Roboto'
            },
            axisLine: {
                 lineStyle: {
                    color: '#000'
                    }
            }
        },
        dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 100
            }
        ],
        series: [
            {
                data: historyData,
                type: 'line',
                areaStyle: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#064ACB'
                      },
                      {
                        offset: 1,
                        color: '#366ED8'
                      }])
                  }
            }
        ]
    };

    useEffect(() => {
        getHistoryData("USD");
    },[]);

    useEffect(() => {
        getHistoryData(input);
    },[input]);

    const getHistoryData = async (currency) => {

        try {
            const response = await fetch(`${API_URL}1999-01-04..?to=${currency}`);
            const data = await response.json();

            let storage = 0;
            let storageData = [];
            let storageNames = [];

            Object.keys(data.rates).forEach(function(key, index) {
                    
                storage = data.rates[key];

                storageData[index] = storage[currency];
                storageNames[index] = key;

                setHistoryData(storageData);
                setHistoryNames(storageNames);
            });
        }
        catch(err) {
            
        }
    };

    return (
        <div id="history">
            <h2>Historischer Verlauf</h2>
            <div className="historyInputDiv">
                <select defaultValue={"USD"} name="inputHistoryCurrency" id="inputHistoryCurrency" className="selectHistoryCurrency" onChange={handleInputChange}>
                    {selectValue.map((item, index) => (
                        <option value={item.value} key={index} className="option">{item.name}</option>
                    ))}
                </select>
                <p>
                    im Vergleich zum Euro
                </p>
            </div>
            <ReactEcharts className="historyGraph" option={option} />
        </div>
    );
}

export default History;