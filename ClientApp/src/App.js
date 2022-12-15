import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import {ApplicationProvider as MyProvider} from "./providers/Provider";
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <MyProvider>
        <Layout>
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
        </Layout>
      </MyProvider>
    );
  }
}
