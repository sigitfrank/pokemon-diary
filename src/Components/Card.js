import React, { useState, useEffect } from 'react'
import axios from 'axios'
function Card({ name, urls }) {
    const [data, setData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(urls)
            return response.data
        }

        fetchData().then((response) => {
            setData(response)
        })
            .catch((error) => { console.log(error) })
    }, [urls])
    return (<>
        {data.sprites && (
            <div className="box">
                <img src={data.sprites.other.dream_world.front_default} alt={name} />
                <div className="cover">
                    <h3 className="name">{name}</h3>
                </div>
            </div>
        )
        }
    </>
    )
}

export default Card
