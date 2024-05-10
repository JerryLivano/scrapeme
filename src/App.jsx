import { Route, Routes } from "react-router-dom";
import { HomePage, ForgotPassword, Login, NewPassword, Settings, ManageApp, ManageUser, LogActivity } from "./pages";
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
                    <Route element={<DashLayout />}>
                        <Route path='homepage' element={<HomePage />} />
                        <Route path='manageuser' element={<ManageUser />} />
                        <Route path='manageapp' element={<ManageApp />} />
                        <Route path='logactivity' element={<LogActivity />} />
                        <Route path='settings' element={<Settings />} />
             
                    </Route>
                </Route>
            </Routes>
        </>
    );
};

export default App;
