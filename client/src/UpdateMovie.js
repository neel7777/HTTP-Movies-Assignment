import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const FormDiv = styled.div `
display: flex;
flex-direction: column;
align-items: center;



`
const Forms = styled.div `
display: flex;
flex-direction: column;
align-items: center;
width: 100%;


`


const UpdateMovie = props => {
    const [movie, setMovie] = useState({
        title: '',
        director: '',
        metascore: ''
    }
    );
    const { id } = useParams();

    useEffect(()=>{
        const movieToUpdate=props.movieList.find(film => `${film.id}`===id);
        console.log('movieToUpdate is', movieToUpdate);
        if (movieToUpdate) {
            setMovie(movieToUpdate)
        }
    },[props.movieList, id])
    
    const handleChanges = e => {
        e.preventDefault();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
        
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            console.log('look at all the', res)
            props.getMovieList(res.data);
            props.history.push('/')
        })
        .catch(err=>console.log(err))
    }
    return(
        <FormDiv>
            <h1>Update!</h1>
            <form onSubmit={handleSubmit}>
                <Forms>
                <input 
                
                type="text"
                
                name="title"
                value={movie.title}
                placeholder='title'
                onChange={handleChanges}

                >
                </input>
                <br>
                </br>
                <input 
                
                type="text"
                
                name="director"
                value={movie.director}
                placeholder="director"
                onChange={handleChanges}>
                </input>
                <br>
                </br>
                <input 
                
                type="text"
                
                name="metascore"
                value={movie.metascore}
                placeholder="metascore"
                onChange={handleChanges}>
                </input>
                <br>
                </br>
                <button>
                    Update Movies!
                </button>
                </Forms>
            </form>
        </FormDiv>
    )
}

export default UpdateMovie;