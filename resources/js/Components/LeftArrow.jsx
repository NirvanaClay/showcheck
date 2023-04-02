import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

const LeftArrow = ({ isLeftHovering, setIsLeftHovering, results, shows, leftArrowVisibility, setLeftArrowVisibility, moveSliderLeft, sliderPosition }) => {

  useEffect(() => {
    if(results){
      let sliderPages = (results.length / 4)>>0
      if(sliderPages > (sliderPosition / -900)){
        setLeftArrowVisibility(true) 
      }
      else{
        setLeftArrowVisibility(false)
      }
    }
    if(shows){
      let sliderPages = (shows.length / 4)>>0
      let currentSliderPage = (sliderPosition / -900)
      if(sliderPages > currentSliderPage){
        setLeftArrowVisibility(true) 
      }
      else{
        setLeftArrowVisibility(false)
      }
    }
  }, [sliderPosition, leftArrowVisibility, shows, results])

  const toggleHover = () => {
    setIsLeftHovering(!isLeftHovering)
  }

  return (
    <div className={`left-arrow__container ${isLeftHovering && "inverted-bg"} ${leftArrowVisibility && "visible"}`} onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={moveSliderLeft}>
      <FontAwesomeIcon icon={faArrowLeft} className={`left-arrow ${isLeftHovering && "inverted"}`} />
    </div> 
  )
}

export default LeftArrow
