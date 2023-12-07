import orders from '../../../assets/orderData' //ELIMINAR CUANDO SE TENGA LA INFO DE LAS ORDENES EN STATE
import calculateData from './claculateData';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PieChart from '../../PieChart/PieChart';
import BarGraphics from '../../BarGraphic/BarGraphic';
import { getProdCategories } from '../../../redux/action/actions';
import { Link } from "react-router-dom";

const SalesByCategory = () =>{
    // const orders = useSelector((state)=> state.orders)
    const prodCategories = useSelector((state) => state.prodCategories);
    const [filter, setFilter] = useState({year:"all", category:"all"})
    const [graphData, setGraphData] = useState({pieData:[], barData:[], uniqueYears:[], filteredItems:[] })
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setFilter((prevFilter) => ({
          ...prevFilter,
          [event.target.name]: event.target.value,
        }));
      
        let { pieData, barData, uniqueYears, filteredItems } = calculateData(orders, {
          ...filter,
          [event.target.name]: event.target.value,
        });
        setGraphData({ pieData, barData, uniqueYears, filteredItems});
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
            <select name="category" defaultValue="all" className="form-control text-center" style={{ width: '100%', textAlign: "center", margin: "5px" }} onChange={handleChange}>
                <option value="all" disabled hidden>Category</option>
                <option value="all">All Categories</option>
                {prodCategories?.map((category) => {
                return (
                    <option key={category.id} value={category.nameCat} name={category.nameCat} style={{textAlign:"center"}}>
                    {category.nameCat}
                    </option>
                )
                })}
            </select>
            </div>
            <div className="col-sm">
                <select name="year" defaultValue="all" className="form-control text-center" style={{ width: '100%', textAlign: "center", margin: "5px" }} onChange={handleChange}>
                    <option value="all" disabled hidden>Year</option>
                    <option value="all">All years</option>
                    {graphData.uniqueYears?.map((year, index) => {
                    return (
                        <option key={index} value={year} name={year} style={{textAlign:"center"}}>
                        {year}
                        </option>
                    )
                    })}
                </select>
            </div>
            <div className="col-sm">
                {graphData.pieData.datasets?.length > 0 ? (
                <PieChart data={graphData?.pieData} />
                ) : (
                <p>Loading Pie Chart...</p>
                )}
            </div>
            <div className="col-sm">
                {graphData.barData.datasets?.length > 0 ? (
                <BarGraphics data={graphData?.barData} />
                ) : (
                <p>Loading Bar Chart...</p>
                )}
            </div>

            <div className="col-sm">
                <h3>Raw Data</h3>
                <table className="table table-bordered">
                <thead>
                    <tr>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {graphData.filteredItems.map((item, index) => (
                    <tr key={index}>
                        <td>
                        <Link
                        to={`/detail/${item.itemId}`}
                        style={{ textDecoration: "none", color: "black" }}
                        >
                        {item.itemName}
                        </Link>     
                        </td>
                        <td>{item.itemPrice}</td>
                        <td>{item.itemQuantity}</td>
                        <td>{item.itemQuantity * item.itemPrice}</td>
                        <td>{item.orderDate}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

        </div>
    )

}

export default SalesByCategory;