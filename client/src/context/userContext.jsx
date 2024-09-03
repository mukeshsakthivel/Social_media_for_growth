import React,{createContext,useState} from "react";

export const userContext=createContext();

export const UserProvider=({children})=>{
    const[userDetail,setuserDetail]=useState(null);

    return(
        <userContext.Provider value={{userDetail,setuserDetail}}>
            {children}
        </userContext.Provider>
    );
}
