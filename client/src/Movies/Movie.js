import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

function Movie( props ) {
  console.log(props);
  const [movie, setMovie] = useState(null);
  const history = useHistory();
  const { id } = useParams();
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  // const deleteItem = e => {
  //   e.preventDefault();
  //   // make an axios.delete request
  //   // in the .then, update state with props.setItems and navigate to the shop
  //   axios.delete(`http://localhost:3333/items/${item.id}`).then(res => {
  //     // res.data
  //     props.setItems(res.data);
  //     props.history.push('/item-list');
  //   });
  // };

  const deleteMovie = e => {
    e.preventDefault();
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(res=> {
      console.log('deleting stuff', res);
      // props.setMovie(props.movieList.filter(item=> item !== props.movie))
      // setMovie(res.data);
      
      props.getMovieList();
      // setTimeout(() => , 1000)
      history.push('/')
      
    })
    .catch(err=>console.log(err))
    
  }

  
  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button>
        <Link to ={`/update-movie/${id}`}>Edit
        </Link>
      </button>
      <button type="button" onClick={deleteMovie}>Delete</button>
    </div>
  );
}

export default Movie;
