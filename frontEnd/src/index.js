import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/es/integration/react";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="226311912125-tpmbf5oplf7hbop4j78rvpj04tl7mjoe.apps.googleusercontent.com">
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      </Provider>
      </GoogleOAuthProvider>
      <CssBaseline />
    </BrowserRouter>
  </React.StrictMode>
);
