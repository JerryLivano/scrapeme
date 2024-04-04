import { Route, Routes } from "react-router-dom";
import { AuthLayout, Layout } from "./components/layouts";
import { ForgotPassword, Login, NewPassword } from "./pages";

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    {/* Public Pages */}
                    <Route element={<AuthLayout />}>
                        <Route index element={<Login />} />
                        <Route path='login' element={<Login />} />
                        <Route path='password'>
                            <Route path='forgot' element={<ForgotPassword />} />
                            <Route
                                path='new/:token'
                                element={<NewPassword />}
                            />
                        </Route>
                    </Route>

                    {/* Protected Pages */}
                </Route>

                {/* <Route
                    path='/'
                    element={
                        <PrivateRoute>
                            <LayoutDashboard />
                        </PrivateRoute>
                    }
                >
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route
                        path='parent/children'
                        element={
                            <AdminRoute>
                                <Users />
                            </AdminRoute>
                        }
                    />
                </Route> */}
            </Routes>
        </>
    );
}

export default App;
