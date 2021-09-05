//on 2nd no. this file is created.It acts as a container for other chile elements//
//router is used to navigate between various pages of website//
import{BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import ProductsPage from "./pages/ProductsPage";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import { CartContext } from "./CartContext";
import {useEffect, useState} from "react";
import {getCart,storeCart} from "./helpers";
import Login from "./pages/Login";


function App(){
    //creating set state to detect changes in cart//
    const [cart,setCart]=useState({});
    //fetch cart from local storage
    useEffect(()=>{
        getCart().then(cart=>{
            setCart(JSON.parse(cart));
        });
    },[]);
    
    //for watching updated set cart
    useEffect(()=>{
        storeCart(JSON.stringify(cart));
    },[cart]);

    return  (
        < >
            <Router>
                <CartContext.Provider value={{ cart,setCart }}>

                    <Navigation/>
                    <Switch>
                        <Route path="/" component={Home} exact></Route>  
                        <Route path="/products" exact component={ProductsPage}></Route>
                        <Route path="/products/:_id" component={SingleProduct}></Route>
                        <Route path="/cart" component={Cart}></Route>
                        <Route path="/login" component={Login}></Route>
                        
                    </Switch>
                </CartContext.Provider>
            </Router>

        </>
    )
}
export default App;