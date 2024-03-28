import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { Dashboard, ForgotPassword } from './pages';
import { Layout } from './components/layouts';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route path="login" element={<Login />} />

                    <Route
                        path="forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
