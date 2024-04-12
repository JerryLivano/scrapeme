import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./app/redux/store.js";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
            <Provider store={Store}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/*' element={<App />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
    </React.StrictMode>
);
