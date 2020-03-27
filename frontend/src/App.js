import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BearList from './components/BearList'
import InputForm from './components/InputForm';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'


export default () => {
  const CheckToken = async () => {
    axios.get('http://localhost:80/test', { withCredentials: true })
      .catch((err) => window.location.href = "http://localhost:80")
  }

  useEffect(() => {
    CheckToken()
  }, [])

  return (
    <div>
      <InputForm />
      <h2>-----------------------------</h2>
      <h2>Cats</h2>
      <BearList />
    </div>
  )
}
