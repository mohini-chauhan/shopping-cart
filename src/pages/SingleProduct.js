/*useParams is a hook used to extract id from url */
import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom";

const SingleProduct = () => {
    const [product,setProduct] = useState({});
    const params = useParams();
    const history=useHistory();



    /*sending request to server via obtained id*/
    useEffect(() => {
       fetch(`/api/products/${params._id}`)
       /*obtained response getting converted to json format  */
       .then(res => res.json())
       /*Saving the response of server in local state */
       .then(product =>{
           setProduct(product);
        })
    }, [params._id]);

        return (
            <div className="container mx-auto mt-12">
                <button className="mb-12 font-bold "onClick={() => {history.goBack()}}>Back</button>
                <div className="flex">
                    <img src={product.image} alt="pizza"/>
                    <div className="ml-16">
                        <h1 className="text-xl font-bold">{product.name}</h1>
                        <div className="text-md ">{product.size}</div>
                        <div className="font-bold mt-2">₹{product.price}</div>
                        <button className="bg-yellow-500 rounded-full py-1 px-8 font-bold mt-4 ">Add to cart</button>
                    </div>
                </div>
            </div>
        )
}

export default SingleProduct;

