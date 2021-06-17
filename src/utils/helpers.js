export const setUser  = (user) =>{
    return localStorage.setItem('user',JSON.stringify(user))
  } 
  
export const getUser  = () =>{
  return JSON.parse(localStorage.getItem('user'))
} 
