import { useMemo, lazy, Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline, CircularProgress } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { themeSettings } from "../theme";

import Navbar from "@/components/Navbar";
import Dashboard from "@/scenes/dashboard";
const Predictions = lazy(() => import("@/scenes/predictions"));

export default function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Suspense
              fallback={
                <Box
                  height="100vh"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CircularProgress size={80}/>
                </Box>
              }
            >
              <Routes>
                <Route
                  path="/"
                  element={<Navigate replace to="/dashboard" />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/predictions" element={<Predictions />} />
              </Routes>
            </Suspense>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
