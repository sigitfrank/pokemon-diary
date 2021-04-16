import React, { useState, useEffect } from 'react'
import axios from 'axios'
function Card({ name = '', urls = '', search = false, dataSearch = [], setUrl = '' }) {
    const [data, setData] = useState([])

    useEffect(() => {
        if (!search) {
            const fetchData = async () => {
                const response = await axios.get(urls)
                return response.data
            }

            fetchData().then((response) => {
                setData(response)
            })
                .catch((error) => { console.log(error) })
        } else {
            setData(dataSearch)
        }
    }, [urls, search, dataSearch])


    const resetHandler = () => {
        return setUrl(`https://pokeapi.co/api/v2/pokemon`)
    }

    const checkResetButton = () => {
        if (search) {
            return (<div className="text-center mt-3">
                <button className="btn btn-light" onClick={resetHandler}>
                    Reset
                </button>
            </div>
            )
        }
        return
    }



    return (<>
        {data.sprites && (
            <div className="box">
                <img src={data.sprites.other.dream_world.front_default} alt={name} />
                <div className="cover">
                    <h3 className="name">{data.name}</h3>
                    {
                        checkResetButton()
                    }
                </div>
            </div>
        )
        }
    </>
    )
}

export default Card
