import React from 'react'
import Header from './components/common/header';
import List from './components/list/list';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import Detail from './components/detail/detail';
import NotFound from './components/notFound/notFound';

function App() {
  return (
    <BrowserRouter>
     <div>
      <Header/>
      <Routes>
        <Route path={'/'} element={<List/>}/>
        <Route path={'/currency/:id'} element={<Detail/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
     </div>
    </BrowserRouter>
  );
}


export default App;
