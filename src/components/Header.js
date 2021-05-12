import React from 'react';
import Logo from '../assets/virus.svg';
import GlobalStore from '../stores/store'
import Loader from '../assets/vaccine.svg';
import Card from './Card';

const Header = () => {

// Global state
const gState = React.useContext(GlobalStore);
const {state, loading} = gState;
// console.log(state, loading);
// LOCAL STATE
const [lState, setLstate] = React.useState(state);
const [lCountry, setLcountry] = React.useState({});
// USE EFFECT
React.useEffect(()=>{
    if(state){
        setLstate(state);
    }
},[state])


// On Change Handler
const onChangeHandler = e =>{
    // console.log(e.target.value);
    let country = e.target.value;
    // Set Local State
    let showData = lState.find(c => c.country_name === country);
    // console.log(showData);
    setLcountry(showData);
};

    // RETURN
    return (
        <>
        <header>
            <div className="div-logo">
           <a href="/"> <img className='corona-logo' src={Logo} alt="logo" /></a>
            <h1>COVID-19 WVS</h1>
            </div>

            <div className="hero">
            <small>Covid-19 World Vax Status</small>
            
            {loading ? <div className="loader-div">
            <img className='loader-img' src={Loader} alt="loader" />
            </div> :
            <div className='div-selector'>
                <select
                onChange={onChangeHandler}
                className='country-selector'
                >
                <option value='0'>Select Country</option>
                {
                    lState.map(c=>(
                        <option key={(new Date().toISOString() + (Math.random() * .2))} value={c.country_name}>{c.country_name}</option>
                    ))
                }
                </select>
      
            </div>
            }
            </div>
        </header>
         {/* CARD  */}
        <Card country = {lCountry} />
        </>
    )
}

export default Header
