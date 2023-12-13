import adminDataCalcs from './adminDataCalc';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProdCategories, allOrders } from "../../redux/action/actions";
import styles from "./homeAdmin.module.css"

const HomeAdmin=()=>{
    const orders = useSelector((state)=> state.orderHistoryCache);
    const prodCategories = useSelector((state) => state.prodCategories);
    const [filter, setFilter] = useState({year:"all", month:"all"});
    const [graphData, setGraphData] = useState({topUsers:[], 
                                                topProducts:[], 
                                                topQuantityProducts:[], 
                                                mostSoldCategory:{}, 
                                                bestMonth:{}, 
                                                averageOrderValue:0,
                                                orderYears:[],
                                                monthNames:[]
    })
    const dispatch = useDispatch();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    useEffect(() => {
        const fetchData = async () => {
            if (prodCategories.length === 0) {
                dispatch(getProdCategories());
                dispatch(allOrders());
            }
            setGraphData(adminDataCalcs(orders, filter))
        };
        fetchData();
    }, [dispatch, orders]);


    const handleChange = (event) => {
        setGraphData({topUsers:[], 
                    topProducts:[], 
                    topQuantityProducts:[], 
                    mostSoldCategory:{}, 
                    bestMonth:{}, 
                    averageOrderValue:0,
                    orderYears:[]
        })
        setFilter((prevFilter) => ({
          ...prevFilter,
          [event.target.name]: event.target.value,
        }));
      
        let { topUsers, topProducts, topQuantityProducts, mostSoldCategory, bestMonth, averageOrderValue, orderYears } = adminDataCalcs(orders, {
          ...filter,
          [event.target.name]: event.target.value,
        });
        setGraphData({topUsers, topProducts, topQuantityProducts, mostSoldCategory, bestMonth, averageOrderValue, orderYears});
      };

    return(
    <div>
        <h5>Year and Month filters:</h5>
        <div className="row">
            <div className="col-sm">
                <select name="year" defaultValue="all" className="form-control text-center" style={{ width: '100%', textAlign: "center", margin: "5px" }} onChange={handleChange}>
                    <option value="all" disabled hidden>Year</option>
                    <option value="all">All years</option>
                    {graphData.orderYears?.map((year, index) => {
                    return (
                        <option key={index} value={year} name={year} style={{textAlign:"center"}}>
                        {year}
                        </option>
                    )
                    })}
                </select>
            </div>

            <div className="col-sm">
                <select name="month" defaultValue="all" className="form-control text-center" style={{ width: '100%', textAlign: "center", margin: "5px" }} onChange={handleChange}>
                    <option value="all" disabled hidden>Month</option>
                    <option value="all">All months</option>
                    {monthNames.map((month, index) => {
                    return (
                        <option key={index} value={month} name={month} style={{textAlign:"center"}}>
                        {month}
                        </option>
                    )
                    })}
                </select>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-12">
                <h5 style={{marginTop:"35px"}}>General Information:</h5>
                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className={styles.th} style={{width:"33.33%"}}>Average Order Value</th>
                        <th className={styles.th} style={{width:"33.33%"}}>Best month</th>
                        <th className={styles.th} style={{width:"33.33%"}}>Best Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={styles.td}>${graphData.averageOrderValue?.toFixed(0)}</td>
                        <td className={styles.td}>{graphData.bestMonth?.name}  ${graphData.bestMonth?.amount?.toFixed(0)}</td>
                        <td className={styles.td}>{graphData.mostSoldCategory?.name}  ${graphData.mostSoldCategory?.amount?.toFixed(0)}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>

        <div className="row">
            <div className="col-sm">
                <h5 style={{marginTop:"35px"}}>Top 5 Clients/Users:</h5>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className={styles.th} style={{width:"50%"}}>User</th>
                            <th className={styles.th} style={{width:"50%"}}>Spent amount</th>
                        </tr>
                    </thead>
                    <tbody>
                    {graphData.topUsers?.map((user, index)=>{
                        return (
                            <tr key={index}>
                                <td className={styles.td}>{user.userName}</td>
                                <td className={styles.td}>${user.total?.toFixed(0)}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
 
            <div className="col-sm">
                <h5 style={{marginTop:"35px"}}>Top 5 Products by Sales Amount:</h5>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className={styles.td} style={{width:"50%"}}>Product Name</th>
                            <th className={styles.td} style={{width:"50%"}}>Total sell</th>
                        </tr>
                    </thead>
                    <tbody>
                    {graphData.topProducts?.map((prod, index)=>{
                        return (
                            <tr key={index}>
                                <td className={styles.td}>{prod.nameProd}</td>
                                <td className={styles.td}>${prod.total?.toFixed(0)}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
      

            <div className="col-sm">
                <h5 style={{marginTop:"35px"}}>Top 5 Products by Units Sale:</h5>
                <table className="table table-bordered">
                <thead>
                    <tr>
                    <th className={styles.td} style={{width:"50%"}}>Product Name</th>
                    <th className={styles.td} style={{width:"50%"}}>Total sell</th>
                    </tr>
                </thead>
                <tbody>
                {graphData.topQuantityProducts?.map((prod, index)=>{
                    return (
                        <tr key={index}>
                            <td className={styles.td}>{prod.nameProd}</td>
                            <td className={styles.td}># {prod.quantity}</td>
                        </tr>
                    )
                })}
                </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

export default HomeAdmin;