import { useEffect } from 'react'
import axios from '../axiosConfig'

const Result = ({ title, image, id, user, setStreamingServices, streamingServices, checkStreaming, showType, streamingId, noStreaming, series, getSeries, movies, getMovies, selectedResult, isLoading, spinnerDegree, truncateTitle, streamingError, showAdded, setShowAdded }) => {

  const truncatedTitle = truncateTitle(title, 30)

  useEffect(() => {
    if (showAdded) {
      const timer = setTimeout(() => {
        setShowAdded(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAdded]);

  const updateShows = (shows, setShows, showData) => {
    const showCheck = shows.some(show => show.imdb_id == showData.imdb_id)
    if(!showCheck){
      setShows([...shows, showData])
    }
  }

  const myShow = async (e) => {
    e.preventDefault();
    showType = showType.toLowerCase()
    const data = {
      title: title,
      image_url: image,
      imdb_id: id,
      show_type: showType
    } 
    try{
      const response = await axios.post('/shows', data)
      setShowAdded(true)
      setStreamingServices([])
      if(showType == 'series'){
        updateShows(series, getSeries, data)
      }
      else if(showType == 'movie'){
        updateShows(movies, getMovies, data)
      }
    } catch(err){
      console.error("Error adding show:", err)
    }
  }

  return (
    <div id={id} className={`result ${selectedResult && 'single'}`}>
      <div className='title-container'>
        <h2 id={id}>{truncatedTitle}</h2>
      </div>
      <img id={id} src={image}></img>
      {showAdded && <p>Show added!</p>}
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
      {streamingError && 
        <p>{streamingError}</p>
      }
      <form id={id} onSubmit={myShow} name='show-form' className='show-form'>
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
