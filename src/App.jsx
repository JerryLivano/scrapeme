import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { ForgotPassword } from './pages';
import { Layout } from './components/layouts';
import Reference from './Reference';
import { SidebarComponent } from './components/fragments';

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
                    <Route path="reference" element={<Reference />} />
                    <Route path="sidebar" element={<SidebarComponent />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
