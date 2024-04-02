import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Dashboard, ForgotPassword, LayoutDashboard } from "./pages";
import { Layout } from "./components/layouts";
import ExampleOne from "./pages/ExampleOne";

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route path='login' element={<Login />} />
                    <Route
                        path='forgot-password'
                        element={<ForgotPassword />}
                    />
                </Route>
                <Route path='/' element={<LayoutDashboard />}>
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='parent/children' element={<ExampleOne />} />
                </Route>
                 
            </Routes>
        </>
    );
}

export default App;
