import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../store/auth-context'
import AddAd from './AddAd'
import SearchAds from './SearchAds';


var host = "https://localhost:";
var port = "44352/";
var adsEndpoint = "api/oglasi/";

const Ads = () => {
    const authCtx = useContext(AuthContext)
    const [ads, setAds] = useState([])
    const [addedAd, setAddedAd] = useState(false)
    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()
    const [searchActive, setSearchActive] = useState(false)

    useEffect(() => {
        if (searchActive) {
            var searchEndPoint = "api/pretraga"
            var requestUrl = host + port + searchEndPoint
            console.log("URL zahteva: " + requestUrl);
            var headers = {};
            if (authCtx.token) {
                headers.Authorization = 'Bearer ' + authCtx.token;
            }
            headers["Content-Type"] = 'application/json'
            console.log(headers);
            fetch(requestUrl, { method: 'POST', headers: headers, body: JSON.stringify({
                "najmanje": minPrice,
                "najvise": maxPrice}
            ) })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(data => setAds(data));
                } else {
                    console.log("Error occured with code " + response.status);
                }
                setSearchActive(prev => !prev)
            })
            .catch(error => console.log(error));
        }else{

            setAddedAd(false)
            var requestUrl = host + port + adsEndpoint;
            console.log("URL zahteva: " + requestUrl);
            var headers = {};
            if (authCtx.token) {
                headers.Authorization = 'Bearer ' + authCtx.token;
            }

            fetch(requestUrl, { headers: headers })
                .then((response) => {
                    if (response.status === 200) {
                        response.json().then(data => setAds(data));
                    } else {
                        console.log("Error occured with code " + response.status);
                    }
                })
                .catch(error => console.log(error));
        }
    }       , [addedAd, minPrice, maxPrice])

    const addedAdHandler = () => {
        setAddedAd(true)
    }

    const minPriceHandler = (enteredMinPrice) => {
        setMinPrice(enteredMinPrice)
    }

    const maxPriceHandler = (enteredMaxPrice) => {
        setMaxPrice(enteredMaxPrice)
    }

    const activateSearchHandler = () => {
        setSearchActive(true)
    }


    const handleDeleteAdd = (id) => {
        var requestUrl = host + port + adsEndpoint + id;
        var headers = {}
        if (authCtx.token) {
            headers.Authorization = 'Bearer ' + authCtx.token;
        }
        console.log(requestUrl);
        fetch(requestUrl, { method: "DELETE", headers: headers })
            .then((response) => {
                if (response.status === 200) {
                    alert("Brisanje uspesno izvrseno!")
                    setAddedAd(true)
                } else {
                    console.log("Error occured with code " + response.status);
                    alert("Doslo je do greske!");
                }
            })
            .catch(error => console.log(error));
    }

  return (
    <div>
        {authCtx.isLogged && <SearchAds onSearch={activateSearchHandler} onMin={minPriceHandler} onMax={maxPriceHandler}/>}
        <h2>Oglasi za nekretnine</h2>
        <table border="1">
            <thead>
                <tr>         
                    <th>Naslov</th>
                    <th>Cena</th>
                    <th>Tip nekretnine</th>
                    <th>Agencija</th>
                    {authCtx.isLogged &&
                        <>
                            <th>Godina izgradnje</th>
                            <th>Akcija</th>
                        </>
                    }
                </tr> 
            </thead>
            <tbody>
                {ads.map(ad => {
                    
                    return (
                        <tr key={ad.id}>
                            <td>{ad.name}</td>
                            <td>{ad.estatePrice}</td>
                            <td>{ad.estateType}</td>
                            <td>{ad.agencyName}</td>
                            {authCtx.isLogged &&
                                <>
                                    <td>{ad.yearConstructed}</td>
                                    <td><button onClick={() => handleDeleteAdd(ad.id)}>Obrisi</button></td>
                                </>
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
        {authCtx.isLogged && <AddAd onAdd={addedAdHandler} />}
    </div>
  )
}

export default Ads