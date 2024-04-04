import { Route, Routes } from "react-router-dom";
import { Dashboard, ForgotPassword, Login, NewPassword, Users } from "./pages";
import { AuthLayout, DashLayout, Layout } from "./components/layouts";

const App = () => {
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
                    {/* <Route element={<DashLayout />}>
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='users' element={<Users />} />
                    </Route> */}
                </Route>
            </Routes>
        </>
    );
};

export default App;
