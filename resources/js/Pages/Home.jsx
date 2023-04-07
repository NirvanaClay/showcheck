import { useEffect, useState } from 'react'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import React from 'react';
import ReactDOM from 'react-dom';

import Axios from '../axiosConfig'

import Form from "../Components/Form"
import StreamService from '../Components/StreamService'
import Result from '../Components/Result'
import ShowUser from '../Components/ShowUser'
import ShowGuest from '../Components/ShowGuest'
import RegisterForm from '../Components/RegisterForm'
import Greeting from '../Components/Greeting'

import axios from '../axiosConfig';

const Home = ({ user, streamingServices, fetchResults, results, getResults, checkStreaming, sliderPosition, setSliderPosition, showType, setShowType, streamingId, noStreaming, series, getSeries, movies, getMovies, isLoading, spinnerDegree, setSpinnerDegree, failedSearch, setFailedSearch, resizeResetSlider, resultsLoading, resultsSpinnerDegree }) => {
  return (
    <div className="home">
      <div className='bg-img'></div>
      <Form user={user} Link={Link} results={results} getResults={getResults} fetchResults={fetchResults} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} checkStreaming={checkStreaming} streamingServices={streamingServices} showType={showType} setShowType={setShowType} streamingId={streamingId} noStreaming={noStreaming} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} isLoading={isLoading} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} failedSearch={failedSearch} setFailedSearch={setFailedSearch} resizeResetSlider={resizeResetSlider} resultsLoading={resultsLoading} resultsSpinnerDegree={resultsSpinnerDegree} />

    </div>
  );
}

export default Home;
