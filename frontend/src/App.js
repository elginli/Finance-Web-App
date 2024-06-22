import './App.css';
import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import axios from 'axios'
import Router from './components/Router'


function App() {

  return (
    <>
      <Router />
    </>
  );
}

export default App;
