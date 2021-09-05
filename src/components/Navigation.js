import {Link} from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../CartContext";

const Navigation = () => {
    //object for cartstyling//
    const cartStyle = {
    background:'#e86100',
    display:'flex',
    padding:'6px 12px',
    borderRadius:'50px'
    }
    const {cart} = useContext(CartContext);

    return (
        <>
            <nav className="container mx-auto flex items-center justify-between py-5">
                {/*for adding logo*/}
                <Link to="/">
                    <img style={{height:40}} src="/images/juiceland.png" alt="favicon"/>
                </Link>
                {/*for adding menu */}
                <ul  className="flex items-center">
                    <li ><Link to="/">Home</Link></li>
                    <li className="ml-6"><Link to="/products">Products</Link></li>
                    <li className="ml-6"><Link to="/login">Login</Link></li>
                    <li className="ml-6">
                        <Link to="/cart">
                            <div style={cartStyle}>
                                <span>{cart.totalItems ? cart.totalItems :0}</span>
                                <img className="ml-2" style={{height:26}} src="/images/cart.png" alt="cart-icon"/>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navigation
