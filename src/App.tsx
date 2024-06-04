import './scss/app.scss';
import Loadable from 'react-loadable';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import React, { Suspense } from 'react';

// const Cart = React.lazy(() => import('./pages/Cart'));

const Cart = Loadable({
  loader: () => import(/* webpackChukName: Cart */ './pages/Cart'),
  loading: () => <div>Идет загрузка корзины...</div>,
});

const FullPizza = React.lazy(() => import(/* webpackChukName: FullPizza */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChukName: NotFound */ './pages/NotFound'));

function App() {
  for (let i = 0; i < 122; i++) {
    console.log('аяр лох ' + i);
  }
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="/*"
          element={
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
