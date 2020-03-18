import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.scss'
import MainContainer from './containers/container'

ReactDOM.render(
    <BrowserRouter>
        <MainContainer />
    </BrowserRouter>,
    document.getElementById('root')
)
