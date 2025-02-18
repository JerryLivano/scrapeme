import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./app/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/*' element={<App />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
    </React.StrictMode>
);
