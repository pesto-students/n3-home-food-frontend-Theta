import {React} from "react";



const Image = ({url,height,width,radius}) => {
  return (        
       <img 
        height={height}
        style={{backgroundPosition:'center',borderRadius:radius}}
        width={width}
        alt="not found"
        src={url}/>

  );
}

export default Image;
 