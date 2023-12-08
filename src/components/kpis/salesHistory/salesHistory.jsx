import orders from '../../../assets/orderData' //ELIMINAR CUANDO SE TENGA LA INFO DE LAS ORDENES EN STATE
import calculateData from './claculateData';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BarGraphics from '../../BarGraphic/BarGraphic';
import LineGraph from '../../LineGraph/LineGraph';
import { getProdCategories } from '../../../redux/action/actions';
import { Link } from "react-router-dom";

const SalesHistory = () =>{
    // const orders = useSelector((state)=> state.orders)
    const prodCategories = useSelector((state) => state.prodCategories);
    const [filter, setFilter] = useState({year:"all", month:"all"})
    const [graphData, setGraphData] = useState({yearBarData:{}, monthBarData:{}, lineData:{}, itemsData:[], years:[] })
    const dispatch = useDispatch();
    const monthsText = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

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

    useEffect(() => {
        const fetchData = async () => {
            if (prodCategories.length === 0) {

                dispatch(getProdCategories());
            }

            setGraphData(calculateData(orders, filter));
        };
    
        fetchData();
    }, [filter]);
    

    return(
        <div>

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
            
            <div className="col-sm">
                {graphData.yearBarData.datasets?.length > 0 ? (
                <BarGraphics data={graphData?.yearBarData} />
                ) : (
                <p>Loading Line Chart...</p>
                )}
            </div>

            <div className="col-sm">
                {graphData.monthBarData.datasets?.length > 0 ? (
                <BarGraphics data={graphData?.monthBarData} />
                ) : (
                <p>Loading Bar Chart...</p>
                )}
            </div>

            <div className="col-sm">
                {graphData.lineData.datasets?.length > 0 ? (
                <LineGraph data={graphData?.lineData} />
                ) : (
                <p>Loading Line Chart...</p>
                )}
            </div>

            <div className="col-sm">
                <h3>Raw Data totals: {}</h3>
                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Month</th>
                        <th>Day</th>
                        <th>Category</th>
                        <th>ProductName</th>
                        <th>Quantity</th>
                        <th>UnitPrice</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {graphData.itemsData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.Year}</td>
                        <td>{item.Month}</td>
                        <td>{item.Day}</td>
                        <td>{item.Category}</td>
                        <td>
                        <Link
                        to={`/detail/${item.Id}`}
                        style={{ textDecoration: "none", color: "black" }}
                        >
                        {item.ProductName}
                        </Link>     
                        </td>
                        <td>{item.Quantity}</td>
                        <td>${item.UnitPrice}</td>
                        <td>${item.Quantity*item.UnitPrice}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

        </div>
    )

}

export default SalesHistory;