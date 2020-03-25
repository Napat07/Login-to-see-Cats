import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BearList from './components/BearList'
import InputForm from './components/InputForm';
import axios from 'axios';

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
      <h2>Bears</h2>
      <BearList />
      <InputForm />
    </div>
  )
}
