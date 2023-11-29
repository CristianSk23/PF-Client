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
    <div className="pagination justify-content-center" style={{ marginTop: "60px" }}>
      <div className="row">
        <div className="col-sm">
          <select name="type" className="form-control text-center" style={{ width: '100%', textAlign: "center", margin: "5px" }} onChange={handleOpChange}>
            <option value="all" defaultValue="" disabled selected hidden>Category</option>
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
        <div className="col-sm">
          <select name="price" className="form-control text-center" style={{ width: '100%', textAlign: "center", margin: "5px" }} onChange={handleOpChange}>
            <option value="all" disabled selected hidden>Filter by Price</option>
            <option value="all" style={{textAlign:"center"}}>All Prices</option>
            <option value="100" style={{textAlign:"center"}}>Less than 100</option>
            <option value="300" style={{textAlign:"center"}}>Between 100 to 300</option>
            <option value="500">More than 300</option>
          </select>
        </div>
        <div className="col-sm">
          <select name="select" className="form-control text-center" style={{ width: '100%', textAlign: "center", margin: "5px" }} onChange={handleOrderByName}>
            <option value="all" disabled selected hidden>Sort by Name</option>
            <option value="A">Ascendant</option>
            <option value="D">Descendant</option>
          </select>
        </div>
        <div className="col-sm">
          <select name="select" className="form-control text-center" style={{ width: '100%', textAlign: "center", margin: "5px" }} onChange={handleOrderByPrice}>
            <option value="all" disabled selected hidden>Sort by Price</option>
            <option value="A">Max Price</option>
            <option value="D">Min Price</option>
          </select>
        </div>
      </div>
</div>
  );
};

export default FilterAndOrder;
    {/*<div >
      <div className="pagination justify-content-center" style={{marginTop: "70px"}}>
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
                              </div>*/}



