
import calculateData from './claculateData';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BarGraphics from '../../BarGraphic/BarGraphic';
import LineGraph from '../../LineGraph/LineGraph';
import { getProdCategories, allOrders } from '../../../redux/action/actions';
import { Link } from "react-router-dom";

const SalesHistory = () =>{
    const orders = useSelector((state)=> state.orderHistoryCache);
    const prodCategories = useSelector((state) => state.prodCategories);
    const [filter, setFilter] = useState({year:"all", month:"all"})
    const [graphData, setGraphData] = useState({yearBarData:{}, monthBarData:{}, lineData:{}, itemsData:[], years:[] })
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
            if (prodCategories.length === 0) {
                dispatch(getProdCategories());
                dispatch(allOrders());
            }
            setGraphData(calculateData(orders, filter));
        };
    
        fetchData();
    }, [dispatch, orders]);


    const handleChange = (event) => {
        setGraphData({yearBarData:{}, monthBarData:{}, lineData:{}, itemsData:[], years:[] })
        setFilter((prevFilter) => ({
          ...prevFilter,
          [event.target.name]: event.target.value,
        }));

        let {yearBarData, monthBarData, lineData, itemsData, years } = calculateData(orders, {
          ...filter,
          [event.target.name]: event.target.value,
        });
        setGraphData({ yearBarData, monthBarData, lineData, itemsData, years});
    };

    

    return(
        <div>
        <div className="row">
            <div className="col-sm">
                <select name="year" defaultValue="all" className="form-control text-center" style={{ width: '100%', textAlign: "center", margin: "5px" }} onChange={handleChange}>
                    <option value="all" disabled hidden>Year</option>
                    <option value="all">All years</option>
                    {graphData.years?.map((year, index) => {
                    return (
                        <option key={index} value={year} name={year} style={{textAlign:"center"}}>
                        {year}
                        </option>
                    )
                    })}
                </select>
            </div>
        </div> 

        <div className='row'>
            <div className="col-sm">
                {graphData.yearBarData.datasets?.length > 0 ? (
                <BarGraphics data={graphData?.yearBarData} />
                ) : (
                <p>Loading Line Chart...</p>
                )}
            </div>

            <hr />

            <div className="col-sm">
                {graphData.monthBarData.datasets?.length > 0 ? (
                <BarGraphics data={graphData?.monthBarData} />
                ) : (
                <p>Loading Bar Chart...</p>
                )}
            </div>

            <hr />

            <div className="col-sm">
                {graphData.lineData.datasets?.length > 0 ? (
                <LineGraph data={graphData?.lineData} />
                ) : (
                <p>Loading Line Chart...</p>
                )}
            </div>
        </div>

        <div className='row'>
            <div className="col-sm">
                <h3>Raw Data totals: {}</h3>
                <div className="table-responsive">
                    <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th style={{textAlign:"center"}}>Year</th>
                            <th style={{textAlign:"center"}}>Month</th>
                            <th style={{textAlign:"center"}}>Day</th>
                            <th style={{textAlign:"center"}}>Category</th>
                            <th style={{textAlign:"center"}}>ProductName</th>
                            <th style={{textAlign:"center"}}>Quantity</th>
                            <th style={{textAlign:"center"}}>UnitPrice</th>
                            <th style={{textAlign:"center"}}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {graphData.itemsData.map((item, index) => (
                        <tr key={index}>
                            <td style={{textAlign:"center"}}>{item.Year}</td>
                            <td style={{textAlign:"center"}}>{item.Month}</td>
                            <td style={{textAlign:"center"}}>{item.Day}</td>
                            <td style={{textAlign:"center"}}>{item.Category}</td>
                            <td style={{textAlign:"center"}}>
                            <Link
                            to={`/detail/${item.Id}`}
                            >
                            {item.ProductName}
                            </Link>     
                            </td>
                            <td style={{textAlign:"center"}}>{item.Quantity}</td>
                            <td style={{textAlign:"center"}}>${item.UnitPrice}</td>
                            <td style={{textAlign:"center"}}>${item.Quantity*item.UnitPrice}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    )

}

export default SalesHistory;