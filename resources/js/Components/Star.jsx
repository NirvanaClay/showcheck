const Star = () => {

  return(
  <button type='submit'>
    <i className="far fa-star" onMouseEnter={addRatingPreview} onMouseLeave={removeRatingPreview} onClick={setRatingValue} value={1}></i>
  </button>
  )
}