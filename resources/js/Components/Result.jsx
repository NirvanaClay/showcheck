import { useState, useEffect } from 'react'
import SeriesList from './SeriesList';
import axios from '../axiosConfig'

const Result = ({ title, image, id, user, streamingServices, getResults, checkStreaming, showType, streamingId, noStreaming, series, getSeries, movies, getMovies, selectedResult, isLoading, spinnerDegree, setSpinnerDegree, truncateTitle }) => {

  const truncatedTitle = truncateTitle(title, 30)

  const myShow = async (e) => {
    e.preventDefault();
    showType = showType.toLowerCase()
    const data = {
      title: title,
      image_url: image,
      imdb_id: id,
      show_type: showType
    } 
    await axios.post('/shows', data)
    .then(function(response){
      if(showType == 'series'){
        const seriesCheck = series.some(show => {
          return show.id == response.data
        })
        if(seriesCheck){
          return
        }
        else{
          getSeries([...series, {
            title: title,
            image_url: image,
            id: response.data,
            imdb_id: id,
            show_type: showType
          }])
        }
      }
      else if(showType == 'movie'){
        const moviesCheck = movies.some(movie => {
          return movie.id == response.data
        })
        if(moviesCheck){
          return
        }
        else{
          getMovies([...movies, {
            title: title,
            image_url: image,
            id: response.data,
            imdb_id: id,
            show_type: showType
          }])
        }
      }
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <div id={id} className={`result ${selectedResult && 'single'}`}>
      <div className='title-container'>
        <h2 id={id}>{truncatedTitle}</h2>
      </div>
      <img id={id} src={image}></img>
      {streamingId == id &&
        <div className={`loading ${isLoading && 'visible'}`}>
          <i className="fas fa-spinner" style={{transform: `rotate(${spinnerDegree}deg)`}}></i>
        </div>
      }
      {streamingServices.length > 0 && streamingId == id && streamingServices != noStreaming &&
      <h4>Streaming on:</h4>}
      {streamingServices.length > 0 && streamingServices != noStreaming && streamingId == id && streamingServices.map((service, key) => (
        <img key={key} src={service} className='streaming-image'></img>
      ))}
      {streamingServices == noStreaming && streamingId == id &&
        <p>{streamingServices}</p>
      }
      <form id={id} onSubmit={myShow} method="POST" action="/api/shows" name='show-form' className='show-form'>
        <input type ='hidden' name='title' value={title} />
        <input type ='hidden' name='image_url' value={image} />
        <input type ='hidden' name='imdb_id' value={id} />
        <input type ='hidden' name='sbow_type' value={showType} />
        <input type="hidden" name="_token" value="{{ csrf_token() }}" />
        {user && 
          <input id={id} type='submit' className='order' name='addShowBtn' value='Add Show' />
        }
      </form>
      <button id={id} className='streamCheck' show_type={showType} imdb_id={id} title={title} onClick={checkStreaming}>Stream Check</button>
    </div>
  )
}

export default Result
