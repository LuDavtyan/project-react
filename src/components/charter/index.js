import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
import { useParams } from "react-router-dom";

const Charter = () => {
    const [options, setOptions] = useState(null);
    const params = useParams();

    useEffect(() => {
        const url = `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=3`
        fetch(url)
            .then((response) => {
                return response.json()
            }).then(result => {
                const {prices} = result
                const model = {
                    chart: {
                      type: 'spline'
                    },
                    title: {
                      text: params.id.toLocaleUpperCase()
                    },
                    series: [
                      {
                        data: prices.map(item => item[1])
                      }
                    ]
                  }
                  setOptions(model)
            })
    }, [])

    return (
        <div>
            {
                options && <HighchartsReact 
                highcharts={Highcharts}
                options={options}
                />
            }
        </div>
    )
};

export default Charter;
