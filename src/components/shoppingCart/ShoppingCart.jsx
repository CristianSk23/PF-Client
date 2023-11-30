import { removeOneCart, increaseQuantity, decreaseQuantity } from "../../redux/action/actions"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const TotalPrice = () => {200}

const TotalCart = () => {500}

export const ShoppingCart = ({}) => {

 const dispatch = useDispatch();  

 const products = useSelector((state) => state.cart.items)
 
 useEffect(() => {
    console.log('Carrito actualizado:', products);
  }, [products]);

 const DeleteCart = (productsid) => {
    dispatch(removeOneCart(productsid))
 }

 const IncreaseQuantity = (productsid) => {
    dispatch(increaseQuantity(productsid))
 }

 const DecreaseQuantity = (productsid) => {
    dispatch(decreaseQuantity(productsid))
 }
  
 return(
 <div>
      
          <table className="table">
                <thead>
                    <tr>
                        <th>Products</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                {
                    products.map((item)=>{
                        return(
                            <tr>
                            <td><img src={item.image} style={{width:'100px',height:'80px'}}/></td>
                            <td>{item.price} $</td>  
                            <td>
                                    <span className="btn btn-primary" style={{margin:'2px'}} onClick={()=>DecreaseQuantity(item.id)}>-</span>
                                    <span className="btn btn-info">{item.quantity}</span>
                                    <span className="btn btn-primary" style={{margin:'2px'}} onClick={()=>IncreaseQuantity(item.id)}>+</span>
                            </td>
                            <td>{ TotalPrice(item.price,item.quantity)} $</td>
                            <button onClick={()=>DeleteCart(item.id)}>X</button>
                        </tr>
                        )
                    })
                        
                }
                <tr>
                    <td colSpan="5">Total Carts</td>
                    <td>{Number(TotalCart).toLocaleString('en-US')} $</td>
                </tr>
                </tbody>
              
            </table>
        
    </div>
    
    )}
        
    
