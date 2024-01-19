import { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
import '../../Styles/forgot-password.scss'
import '../../Styles/reset-password.scss'


import Home from './Home.jsx'
import Header from '../Components/Header.jsx'
import SeriesList from '../Components/SeriesList.jsx'
import MoviesList from '../Components/MoviesList.jsx'
import RegisterForm from '../Components/RegisterForm.jsx'
import LoginForm from '../Components/LoginForm.jsx'
import LogoutForm from '../Components/LogoutForm.jsx'
import ForgotPassword from './Auth/ForgotPassword';
import ResetPassword from './Auth/ResetPassword';

const Main = () => {

  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState();
  const [results, getResults] = useState([])

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

  const [loginError, setLoginError] = useState('')
  const [registerError, setRegisterError] = useState('')

  const [changedRating, setChangedRating] = useState(false)

  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [passwordConfirmVisibility, setPasswordConfirmVisibility] = useState(false)

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
    console.log("Password visibility is:")
    console.log(passwordVisibility)
  }, [passwordVisibility])

  useEffect(() => {
    axios.get('/checkLogin')
    .then((res) =>{
      if(res.data){
        setLoginStatus(true)
      }
      else{
        setLoginStatus(false)
      }
    })
  }, [user])

  useEffect(() => {
    if(loginStatus){
      Promise.all([
        axios.get('/user'),
        axios.get('/userShows')
      ])
      .then(([userRes, userShowsRes]) => {
        if(userRes.data){
          setUser(userRes.data)
        }
        if(userShowsRes.data){
          setUserShows([...userShowsRes.data])
        }
      }).catch((err) => {
        console.error("Error occured:", err)
      });
    }
  }, [loginStatus, changedRating]);

  useEffect((e) => {
    const fetchShows = () => {
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
      }
    }
    fetchShows()
  }, [user, changedRating, userShows])

  const fetchResults = (e) => {
    e.preventDefault();
    setStreamingServices([])
    getResults([]);
    if(showType) {
        setResultsLoading(true);
        setFailedSearch(false);
        axios.get(`/searchShows?showType=${showType}&query=${encodeURIComponent(e.target[2].value)}`)
            .then(res => {
                const data = res.data;
                if (data && data.results) {
                    getResults(data.results);
                    setResultsLoading(false);
                } 
                else {
                  setFailedSearch(true);
                }
            })
            .catch(error => {
                console.error('Error fetching results:', error);
                setFailedSearch(true);
            });
      }
  };


  const checkStreaming = async (e) => {
    try {
      setStreamingError();
      setStreamingServices([]);
      setIsLoading(true);  
      const show_type = e.target.getAttribute('show_type');
      const imdb_id = e.target.getAttribute('imdb_id');
      const title = e.target.title;  
      const url = 'https://streaming-availability.p.rapidapi.com/search/pro';
      const headers = {
        'X-RapidAPI-Key': '153541ba38msh3a4675a0a844ccdp1a6a0cjsnc83d7caf9c90',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
      };  
      let results = [];
      const streamingServicesList = [
        'peacock',
        'netflix',
        'hulu',
        'prime',
        'disney', 
        'hbo'
      ];
      setStreamingId(imdb_id);
      for (const streamingService of streamingServicesList) {
        let params = {
          country: 'us',
          service: streamingService,
          type: show_type,
          order_by: 'original_title',
          output_language: 'en',
          language: 'en',
          keyword: `${title}`
        };
        const initialResponse = await axios.get(url, { params, headers });
        let found = processResults(initialResponse.data.results, imdb_id, results);
        if (initialResponse.data.total_pages > 1) {
          for (let page = 2; page <= initialResponse.data.total_pages; page++) {
            params = { ...params, page };
            const pageResponse = await axios.get(url, { params, headers, timeout: 7000 });
            found = processResults(pageResponse.data.results, imdb_id, results);
            if (found) break;
          }
        }
      }
      setIsLoading(false);
      setStreamingServices(processFinalResults(results));
    } 
    catch (error) {
      setIsLoading(false);
      setStreamingError("Something went wrong. Please reload the page and try again.");
    }
  }
  
  function processResults(results, imdb_id, existingResults) {
    let showToCheck
    for (const result of results) {
      if (result.imdbID === imdb_id) {
        showToCheck = result;
        break;
      }
    }
  
    if (showToCheck) {
      for (const key of Object.keys(showToCheck.streamingInfo)) {
        existingResults.push(key);
      }
      existingResults = [...new Set(existingResults)];
    }  
    return existingResults;
  }
  function processFinalResults(results) {
    const logos = {
      prime: primeLogo,
      netflix: netflixLogo,
      hulu: huluLogo,
      disney: disneyLogo,
      hbo: hboLogo,
      peacock: peacockLogo
    };
    let validResponses = results.map(service => logos[service] || service);
    validResponses = [...new Set(validResponses)];
    return validResponses.length === 0 ? [noStreaming] : validResponses;
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

  const changePasswordVisibility = (type) => {
    if(type=='original'){
      setPasswordVisibility(!passwordVisibility)
    }
    if(type=='confirmation'){
      setPasswordConfirmVisibility(!passwordConfirmVisibility)
    }
  }

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? title.slice(0, maxLength) + '…' : title;
  }

  return (
    <Router>
      <Header resetSlider={resetSlider} Link={Link} loginStatus={loginStatus} setUser={setUser} setLoginStatus={setLoginStatus} LogoutForm={LogoutForm} />
      <Routes>
        <Route path="/" element={<Home user={user} Link={Link}  results={results} getResults={getResults} fetchResults={fetchResults} setStreamingServices={setStreamingServices} streamingServices={streamingServices} checkStreaming={checkStreaming} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} streamingId={streamingId} noStreaming={noStreaming} showType={showType} setShowType={setShowType} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} isLoading={isLoading} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} failedSearch={failedSearch} setFailedSearch={setFailedSearch} resizeResetSlider={resizeResetSlider} resultsLoading={resultsLoading} resultsSpinnerDegree={resultsSpinnerDegree} truncateTitle={truncateTitle} streamingError={streamingError} />} />

        <Route path="register" element={<RegisterForm setUser={setUser} setLoginStatus={setLoginStatus} passwordVisibility={passwordVisibility} setPasswordVisibility={setPasswordVisibility} passwordConfirmVisibility={passwordConfirmVisibility} setPasswordConfirmVisibility={setPasswordConfirmVisibility} changePasswordVisibility={changePasswordVisibility} registerError={registerError} setRegisterError={setRegisterError} />} />

        <Route path="login" element={<LoginForm setLoginStatus={setLoginStatus} loginStatus={loginStatus} setUser={setUser} passwordVisibility={passwordVisibility} setPasswordVisibility={setPasswordVisibility} changePasswordVisibility={changePasswordVisibility} resetSlider={resetSlider} userShows={userShows} setUserShows={setUserShows} loginError={loginError} setLoginError={setLoginError} />} />

        <Route path="forgot-password" element={<ForgotPassword />} />

        <Route path="reset-password/:token" element={<ResetPassword passwordVisibility={passwordVisibility} setPasswordVisibility={setPasswordVisibility} passwordConfirmVisibility={passwordConfirmVisibility} setPasswordConfirmVisibility={setPasswordConfirmVisibility} changePasswordVisibility={changePasswordVisibility} />} />

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
