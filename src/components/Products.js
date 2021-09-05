//product of components//
import Product from "./Product";
/*importing hook(useState) to keep state inside the component */
import {useState,useEffect} from "react";


const Products = () => {
    
    /*syntax for using useState.....useState returns an array which contains two elements*/
    const [products,setProducts] = useState([]);
    useEffect (() => {
        /*Requesting server via fetch */
        fetch('/api/products')
        .then(response=>response.json())
        .then(products=>{
            setProducts(products);
        });

    }, []);

        return (
                    <div className="container mx-auto pb-24 ">
                        <h1 className="text-4xl font-bold my-8 text-center">Products {}</h1>
                        <div className="grid grid-cols-5 my-8 gap-24">
                            {
                                /*to prevent manual wrting of <Product/> we are running a loop */
                                products.map(product => <Product key={product._id} product={product}/>)
                            }
                        
                        </div>
                    </div>
            
                )
}

export default Products
