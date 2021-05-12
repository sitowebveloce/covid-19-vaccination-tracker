import axios from 'axios';
import React from 'react';

// Global store state
const GlobalStore = React.createContext();

// Define provider
export const ContextProvider = ({children})=>{
    // Local state
    const [state, setState] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    
    // USE EFFECT
    React.useEffect(()=>{
    // FETCH DATA FROM API
    let endPoint = 'https://sociepy.org/covid19-vaccination-subnational/data/api/v1/metadata.json';

    const fetchFunction = async endPoint =>{
        try{
            const res = await axios.get(endPoint);
            // console.log(res);
            if(res.status === 200){
                setTimeout(()=>{
                    setState(res.data);
                    setLoading(false);
                }, 1300);
            }
        }catch(error){
            console.log(error);
        }
    };
    // Run fetch
    fetchFunction(endPoint);

    },[]);
    
    // DEFINE CONTEXT OBJECT
    const contextObj = {state, loading}

    
    // RETURN
    return(
        <GlobalStore.Provider
        value={contextObj}
        >
            {children}
        </GlobalStore.Provider>
    )
};

// Export default
export default GlobalStore;
