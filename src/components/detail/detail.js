import React, { useEffect, useState } from "react";
import { getCurrencyURL } from "../../core/urls";
import { renderChangePercent } from "../../core/helpers";
import './detail.css';
import Loading from "../loading/loading";
import { useParams } from "react-router-dom";
import Charter from "../charter";

const Detail = () => {
    const [currency, setCurrency] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isShowCharter, setIsShowCharter] = useState(false);
    const params = useParams();

    useEffect(() => {
        const url = getCurrencyURL(params.id)
        setIsLoading(true)
        fetch(url)
            .then((response) => {
                if (response.status === 200 || response.ok) {
                    return response.json()
                }
                throw new Error();
            }).then(result => {
                setIsLoading(false);
                setCurrency(result[0])
            }).catch((err) => {
                setIsLoading(false);
                setError(err.message)
            })
    }, [])

   const handleToggleCharter = () =>{
    setIsShowCharter(prev => !prev)
   }

    if (error) {
        return <div>Error</div>
    }
    if (isLoading) {
        return <div className="loading-container"><Loading /></div>
    }
    return (
        <>
        {isShowCharter && <Charter/>}
        <div className="Detail">
            <h1 className="Detail-heading">
                <img 
                src={currency.image}  
                onClick={handleToggleCharter}
                />
                {currency.name} ({currency.symbol})
            </h1>
            <div className="Detail-container">
                <div className="Detail-item">
                    Price
                    <span className="Detail-value">
                        $ {currency.current_price}
                    </span>
                </div>
            </div>
            <div className="Detail-container">
                <div className="Detail-item">
                    Rank
                    <span className="Detail-value">
                        {currency.market_cap_rank}
                    </span>
                </div>
            </div>
            <div className="Detail-container">
                <div className="Detail-item">
                    Price Change Percentage 24h
                    <span className="Detail-value">
                        {renderChangePercent(
                            currency.price_change_percentage_24h
                        )}
                    </span>
                </div>
            </div>
            <div className="Detail-container">
                <div className="Detail-item">
                    24H Change
                    <span className="Detail-value">
                        $ {currency.price_change_24h}
                    </span>
                </div>
            </div>
            <div className="Detail-container">
                <div className="Detail-item">
                    <span className="Detail-title">Market cap</span>
                    <span className="Detail-dollar">$</span>
                    {currency.market_cap}
                </div>
            </div>
            <div className="Detail-container">
                <div className="Detail-item">
                    <span className="Detail-title">Total supply</span>
                    {currency.total_supply}
                </div>
            </div>
        </div>
        </>
    )
}
export default Detail