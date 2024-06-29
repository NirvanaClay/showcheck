import Slider from './Slider.jsx'

const MoviesList = ({ movies, getMovies, Link, sliderPosition, setSliderPosition, checkStreaming, streamingId, streamingServices, showRatings, setShowRatings, noStreaming, spinnerDegree, setSpinnerDegree, isLoading, resizeResetSlider, changedRating, setChangedRating, truncateTitle, setShowDeleted, showDeleted }) => {

  return (
    <>
      <div className='show-index'>
        <div className='shows__container'>
          <h2>My Movies</h2>
          <Slider shows={movies} getMovies={getMovies} movies={movies} Link={Link} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming}streamingId={streamingId}  streamingServices={streamingServices} showRatings={showRatings} setShowRatings={setShowRatings} noStreaming={noStreaming} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} isLoading={isLoading} resizeResetSlider={resizeResetSlider} changedRating={changedRating} setChangedRating={setChangedRating} truncateTitle={truncateTitle} setShowDeleted={setShowDeleted} showDeleted={showDeleted} />
        </div>
      </div> 
    </>
  )
}

export default MoviesList
