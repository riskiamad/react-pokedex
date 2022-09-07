import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

// Components
import MyPokemon from '../components/MyPokemon';
import Loader from '../components/Loader';

const MyPokemonPage = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true)

    const getPokemonList = async () => {
        const res = await getPokemonData();
        console.log(res);
        setPokemon(res);
        setLoading(false);
    }

    const getPokemonData = async () => {
        const res = await axios.get(`http://localhost:8081/api/v1/user/pokemon`);
        return res.data['data'];
    }

    useEffect(() => {
        getPokemonList();
    }, [])

    return (
        <>
        {loading ? (
            <Loader/>
        ) : (
            <Row>
                {pokemon.map( p =>(
                    <Col key={p.id} xs={12} sm={12} md={4} lg={4} xl={4}>
                        <MyPokemon mypokemon={p}/>
                    </Col>
                ))}
            </Row>
        )}
        </>
    )
}

export default MyPokemonPage;
