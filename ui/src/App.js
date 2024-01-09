import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import Navbar from "./componenets/Navbar";
import { Routes, Route} from 'react-router';
import Home from "./componenets/Home";
import Products from "./componenets/Products";
import Pricing from "./componenets/Pricing";
import Blog from "./componenets/Blog";
import {BrowserRouter} from "react-router-dom";
import './App.css'
import { useMemo, useState, useEffect } from "react";


function App(props) {
  const theme = useTheme();
  const { toggleTheme } = props;

  return (
      <BrowserRouter>
          <Box
          >
              <Navbar toggleTheme={toggleTheme} theme={theme}/>
              <Box
                  sx={theme.pageBox}
              >
                  <Routes>
                      <Route path='/' element={<Home />}/>
                      <Route path='products' element={<Products />}/>
                      <Route path='pricing' element={<Pricing />}/>
                      <Route path='blog' element={<Blog />}/>
                  </Routes>
              </Box>
          </Box>
      </BrowserRouter>
  );
}

export default function ToggleColorMode() {
  const [appTheme] = useState(() => {
    const savedTheme = JSON.parse(localStorage.getItem('theme'));
    return savedTheme || 'light'
  });
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
      const updatedTheme = mode === 'light' ? 'dark' : 'light';
      setMode(updatedTheme);
      localStorage.setItem('theme', JSON.stringify(updatedTheme));
  }

  const theme = useMemo(
      () =>
          createTheme({
            palette: {
              mode,
            },
            pageBox: {
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
                p: 3,
            }
          }),
      [mode],
  );

  useEffect(() => {
    if (appTheme) {
        setMode(appTheme)
    }
  }, [])

  return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <App toggleTheme={toggleTheme}/>
        </ThemeProvider>
  );
}
