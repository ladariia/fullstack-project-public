import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import './styles/App.css'
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import { Spinner } from "react-bootstrap";
import { check } from "./http/userAPI";

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner className="spinner-grow" />
  }
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
})

export default App;
