import React from 'react'
import Card from './Card'

function Cards({ pokemon }) {
    const { name, url } = pokemon
    return (<>
        {
            pokemon && (
                <div className="col-md-2 col-lg-2 item">
                    <Card name={name} urls={url} />
                </div>
            )
        }
    </>
    )
}

export default Cards
