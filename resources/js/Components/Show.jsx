import { useState, useEffect } from 'react'
import axios from '../axiosConfig'


const Show = ({ title, image, id, imdb_id, rating, checkStreaming, streamingServices, streamingId, show_type, noStreaming, series, getSeries, movies, getMovies, pivotId, pivotUser, isLoading, spinnerDegree, setSpinnerDegree, changedRating, setChangedRating }) => {
  const [previewRating, setPreviewRating] = useState(rating)
  const [stateRating, setStateRating] = useState([rating || 0])

  useEffect(() => {
    if(isLoading){
      const interval = setInterval(() => {
        setSpinnerDegree(spinnerDegree + 90)
        console.log("set spinner degree, which should be:")
        console.log(spinnerDegree + 90)
      }, 100);
      return () => clearInterval(interval);
    }
  }, [spinnerDegree, isLoading])

  useEffect(() =>{
    const checkRating = (e) => {
      let stars = document.querySelectorAll('i')
      for(let star of stars){
        if(star.parentElement.parentElement.parentElement.id == id){
          if(star.getAttribute('value') <= stateRating){
            star.classList.add('fas')
          }
          else{
            star.classList.remove('fas')
          }
        }
      }
    }
    checkRating()
  }, [stateRating])

  const addRating = async (e) => {
    e.preventDefault()
    await axios.post(`/shows/${id}`, {
      _method: 'PUT',
      id: id,
      rating: stateRating,
      showType: show_type
    })
    setChangedRating(!changedRating)
  }

  const deleteShow = async (e) => {
    e.preventDefault();
    axios.delete(`/shows/${id}`)
    if(series){
      getSeries(series.filter((show) => show.id !== id))
    }
    if(movies){
      getMovies(movies.filter((movie) => movie.id !== id))
    }
  }

  const addRatingPreview = (e) => {      
    let stars = document.querySelectorAll('i')
    for(let star of stars){
      if(star.parentElement.parentElement.parentElement.id == id){
        if(star.getAttribute('value') <= e.target.getAttribute('value')){
          star.classList.add('fas')
        }
        else{
          star.classList.remove('fas')
        }
      }
    }
  }

  const removeRatingPreview = (e) => {  
    let stars = document.querySelectorAll('i')
    for(let star of stars){
      if(star.parentElement.parentElement.parentElement.id == id){
        if(star.getAttribute('value') <= stateRating){
          star.classList.add('fas')
        }
        else{
          star.classList.remove('fas')
        }
      }
    }
  }

  const setRatingValue = (e) => {
    setStateRating(e.target.getAttribute('value'))
  }

  return (
    <div className='show'>
      <div className='title-container'>
        <h3>{title}</h3>
      </div>
      <img src={image} />
      {streamingId == imdb_id &&
        <div className={`loading ${isLoading && 'visible'}`}>
          <i className="fas fa-spinner" style={{transform: `rotate(${spinnerDegree}deg)`}}></i>
        </div>
      }
      {streamingServices.length > 0 && streamingId == imdb_id && streamingServices != noStreaming &&
      <h4>Streaming on:</h4>}
      {streamingServices.length > 0 && streamingServices != noStreaming && streamingId == imdb_id && streamingServices.map((service, key) => (
        <img key={key} src={service} className='streaming-image'></img>
      ))}
      {streamingServices == noStreaming && streamingId == imdb_id &&
        <p>{streamingServices}</p>
      }
      <div className='stars-container' id={id}>
        <form action='/shows/{id}' method='POST' onSubmit={addRating}>
          <input type="hidden" name="_method" value="PUT" />
          <input type ='hidden' name='id' value={id} className='id' />
          <input type="hidden" name="_token" value="{{ csrf_token() }}" />
          <input type='hidden' className='rating' name='rating' value={stateRating} />
          <button type='submit'>
            <i className="fa-regular fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={setRatingValue} value={1}></i>
          </button>
          <button type='submit'>
            <i className="fa-regular fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={setRatingValue} value={2}></i>
          </button>
          <button type='submit'>
            <i className="fa-regular fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={setRatingValue} value={3}></i>
          </button>
          <button type='submit'>
            <i className="fa-regular fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={setRatingValue} value={4}></i>
          </button>
          <button type='submit'>
            <i className="fa-regular fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={setRatingValue} value={5}></i>
          </button>
        </form>
      </div>
      <form onSubmit={deleteShow} className='deleteShow' method='POST'>
        <input type="hidden" name="_method" value="DELETE" />
        <input type="hidden" name="_token" value="{{ csrf_token() }}" />
        <input type ='hidden' name='id' value={id} />
        <input type ='hidden' name='title' value={title} />
        <input type ='hidden' name='image_url' value={image} />
        <input type='submit' value="Remove" />
      </form>
      <button className='streamCheck' title={title} imdb_id={imdb_id} show_type={show_type} onClick={checkStreaming}>Stream Check</button>
    </div>
  )
}

export default Show