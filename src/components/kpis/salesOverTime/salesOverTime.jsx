import data from '../../assets/orderData'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SalesOverTime = () =>{
    const [filter, setFilter] = useState({year:"", category:""})

    return(
        <div>
            <div className="col-sm">
            <select name="year" defaultValue="all" className="form-control text-center" style={{ width: '100%', textAlign: "center", margin: "5px" }} onChange={handleOpChange}>
                <option value="all" disabled hidden>Category</option>
                <option value="all">All Categories</option>
                {prodCategories?.map((category) => {
                return (
                    <option key={category.id} value={category.name} style={{textAlign:"center"}}>
                    {category.nameCat}
                    </option>
                )
                })}
            </select>
            </div>
        </div>
    )

}

export default SalesOverTime;