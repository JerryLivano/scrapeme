import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./assets/redux/Store.js";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={Store}>
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path='/*' element={<App />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
);
