import React, { useState, useContext, useEffect, useRef } from 'react'
import AuthContext from '../store/auth-context'


const AddAd = (props) => {
    
    const authCtx = useContext(AuthContext)
    var host = "https://localhost:";
    var port = "44352/";
    var agenciesEndpoint = "api/agencije";
    var adsEndpoint = "api/oglasi"

    const [agencies, setAgencies] = useState([])
    const [agencyId, setAgencyId] = useState()

    const nameRef = useRef('')
    const estateTypeRef = useRef('')
    const yearConstructedRef = useRef('')
    const estatePriceRef = useRef('')

    useEffect(getDataForDropdown, [])

    const submitAdHandler = (event) => {
        event.preventDefault()
        const name = nameRef.current.value
        const estateType = estateTypeRef.current.value
        const yearConstructed = yearConstructedRef.current.value
        const estatePrice = estatePriceRef.current.value
        var requestUrl = host + port + adsEndpoint;
        var headers = {};
        if (authCtx.token) {
            headers.Authorization = 'Bearer ' + authCtx.token;
        }
        headers["Content-Type"] = 'application/json'
        console.log(headers)
        var sendData = {"name": name, "estateType": estateType, "yearConstructed": yearConstructed, 
                        "estatePrice": estatePrice, "agencyId": agencyId};
        console.log(sendData)
        fetch(requestUrl, {method: "POST", headers: headers, body: JSON.stringify(sendData)})
        .then(response => {
            if(response.status === 201){
                console.log("Successfuly added ad");
                alert("Successfuly added ad");
                props.onAdd()
            }else{
                console.log("Error occured with code " + response.status);
                console.log(response);
                alert("Desila se greska!");
            }
            nameRef.current.value = ''
            estateTypeRef.current.value = ''
            yearConstructedRef.current.value = ''
            estatePriceRef.current.value = ''
        })
    }

    function getDataForDropdown(){

        var requesturl = host + port + agenciesEndpoint;
        console.log(requesturl);
        var headers = { };
        if (authCtx.token) {
            headers.Authorization = 'Bearer ' + authCtx.token;
        }
        fetch(requesturl,{ headers: headers })
        .then((response) => {if(response.status === 200){
            response.json()
            .then((data) => {
                console.log(data);
                setAgencies(data);
            });
        }else{
            console.log(response.status);
        }
        })
        .catch(error => console.log(error));
    }

    const handleChange = e => {
        setAgencyId(e.target.value)
    }

    const clearForm = () => {}

  return (
    <div>
        <h3>Dodavanje novog oglasa</h3>
        <form onSubmit={submitAdHandler}>

        <label htmlFor="agency">Agencija</label>
        <select id="agency" value={agencyId} defaultValue={'DEFAULT'} onChange={handleChange}>
            <option value="DEFAULT" disabled>Izaberite agenciju ...</option>
            {agencies.map((agency, index) => {
                return (
                    <option key={agency.id} value={agency.id}>{agency.name}</option>
                )
            })}
        </select><br />

            <label htmlFor="name">Naslov</label>
            <input id="name" type="text" ref={nameRef} required /><br />

            <label htmlFor="estateType">Tip nekretnine</label>
            <input id="estateType" type="text" ref={estateTypeRef} required /><br />

            <label htmlFor="yearConstructed">Godina izgradnje</label>
            <input id="yearConstructed" type="number" ref={yearConstructedRef} required /><br />

            <label htmlFor="estatePrice">Cena</label>
            <input id="estatePrice" type="number" ref={estatePriceRef} required /><br />

            <button>Dodavanje</button><br />
            <button onClick={clearForm}>Odustajanje</button>
        </form>
    </div>
  )
}

export default AddAd