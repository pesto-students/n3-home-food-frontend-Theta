import {React} from "react";



const Image = ({url,height,width}) => {
  return (        
       <img 
        height={height}
        style={{backgroundPosition:'center'}}
        width={width}
        alt="not found"
        src={url}/>

  );
}

export default Image;
 