import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

// Components
import Loader from '../components/Loader';
import ReleaseModal from '../components/ReleaseModal';

const DetailMyPokemonPage = ({ match }) => {

    const [pokemonDetails, setPokemonDetails] = useState();
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const id = match.params.id;

    const getPokemon = async (id) => {
        const details = await getPokemonData(id);
        setPokemonDetails(details.data);
        console.log(details.data)
        setLoading(false);
    }

    const getPokemonData = async (id) => {
        const res = await axios.get(`http://localhost:8081/api/v1/user/pokemon/${id}`);
        return res;
    }

    const rename = async (id) => {
        setLoading(true);
        const res = await axios.patch(`http://localhost:8081/api/v1/user/pokemon/${id}/rename`);
        setPokemonDetails(res.data);
        setLoading(false);
    }

    const release = async (id) => {
        const res = await axios.delete(`http://localhost:8081/api/v1/user/pokemon/${id}/release`);
        console.log(res.data['data'].is_released);
        if (res.data['data'].is_released) {
            setShowModal(true);
            return <><ReleaseModal message='your pokemon has released' show={showModal} /><Redirect to="/mypokemon" /></>
        } else {
            setShowModal(true);
            return <ReleaseModal message="your pokemon doesn't want to release" show={showModal}/>
        }
    }

    useEffect(() => {
        getPokemon(id);
    }, [])

    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card className='my-3 p-3 rounded text-center shadow p-3 mb-5 bg-white' style={{ border: 'none' }}>
                            <Link to={`/mypokemon/${pokemonDetails.data.id}`}>
                                <Card.Img style={{ width: '15rem' }} src={pokemonDetails.data.pokemon.Sprites.FrontDefault} variant='top'/>
                            </Link>
                            <Card.Body className={`${pokemonDetails.data.pokemon.Types[0].Type.Name} rounded text-white`}>
                                <Button size='sm' variant='warning' className='m-2' onClick={ () => rename(id)}>Rename</Button>
                                <Button size='sm' variant='danger' className='m-2' onClick={ () => release(id)}>Release</Button>
                                <Card.Title as='div'>
                                        <strong>{pokemonDetails.data.name.charAt(0).toUpperCase() + pokemonDetails.data.name.slice(1)}</strong>
                                </Card.Title>
                                <Link to={`/pokemon/${pokemonDetails.data.pokemon.Name}`} className='link-name'>
                                    <Card.Title as='div'>
                                        <strong>#{pokemonDetails.data.pokemon.ID} {pokemonDetails.data.pokemon.Name.charAt(0).toUpperCase() + pokemonDetails.data.pokemon.Name.slice(1)}</strong>
                                    </Card.Title>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card className='p-3 rounded text-center shadow p-3 mb-5 bg-white' style={{ border: 'none' }}>
                            <Card.Body>
                                <Card.Text>
                                    <Row>
                                        {pokemonDetails.data.pokemon.Types.map(t => (
                                            <Col key={t.Type.Name}>
                                                <div className={`${t.Type.Name} rounded px-4 py-1`} style={{ color: 'white' }}>
                                                    {t.Type.Name.toUpperCase()}
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Card.Img style={{ width: '15rem' }} src={pokemonDetails.data.pokemon.Sprites.FrontDefault}/>
                                            <Card.Text>Normal Form</Card.Text>
                                        </Col>
                                        <Col>
                                            <Card.Img style={{ width: '15rem' }} src={pokemonDetails.data.pokemon.Sprites.FrontShiny}/>
                                            <Card.Text>Shiny Form</Card.Text>
                                        </Col>
                                    </Row>
                                    <Row className='mt-4'>
                                        <Col  xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <div className='px-4 py-1 rounded' style={{ border: '1px black solid' }}>Abilities</div>
                                        </Col>
                                    </Row>
                                    <Row className='text-center'>
                                        {pokemonDetails.data.pokemon.Abilities.map(a => (
                                            <Col key={a.Ability.Name} xs={6} sm={6} md={6} lg={6} xl={6}>
                                                <div className={`rounded px-4 py-1`}>
                                                    {a.Ability.Name.toUpperCase()}
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )
}

export default DetailMyPokemonPage;
