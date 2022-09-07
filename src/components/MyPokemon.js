import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const mypokemon = ({ mypokemon }) => {

    return (
        <>
            <Card className='my-3 p-3 rounded text-center shadow p-3 mb-5 bg-white rounded' style={{ border: 'none' }}>
                <Link to={`/mypokemon/${mypokemon.id}`}>
                    <Card.Img style={{ width: '8rem' }} src={mypokemon.pokemon.Sprites.FrontDefault} variant='top'/>
                </Link>
                <Card.Body className={`${mypokemon.pokemon.Types[0].Type.Name} rounded text-white`}>
                    <Link to={`/mypokemon/${mypokemon.id}`} className='link-name'>
                        <Card.Title as='div'><strong>{mypokemon.name.charAt(0).toUpperCase() + mypokemon.name.slice(1)}</strong></Card.Title>
                    </Link>
                </Card.Body>
            </Card>
        </>
    )
}

export default mypokemon;

