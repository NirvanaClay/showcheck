import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

const RightArrow = ({ isRightHovering, setIsRightHovering, results, shows, rightArrowVisibility, setRightArrowVisibility, moveSliderRight, sliderPosition }) => {

  const toggleHover = () => {
    setIsRightHovering(!isRightHovering)
  }

  return (
    <div className={`right-arrow__container ${isRightHovering && "inverted-bg"} ${rightArrowVisibility && "visible"}`} onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={moveSliderRight}>
      <FontAwesomeIcon icon={faArrowRight} className={`right-arrow ${isRightHovering && "inverted"}`} />
    </div>
  )
}

export default RightArrow
