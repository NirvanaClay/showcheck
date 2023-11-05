import { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import React from 'react';

import axios from '../axiosConfig'

import disneyLogo from '../../img/disney-logo.jpg';
import hboLogo from '../../img/hbo-logo.jpg';
import huluLogo from '../../img/hulu-logo.jpg'
import netflixLogo from '../../img/netflix-logo.jpg'
import peacockLogo from '../../img/peacock-logo.jpg'
import primeLogo from '../../img/prime-logo.jpg'

import '../../Styles/reset.css'
import '../../Styles/app.scss'
import '../../Styles/form.scss'
import '../../Styles/header.scss'
import '../../Styles/home.scss'
import '../../Styles/login.scss'
import '../../Styles/register.scss'
import '../../Styles/shows.scss'

import Home from './Home.jsx'
import Header from '../Components/Header.jsx'
import SeriesList from '../Components/SeriesList.jsx'
import MoviesList from '../Components/MoviesList.jsx'
import RegisterForm from '../Components/RegisterForm.jsx'
import LoginForm from '../Components/LoginForm.jsx'
import LogoutForm from '../Components/LogoutForm.jsx'
import Dashboard from '../Components/Dashboard.jsx'
import Example from '../Components/Example.jsx'

// import reportWebVitals from '../reportWebVitals';

// import bootstrap from '../bootstrap';
const Main = () => {

  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState();
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState(0)
  const [results, getResults] = useState([])
  const [details, getDetails] = useState([])

  const [streamingServices, setStreamingServices] = useState([])
  const [streamingId, setStreamingId] = useState('')
  const [streamingError, setStreamingError] = useState()

  const [userShows, setUserShows] = useState([])
  const [showType, setShowType] = useState('')
  const [series, getSeries] = useState([])
  const [movies, getMovies] = useState([])
  
  const [isLoading, setIsLoading] = useState(false)
  const [spinnerDegree, setSpinnerDegree] = useState(0)

  const [resultsLoading, setResultsLoading] = useState(false)
  const [resultsSpinnerDegree, setResultsSpinnerDegree] = useState(0)

  const [failedSearch, setFailedSearch] = useState(false)

  const [changedRating, setChangedRating] = useState(false)

  const noStreaming = "This show is not currently available through streaming."

  const useSpinner = (loading, spinnerDegree, setSpinnerDegree) => {
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setSpinnerDegree(spinnerDegree + 90);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [spinnerDegree, loading]);
};

useSpinner(isLoading, spinnerDegree, setSpinnerDegree);
useSpinner(resultsLoading, resultsSpinnerDegree, setResultsSpinnerDegree);

  useEffect(() => {
    if (loginStatus) {
      axios.get('user').then((e) => {
        let userInfo = e.data
        if (userInfo) {
          setUser(userInfo);
          setUserId(userInfo.id);
          setEmail(userInfo.email)
          setUserId(userInfo.id)
        }
      });
      axios.get('userShows').then((e) => {
        setUserShows([...e.data]);
      });
    }
    else{
      setEmail('')
      setUserId(0)
      // setLoginStatus(false)
    }
  }, [loginStatus, changedRating]);

  useEffect(() => {
    axios.get('checkLogin').then((e) => {
      const isLoggedIn = e.data;
      setLoginStatus(isLoggedIn);
    });
  }, []);

  useEffect((e) => {
    const fetchShows = async () => {
      if(user){
        let userSeries = userShows.filter(show => show.show_type == 'series')
        let userMovies = userShows.filter(show => show.show_type == 'movie')
        let orderedUserSeries = userSeries.sort((a, b) => a.title.localeCompare(b.title))
        let orderedUserMovies = userMovies.sort((a, b) => a.title.localeCompare(b.title))
        getSeries([...orderedUserSeries])
        getMovies([...orderedUserMovies])
      }

      else{
        getSeries([])
        getMovies([])
        setEmail('')
        setUserId(0)
      }
    }
    fetchShows()
  }, [user, changedRating, userShows])

  const fetchResults = async (e) => {
    e.preventDefault()
    getResults([])
    if(showType){
      setResultsLoading(true)
      setFailedSearch(false)
      const searchString = `https://imdb-api.com/en/API/Search${showType}/k_j0x59844/${e.target[2].value}`
      const res = await fetch(searchString)
      const data = await res.json()
      if(data.results){
        getResults(data.results)
        setResultsLoading(false)
      }
      else{
        setFailedSearch(true)
      }
    }
  }

  const checkStreaming = async (e) => {
    setStreamingError()
    setStreamingServices([])
    setIsLoading(true)
    const show_type = e.target.getAttribute('show_type')
    const imdb_id = e.target.getAttribute('imdb_id')
    const title = e.target.title
    let showToCheck = null
    let results = []
    const streamingServicesList=[
      'peacock',
      'netflix',
      'hulu',
      'prime',
      'disney', 
      'hbo'
    ]
    setStreamingId(imdb_id)
    const url = 'https://streaming-availability.p.rapidapi.com/search/pro'

    const headers = {
      'X-RapidAPI-Key': '153541ba38msh3a4675a0a844ccdp1a6a0cjsnc83d7caf9c90',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
      // 'Access-Control-Allow-Origin':'*',
      // 'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
    }
    let promises = []
    for(let i=0; i < streamingServicesList.length; i++){
      let streamingService = streamingServicesList[i]
      // promises.push(await new Promise((resolve, reject) => {
      promises.push(new Promise((resolve, reject) => {
        let params = {
          country: 'us',
          service: streamingService,
          type: show_type,
          order_by: 'original_title',
          output_language: 'en',
          language: 'en',
          keyword: `${title}`
        }
        axios.get(url, {
          params: params,
          headers: headers
        }).then(res =>{
          if(res.data.total_pages > 1){
            for(let i=0; i < res.data.total_pages; i++){
              let page = i + 1
              axios.get(url, {
                params: {
                  country: 'us',
                  service: streamingService,
                  type: show_type,
                  order_by: 'original_title',
                  page: page,
                  output_language: 'en',
                  language: 'en',
                  keyword: `${title}`
                },
                headers: headers,
                timeout: 7000
              }).then(res =>{
                if(res.data.results.length > 0){
                  let usableResults
                  for(let result of res.data.results){
                    if(result.imdbID == imdb_id){
                      showToCheck = result
                    }
                    if(showToCheck !== null){
                      for(let key of Object.keys(showToCheck.streamingInfo)){
                        results.push(key)
                      }
                      results = ([...new Set(results)])
                      break                     
                    }
                  }
                  return resolve(results)
                }
                else{
                  resolve()
                }
              })
              .catch((e) => {
                console.log(e)
                setIsLoading(false)
                setStreamingError("Something went wrong. Please reload the page and try again.")
              })
            }
          }
          else{
            if(res.data.results.length > 0){
              let usableResults
              for(let result of res.data.results){
                if(result.imdbID == imdb_id){
                  showToCheck = result
                }
                if(showToCheck !== null){
                  for(let key of Object.keys(showToCheck.streamingInfo)){
                    results.push(key)
                  }
                  results = ([...new Set(results)])
                  break
                }
              }
              return resolve(results)
            }
            else{
              resolve()
            }
          }
        }).catch((e) => {
          console.log(e)
        })
      }))
    }
    Promise.all(promises)
    .then((responses) => {
      let validResponses = []
      let finalArray
      let finalResults
      setIsLoading(false)
      for(let response of responses){
        if(response){
          if(response.length > 0){
            for(let singleResponse of response){
              if(singleResponse){
                if(singleResponse == 'prime'){
                  singleResponse = primeLogo
                  validResponses.push(singleResponse)
                }
                else if(singleResponse == 'netflix'){
                  singleResponse = netflixLogo
                  validResponses.push(singleResponse)
                }
                else if(singleResponse == 'hulu'){
                  singleResponse = huluLogo
                  validResponses.push(singleResponse)
                }
                else if(singleResponse == 'disney'){
                  singleResponse = disneyLogo
                  validResponses.push(singleResponse)
                }
                else if(singleResponse == 'hbo'){
                  singleResponse = hboLogo
                  validResponses.push(singleResponse)
                }
                else if(singleResponse == 'peacock'){
                  singleResponse = peacockLogo
                  validResponses.push(singleResponse)
                }

                validResponses = ([...new Set(validResponses)])
              }
            }
          }
        }
      }
      if(validResponses.length == 0){
        setStreamingServices([noStreaming])
      }
      else{
        finalArray = [].concat(...validResponses)
        finalResults = ([...new Set(finalArray)])
        setStreamingServices([...finalResults])
      }
    })
  }

  const [sliderPosition, setSliderPosition] = useState(0)

  const resetSlider = () => {
    setSliderPosition(0)
    getResults([])
    setStreamingServices([])
  }

  const resizeResetSlider = () => {
    setSliderPosition(0)
  }

  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const changePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility)
  }

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? title.slice(0, maxLength) + '…' : title;
  }

  return (
    <Router>
      <Header resetSlider={resetSlider} Link={Link} loginStatus={loginStatus} setEmail={setEmail} setUser={setUser} setLoginStatus={setLoginStatus} LogoutForm={LogoutForm} />
      <Routes>
        <Route path="/" element={<Home user={user} Link={Link}  results={results} getResults={getResults} fetchResults={fetchResults} setStreamingServices={setStreamingServices} streamingServices={streamingServices} checkStreaming={checkStreaming} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} streamingId={streamingId} noStreaming={noStreaming} showType={showType} setShowType={setShowType} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} isLoading={isLoading} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} failedSearch={failedSearch} setFailedSearch={setFailedSearch} resizeResetSlider={resizeResetSlider} resultsLoading={resultsLoading} resultsSpinnerDegree={resultsSpinnerDegree} truncateTitle={truncateTitle} streamingError={streamingError} />} />

        <Route path="register" element={<RegisterForm setUser={setUser} setLoginStatus={setLoginStatus} passwordVisibility={passwordVisibility} setPasswordVisibility={setPasswordVisibility} changePasswordVisibility={changePasswordVisibility} />} />

        <Route path="login" element={<LoginForm setLoginStatus={setLoginStatus} loginStatus={loginStatus} setUser={setUser} setUserId={setUserId} passwordVisibility={passwordVisibility} setPasswordVisibility={setPasswordVisibility} changePasswordVisibility={changePasswordVisibility} resetSlider={resetSlider} userShows={userShows} setUserShows={setUserShows} />} />

        <Route path='my-series' element={<SeriesList user={user} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} Link={Link} checkStreaming={checkStreaming} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} streamingServices={streamingServices} streamingId={streamingId} noStreaming={noStreaming} loginStatus={loginStatus} isLoading={isLoading} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} resizeResetSlider={resizeResetSlider} changedRating={changedRating} setChangedRating={setChangedRating} truncateTitle={truncateTitle} streamingError={streamingError} />} />

        <Route path='my-movies' element={<MoviesList movies={movies} getMovies={getMovies} series={series} getSeries={getSeries} Link={Link} checkStreaming={checkStreaming} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} streamingServices={streamingServices}streamingId={streamingId} loginStatus={loginStatus} user={user} noStreaming={noStreaming}isLoading={isLoading} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} resizeResetSlider={resizeResetSlider} changedRating={changedRating} setChangedRating={setChangedRating} truncateTitle={truncateTitle} streamingError={streamingError} />} />

      </Routes>
    </Router>
  )
}

export default Main





// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
