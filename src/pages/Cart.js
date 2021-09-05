import {useContext,useEffect,useState} from "react";
import {CartContext} from "../CartContext";
import { useHistory } from "react-router-dom";

const Cart = () => {
  const history = useHistory()

  const routeChange = () =>{ 
    let path = '/products'; 
    history.push(path);
  }
  let total=0;
  const[products,setProducts]=useState([]);
  const {cart,setCart}= useContext(CartContext);
  const [priceFetched,togglePriceFetched]=useState(false);
  //for calling server using productID 
  useEffect(() => {
    if(!cart.items){
      return;
    }
    if(priceFetched){
      return;
    }
    fetch("/api/products/cart-items",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({ids: Object.keys(cart.items)})
    }).then(res=>res.json())
      .then(products=>{
        setProducts(products);
        togglePriceFetched(true);
 
      })
  }, [cart,priceFetched]);

  //quantity of items
  const getQty=(productId)=>{
    return cart.items[productId];
  }
  //increment button
  const increment=(productId)=>{
    //storing old quantity of cart in a variable
    const existingQty=cart.items[productId];
    const _cart={...cart};
    _cart.items[productId]=existingQty+1;
    _cart.totalItems+=1;
    setCart(_cart);
    
  }
  //Decrement button
  const decrement=(productId)=>{
    //storing old quantity of cart in a variable
    const existingQty=cart.items[productId];
    //to not allow the decrement in -ve values
    if (existingQty === 1){
      return;
    }
    const _cart={...cart};
    _cart.items[productId]=existingQty-1;
    _cart.totalItems-=1;
    setCart(_cart);
    
  }
  const getSum=(productId,price)=>{
    const sum = price * getQty(productId);
    total+=sum;
    return sum;
  }

  //delete function
  const handleDelete=(productId)=>{
    const _cart ={...cart};
    const qty=_cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems-=qty;
    setCart(_cart);
    //to filter out the deleted product
    setProducts(products.filter((product)=>product._id !== productId));
  }

  const handleOrderNow =()=>{
    window.alert('Order placed successfully!');
    setProducts([]);
    setCart({});
  }
  

    return (
      
      !products.length
        ?<div className="flex items-center mt-12">
        <div className="container text-center w-80  mx-auto">
          <h1 className="font-bold  text-3xl py-4">Your Cart Is Empty</h1>
          <img className="my-4 p-8" src="/images/emptyCart.png" alt="emptycart"/>
          <button  onClick={routeChange} className="bg-yellow-500 font-bold rounded-full py-2 px-4 my-4 leading-none ">Shop Now</button>
        </div>
        </div>
        
        :
        <div className="container mx-auto lg:w-1/2 w-full pb-24">
          <h1 className="my-12 font-bold">Cart Items</h1>
          <ul>
            {
              products.map(product=>{
                return(
                  
                  <li className="mb-12" key={product._id}>
                    <div  className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img className="h-16" src={product.image} alt=""/>
                        <span className="font-bold ml-4 w-48">{product.name}</span>
                      </div>
                      <div className="flex items-center ">
                        <button onClick={()=>{decrement(product._id)}} className="bg-yellow-500 font-bold rounded-full py-2 px-4 leading-none">-</button>
                        <b className=" font-bold px-4">{getQty(product._id)}</b>
                        <button onClick={()=>{increment(product._id)}} className="bg-yellow-500 font-bold rounded-full py-2 px-4 leading-none">+</button>
                      </div>
                      <span>₹{getSum(product._id,product.price)}</span>
                      <button onClick={()=>{handleDelete(product._id)}} className="bg-red-500 rounded-full font-bold leading-none py-2 px-4 text-white">Delete</button>
                    </div>
                  </li>


                )
              })
            }
      
          </ul>
          <hr className="my-6"/>
          <div className="text-right">
            <b>Grand Total</b>: ₹{total}
          </div>
          <div className="text-right mt-6">
            <button onClick={handleOrderNow} className="bg-yellow-500 font-bold rounded-full py-2 px-4 leading-none ">Order Now</button>
          </div>
        </div>
       
        
    )
}

export default Cart;
