import Cards from "./Components/Cards";
import Intro from "./Components/Intro";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from "./Components/Card";

function App() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [isSearched, setIsSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/')


  const fetchData = (url) => {
    setLoading(true)
    const response = axios.get(url)
      .then((response) => {
        setLoading(false)
        return setData(response.data)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
    return response
  }

  useEffect(() => {
    let mounted = true
    if (mounted)
      fetchData(url)

    return () => {
      mounted = false
    }
  }, [url])
  const { next, previous, results } = data

  const paginateHandler = (next) => {
    setUrl(next)
  }

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const searchHandler = () => {
    setIsSearched(true)
    setUrl(`https://pokeapi.co/api/v2/pokemon/${search}`)
    return setSearch('')
  }

  const resetHandler = () => {
    setError(false)
    return setUrl(`https://pokeapi.co/api/v2/pokemon/`)
  }


  if (loading) {
    return (<div className="text-center">
      <img src="https://bimaqris.bankjateng.co.id/assets/preloader.gif" alt="loading" className="img-fluid" />
    </div>)
  }

  if (error) {
    return (<div className="team-grid" style={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <div className="container">
        <div className="row justify-content-center flex-column text-center">
          <p className="text-white">Not Found</p>
          <div>
            <button className="btn btn-light w-50" onClick={resetHandler}>
              Reset
                </button>
          </div>
        </div>
      </div>
    </div>
    )
  }

  if (isSearched) {
    if (data.sprites) {
      return (<div className="team-grid" style={{ height: "100vh", display: "flex", alignItems: "center" }}>
        <div className="container">
          <div className="row justify-content-center">
            <Card setUrl={setUrl} dataSearch={data} search={isSearched} />
          </div>
        </div>
      </div>)
    }

  }

  return (
    <div className="team-grid">
      <div className="container">
        <Intro />
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group mb-3 mt-5">
              <input type="text" className="form-control" value={search} onChange={(e) => onChangeSearch(e)} placeholder="Find your pokemon here..." aria-label="Find your pokemon here..." aria-describedby="search-pokemon" />
              <div className="input-group-append">
                <button className="input-group-text search" onClick={searchHandler} id="search-pokemon">Search</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row pokemon d-flex justify-content-center">
          {
            results && (
              results.map((pokemon) => (<>
                <Cards pokemon={pokemon} key={pokemon.name} />
              </>
              ))
            )

          }

          <div className="col-md-12">
            <div className="pagination">
              {previous && (<button className="btn btn-light" onClick={() => paginateHandler(previous)}>previous</button>)}
              {next && (<button className="btn btn-light" onClick={() => paginateHandler(next)}>Next</button>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
