import React, { useRef } from 'react'

const SearchAds = (props) => {

    const minPriceRef = useRef()
    const maxPriceRef = useRef()

    const submitSearchHandler = (e) => {
        e.preventDefault()
        const minPrice = minPriceRef.current.value
        const maxPrice = maxPriceRef.current.value
        props.onMin(minPrice)
        props.onMax(maxPrice)
        props.onSearch()
    }

  return (
    <div>
        <p>Pretraga oglasa za nekretnine po ceni</p><br />
        <form onSubmit={submitSearchHandler}>
            <label htmlFor="minPrice">Najmanje:</label>
            <input id="minPrice" type="number" ref={minPriceRef} required /><br />

            <label htmlFor="maxPrice">Najvise:</label>
            <input id="maxPrice" type="number" ref={maxPriceRef} required /><br />

            <button>Trazi</button><br />
        </form>
    </div>
  )
}

export default SearchAds