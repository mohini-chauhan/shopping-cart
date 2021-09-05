//at very first this file is created to render the elements in roo that is why it is known as main entry point of react//
import ReactDom from "react-dom";
import "./index.css"
import App from "./App";

//render method is present inside reactdom//
ReactDom.render(
   <App/>,
    document.getElementById("root")
);