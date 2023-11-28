import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, orderName, orderPrice, getProdCategories } from "../../redux/action/actions";

const FilterAndOrder = ({ setFilterCond, filterCond, setAux }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const prodCategories = useSelector((state) => state.prodCategories)||[];

  useEffect(() => {
    dispatch(filter(filterCond,name))
  },[filterCond])

  useEffect(() => {
    if (prodCategories.length === 0) {
      dispatch(getProdCategories());
    }
  }, []);

  const handleOpChange = async (event) => {
    event.target.name === "type" && setFilterCond({...filterCond, type: event.target.value});
    event.target.name === "price" && setFilterCond({...filterCond, price: event.target.value});
  }

  const handleOrderByPrice = (event) => {
    dispatch(orderPrice(event.target.value))
    setAux(true)
}

const handleOrderByName = (event) => {
  dispatch(orderName(event.target.value))
  setAux(true)
}

  return (
    <div >
      <div className="pagination justify-content-center" style={{marginTop: "15px"}}>
          <select name="type" className="form-control" style={{ width: '200px', textAlign:"center", margin:"5px" }} onChange={handleOpChange}>
          <option value="all" defaultValue="" disabled selected hidden>Filter by Category</option>
          <option value="all">All</option>
                                {prodCategories?.map((category) => {
                                  return (
                                    <option key={category.id} value={category.name}>
                                      {category.nameCat}
                                    </option>
                                  )                                  
                                })}
          </select>

          <select name="price" className="form-control" style={{ width: '200px', textAlign:"center", justifyContent: "center", margin:"5px" }} onChange={handleOpChange}>
            <option value="all" disabled selected hidden>Filter by Price</option>
            <option value="all">All</option>
            <option value="100">Less than 100</option>
            <option value="300">Between 100 to 300</option>
            <option value="500">More than 300</option>
          </select>

          <select name="select" className="form-control" style={{ width: '200px', textAlign:"center", margin:"5px" }} onChange={handleOrderByName}>
            <option value="all" disabled selected hidden>Sort By Name</option>
            <option value="A">Ascendant</option>
            <option value="D">Descendant</option>
          </select>

          <select name="select" className="form-control" style={{ width: '200px', textAlign:"center", margin:"5px" }} onChange={handleOrderByPrice}>
            <option value="all" disabled selected hidden>Sort by Price</option>
            <option value="A">Max Price</option>
            <option value="D">Min Price</option>
          </select>

          
        </div>
    </div>


  );
};

export default FilterAndOrder;
