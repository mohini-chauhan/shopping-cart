import * as yup from "yup";
//schema representing a object once the object is submitted
export  const userSchema =yup.object().shape({
     name    :yup.string().required(),
     email   :yup.string().email().required(),
     password:yup.string().min(4).max(10).required(),
 });