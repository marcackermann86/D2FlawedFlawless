import Results from './components/Results';
import Home from './components/Home';
import { Routes, Route, HashRouter } from "react-router-dom";
import { Container } from '@mui/material';
import * as React from 'react';

function App() {

  return (
        <HashRouter>
              <Routes>
                <Route exact path={"/"} element={<Home />} />
                <Route exact path={"/home"} element={<Home />} />
                <Route path={"/search"} element={<Results />} />
              </Routes>
              <Container style={{ marginTop: 24, paddingLeft: 0 }}>
              </Container>
          </HashRouter>
  );
}

export default App;