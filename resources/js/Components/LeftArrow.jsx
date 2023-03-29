import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

const LeftArrow = ({ isLeftHovering, setIsLeftHovering, results, shows, leftArrowVisibility, setLeftArrowVisibility, moveSliderLeft, sliderPosition }) => {

  useEffect(() => {
    if(results){
      let sliderPages = (results.length / 4)>>0
      console.log("slider pages with weird method is:")
      console.log(sliderPages)
      if(sliderPages > (sliderPosition / -900)){
        setLeftArrowVisibility(true) 
        console.log("Left arrow should be visible.")
      }
      else{
        setLeftArrowVisibility(false)
        console.log("Left arrow should be invisible.")
      }
    }
    if(shows){
      let sliderPages = (shows.length / 4)>>0
      let currentSliderPage = (sliderPosition / -900)
      if(sliderPages > currentSliderPage){
        setLeftArrowVisibility(true) 
        console.log("Left arrow should be visible, since:")
        console.log(`${sliderPages} is greater than ${(sliderPosition/-900)}`)
      }
      else{
        setLeftArrowVisibility(false)
        console.log("Left arrow should be invisible, since:")
        console.log(`${sliderPages} is not greater than ${(sliderPosition/-900)}`)
      }
    }
  }, [sliderPosition, leftArrowVisibility, shows, results])

  const toggleHover = () => {
    console.log("Toggling hover.")
    setIsLeftHovering(!isLeftHovering)
  }

  return (
    <div className={`left-arrow__container ${isLeftHovering && "inverted-bg"} ${leftArrowVisibility && "visible"}`} onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={moveSliderLeft}>
      <FontAwesomeIcon icon={faArrowLeft} className={`left-arrow ${isLeftHovering && "inverted"}`} />
    </div> 
  )
}

export default LeftArrow
