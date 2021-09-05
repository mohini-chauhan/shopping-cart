import { Link } from "react-router-dom";
import { useContext,useState } from "react";
import { CartContext } from "../CartContext";

const Product = (props) => {
    const [isAdding,setIsAdding] = useState(false); 
     

    /*to obtain the value of product obtained from products destructuring the object(props) */
    const {product}=props;
    const {cart,setCart}=useContext(CartContext);
    
        const addToCart=(event,product)=>{
            //to prevent event to propogate to new page
            event.preventDefault();
            let _cart={...cart}; //_cart conatins empty object
            if(!_cart.items){
                _cart.items={}
            }
            if(_cart.items[product._id]){
                _cart.items[product._id]+=1;
            }else{
                _cart.items[product._id]=1;
            }
            if(!_cart.totalItems){
                _cart.totalItems=0;
            }
            _cart.totalItems+=1;
            setCart(_cart);
            setIsAdding(true);
            setTimeout(()=>{
                setIsAdding(false);
            }, 1000); 
        }
        return (
            <Link to={`/products/${product._id}`}>
                <div>
                    <img className=" rounded-md w-56 h-44" src={product.image} alt="Kiwi-Juice"/>
                    <div className="text-center">
                        <h2 className="text-lg font-boldpy-2">{product.name}</h2>
                        <span className=" py-1 px-4 text-sm rounded-full bg-gray-200">{product.size}</span>
                    </div>
                    <div className=" mx-5 flex items-center justify-between mt-4">
                        <span>₹{product.price}</span>
                        <button disabled={isAdding} onClick={(e)=> {addToCart(e,product)}} className= {`${isAdding ? 'bg-red-400': 'bg-yellow-500' } py-1 px-4 rounded-full font-bold`}>ADD{isAdding ? "ED" : ""}</button>
                    </div>
                        
                </div>
            </Link>
        )
}

export default Product;
