import Slider from './Slider'

const SeriesList = ({ series, getSeries, Link, sliderPosition, setSliderPosition, checkStreaming, streamingServices, streamingId, noStreaming, showRatings, setShowRatings, isLoading, spinnerDegree, setSpinnerDegree, resizeResetSlider, changedRating, setChangedRating, truncateTitle, setShowDeleted, showDeleted }) => {

  return (
    <>
      <div className='show-index'>
        <div className='shows__container'>
          <h2>My Series</h2>
          <Slider series={series} getSeries={getSeries} shows={series} Link={Link} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming} streamingServices={streamingServices} streamingId={streamingId} noStreaming={noStreaming} showRatings={showRatings} setShowRatings={setShowRatings} isLoading={isLoading} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} resizeResetSlider={resizeResetSlider} changedRating={changedRating} setChangedRating={setChangedRating} truncateTitle={truncateTitle} setShowDeleted={setShowDeleted} showDeleted={showDeleted} />
        </div>
      </div> 
    </>
  )
}

export default SeriesList