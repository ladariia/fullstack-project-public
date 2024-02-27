import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CourseStore from './store/CourseStore';
import SheduleStore from './store/SheduleStore';
import UserStore from './store/UserStore';
import ModuleStore from './store/ModuleStore';
import LicenseStore from './store/LicenseStore';
import ServiceStore from './store/ServiceStore';
import RequestStore from './store/RequestStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    course: new CourseStore(),
    shedule: new SheduleStore(),
    module: new ModuleStore(),
    license: new LicenseStore(),
    service1: new ServiceStore(),
    service2: new ServiceStore(),
    service3: new ServiceStore()
  }}>
    <App />
  </Context.Provider>
);