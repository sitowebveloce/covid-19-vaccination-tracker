import React from 'react'
import axios from 'axios';
import Loader from '../assets/bacteria.svg';

const Card = ({country}) => {
    // Local State
    const [coutryName, setCountryName] = React.useState(country.country_name)
    const [state, setState] = React.useState({});
    const [loading, setLoading ] = React.useState(true)

      // FETCH FUNCTION
      const fetchFunction = async url =>{
        try{
            const res = await axios.get(url);
            // console.log(res);
            if(res.status === 200){
                setTimeout(()=>{
                    setState(res.data.data);
                    setLoading(false);
                }, 1300);
            }
        }catch(error){
            console.log(error);
        }
    };
    
    // USE EFFET<
    React.useEffect(()=>{
        if(coutryName !== country.country_name){
            setCountryName(country.country_name);
            setLoading(true);
            setState({});
            // Fetch vax data
            setTimeout(() => {
                fetchFunction(country.api_url_latest);
            }, 600);
        }
    }, [country, coutryName])
 

    // THOUSANDS SEPARATOR
    function thousandsCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // RETURN
    return (
        <div className='card'>
        
        {loading ? <div className="loader-div">
            <img className='loader-img-2' src={Loader} alt="loader" />
            </div> : 
            <div>
                {state ?
                <div>
                <div> <strong>Start Date : </strong>{country.first_update} </div>
                <div> <strong>Stop Date : </strong>{country.last_update} </div>
                <div className='card-country-name'><strong> {country.country_name} </strong></div>
                <div className='card-country-iso'><img className='flag' alt='flag' src={`https://www.countryflags.io/${country.country_iso}/flat/64.png`} /> <strong>{country.country_iso}</strong> </div>

                
               { state.map(c => (
                    <div key={(new Date().toISOString() + (Math.random() * .2))} className='card-inner'>
                        
                        <div className='region_date'>Date: <strong>{c.date}</strong></div>
                        <div className='region_name'>Region: <strong>{c.region_name}</strong></div>
                        <div className='total_vax'>Total Vax: <strong>{thousandsCommas(c.total_vaccinations)}</strong></div>
                        <div className='total_perc'>Percentage : <strong>{thousandsCommas(c.total_vaccinations_per_100)} %</strong></div>
                        
                    </div>
                )) }

                </div>
                :
                 'No Data'}
                 
            </div>
        }
        </div>
    )
}

export default Card
