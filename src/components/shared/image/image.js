import {React} from "react";
import logo from "../../../images/logo.png"



const Image = ({url,height,width,radius}) => {

const onError = (e) =>{
 e.target.src = logo
}

  return (        
       <img 
        height={height}
        style={{backgroundPosition:'center',borderRadius:radius}}
        width={width}
        onError={onError}
        alt="not found"
        src={url}/>

  );
}

export default Image;
 