import React, {useState, useEffect} from "react";
import ReactEcharts from "echarts-for-react";

const Calculator = () => {

    const selectValue = [{value: "AUD", name: "Australian Dollar"},
   {value: "BGN", name: "Bulgarian Lev"},
   {value: "BRL", name: "Brazilian Real"},
   {value: "CAD", name: "Canadian Dollar"},
   {value: "CHF", name: "Swiss Franc"},
   {value: "CNY", name: "Chinese Renminbi Yuan"},
   {value: "CZK", name: "Czech Koruna"},
   {value: "DKK", name: "Danish Krone"},
   {value: "EUR", name: "Euro"},
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

    const [inputAmount, setInputAmount] = useState(1);
    const [outputAmount, setOutputAmount] = useState(0);
    const [currencyRate, setCurrencyRate] = useState(1);
    const [inputCurrency, setInputCurrency] = useState("EUR");
    const [outputCurrency, setOutputCurrency] = useState("USD");
    const [historyData, setHistoryData] = useState([]);
    const [historyNames, setHistoryNames] = useState([]);

    useEffect(() => {
        calculate(inputAmount, currencyRate);
    },[inputAmount, currencyRate]);

    useEffect(() => {
        getCalculationRate(inputCurrency, outputCurrency);
        CalculatorHistory(inputCurrency,outputCurrency);
        calculate(inputAmount, currencyRate);
    },[inputCurrency]);

    useEffect(() => {
        getCalculationRate(inputCurrency, outputCurrency);
        CalculatorHistory(inputCurrency,outputCurrency);
        calculate(inputAmount, currencyRate);
    },[outputCurrency]);

    const handleAmountChange = (event) => {
        setInputAmount(event.target.value);
    }

    const handleInputChange = (event) => {
        setInputCurrency(event.target.value);
    }

    const handleOutputChange = (event) => {
        setOutputCurrency(event.target.value);
    }

    const API_URL = "https://api.frankfurter.app/";

    const option = {
        color: '#F3A953',
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
        },
        grid: {
            left: '10%',
            top: '5%',
            right: 6,
            bottom: 20
        },
        xAxis: {
            type: 'category',
            data: historyNames,
            nameTextStyle:{
                fontFamily: 'Roboto'
            },
            axisLine: {
                 lineStyle: {
                    color: '#FFF'
                    }
            }
        },
        yAxis: {
            type: 'value',
            min: function (value) {
                return value.min - (value.min * 0.02);
            },
            nameTextStyle: {
                fontFamily: 'Roboto'
            },
            axisLine: {
                lineStyle: {
                    color: '#FFF'
                }
            },
            axisLabel: {
                formatter: function (value, index) {

                    if(index === 0) {
                        value = "";
                    }
                    return value;
                }
            }
        },
        series: [
            {
                data: historyData,
                type: 'line',
            }
        ]
    };

    const calculate = (number, rate) => {
        let result = number * rate;
        setOutputAmount(result.toFixed(2));
    }

    const getCalculationRate = async (inputCur, outputCur) => {

        try {
            const response = await fetch(`${API_URL}latest?amount=1&from=${inputCur}&to=${outputCur}`);
            const data = await response.json();

            setCurrencyRate(data.rates[outputCurrency]);
        
            calculate(inputAmount, data.rates[outputCurrency]);
        }
        catch(err) {
            setOutputAmount(1);
        }
    };

    function CalculatorHistory(input, output) {

        const getHistory = async () => {

            try{
                let date = new Date();
                
                let year = date.getFullYear();
                year--;
            
                let month = date.getMonth();
                month++;
                
                if(month <10) {
                    month = "0" + month;
                }
                
                let day = date.getDate()

                if(day < 10) {
                    day = "0" + day; 
                }

                const response = await fetch(`${API_URL}${year}-${month}-${day}..?from=${input}&to=${output}`);
                const data = await response.json();

                let storageData = [];
                let storageNames = [];

                Object.keys(data.rates).forEach(function(key, index) {
                    
                    let storage = data.rates[key];

                    storageData[index] = storage[output];
                    storageNames[index] = key;

                    setHistoryData(storageData);
                    setHistoryNames(storageNames);
                });
            }
            catch(err) {
                
            }
        };
        getHistory();
    }

    return (
        <div id="calc">
            <div id="calculatorHistory">
                <div id="calcHistoryTop">
                    <h2>Wechselkursrechner</h2>
                </div>
                <div id="calcHistoryBottom">
                    <div className="calculator">
                        <div className="calculatorInput">
                            <input defaultValue={1} id="inputNumber" type="number" onChange={handleAmountChange}></input>
                            <select defaultValue={"EUR"} name="inputCurrency" id="inputCurrency" className="selectCurrency" onChange={handleInputChange}>
                                {selectValue.map((item, index) => (
                                    <option value={item.value} key={index} className="option">{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="calculatorOutput">
                            <p>{outputAmount}</p>
                            <select defaultValue={"USD"} name="outputCurrency" id="outputCurrency" className="selectCurrency" onChange={handleOutputChange}>
                                {selectValue.map((item, index) => (
                                    <option value={item.value} key={index} className="option">{item.name}</option>
                                ))}
                            </select>
                        </div> 
                    </div>
                    <div className="calcHistory">
                        <ReactEcharts className="calcHistoryGraph" option={option} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator;