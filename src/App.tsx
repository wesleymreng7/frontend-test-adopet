import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import { useAuthApi, apiKey } from './api'

const App: React.FC = () => {
  const { dataRequest, sessionRequest } = useAuthApi();
  const requestToken = localStorage.getItem('requestToken');
  const getInitAccessToken = async () => {
    await sessionRequest({
      system_api_key: apiKey
    });
  }
  useEffect(() => {
    if (!requestToken && !dataRequest.loading) {
      getInitAccessToken();
    }
    if (!dataRequest.loading && dataRequest.data.data) {
      localStorage.setItem('requestToken', dataRequest.data.data.access_key);
    }
  }, [dataRequest]);
  
  if (dataRequest.loading) {
    return <h1>Loading Application...</h1>;
  }
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
      </div>
    </Router>
  );

}

export default App;
