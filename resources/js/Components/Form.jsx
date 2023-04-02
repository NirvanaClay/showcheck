import Axios from '../axiosConfig'

import { useEffect, useState } from 'react'

import Result from './Result'
import Slider from './Slider'

const Form = ({ user, Link, results, getResults, fetchResults, streamingServices, checkStreaming, sliderPosition, setSliderPosition, showType, setShowType, streamingId, noStreaming, series, getSeries, movies, getMovies, isLoading, spinnerDegree, setSpinnerDegree, failedSearch, setFailedSearch, resizeResetSlider }) => {

  console.log("In Form component, Link is:")
  console.log(Link)

  const [selectedResult, setSelectedResult] = useState(false)

  const addShowType = (e) => {
    const theShowType = (e.target.value).toLowerCase();
    setFailedSearch(false)
    setShowType(theShowType)
  }

  const checkShowType = () => {
    setSelectedResult(false)
    if(!showType){
      setFailedSearch(true)
    }
  }

  return (
    <div className='form'>
      <h1>Search Shows And Find Where To Stream Them</h1>
      <form 
        onSubmit={fetchResults}>
        <div className='radio-buttons'>
          <div className='radio-button'>
            <label htmlFor='series'>Series</label>
            <input type='radio' id='Series' name='show-type' value="Series" onClick={addShowType}></input>
          </div>
          <div className='radio-button'>
            <label htmlFor='movies'>Movie</label>
            <input type='radio' id='Movie' name='show-type' value="Movie" onClick={addShowType}></input>
          </div>
        </div>
        <p className={`selection_warning ${failedSearch && !showType && 'visible'}`}>Please select a show type.</p>
        <p className={`selection_warning ${failedSearch && showType && 'visible'}`}>There were no shows found. Try a different search term.</p>
        <input type='text'></input>
        <button onClick={checkShowType}>Search</button>
        {!user && 
        <p className='register-pitch'><Link to='/login'>Login</Link> or <Link to='/register'>Register</Link> to save and rate the shows that capture your attention.</p>
        }
        <p className='streaming-list'>*We search Netflix, Hulu, Amazon Prime, HBO, Disney+, and Peacock.</p>
      </form>
      <div className='results-container'>
          <Slider user={user} results={results} getResults={getResults} fetchResults={fetchResults} Link={Link} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming} streamingServices={streamingServices} showType={showType} streamingId={streamingId} noStreaming={noStreaming} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} isLoading={isLoading} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} selectedResult={selectedResult} setSelectedResult={setSelectedResult} resizeResetSlider={resizeResetSlider} /> 
      </div>
    </div>
  )
}

export default Form
