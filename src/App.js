import Cards from "./Components/Cards";
import Intro from "./Components/Intro";
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
  useEffect(() => {
    const fetchData = () => {
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
    fetchData()

  }, [url])
  const { next, previous, results } = data

  const paginateHandler = (next) => {
    setUrl(next)
  }
  if (loading) {
    return (<div className="text-center">
      <img src="https://bimaqris.bankjateng.co.id/assets/preloader.gif" alt="loading" className="img-fluid" />
    </div>)
  }



  if (error) {
    return (<div className="error">
      {error}
    </div>
    )
  }

  return (

    <div className="team-grid">
      <div className="container">
        <Intro />
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
