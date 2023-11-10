import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import theme from "./theme";
import "./App.css";
import { createContext, useState } from "react";
import SnackBar from "./components/SnackBar";

export const SnackbarContext = createContext();

function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [snackbarText, setSnackbarText] = useState("");

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <SnackbarContext.Provider
        value={{
          snackbarOpen,
          snackbarSeverity,
          setSnackbarSeverity,
          snackbarText,
          setSnackbarText,
          handleSnackbarOpen,
          handleSnackbarClose,
        }}
      >
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/add-product" element={<ProductForm />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </SnackbarContext.Provider>
      {snackbarOpen && (
        <SnackBar
          severity={snackbarSeverity}
          text={snackbarText}
          open={snackbarOpen}
          handleClose={handleSnackbarClose}
        />
      )}
    </>
  );
}

export default App;
