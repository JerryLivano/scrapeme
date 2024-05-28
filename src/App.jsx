import { Route, Routes } from "react-router-dom";
import {
    HomePage,
    ForgotPassword,
    Login,
    NewPassword,
    Settings,
    LogActivity,
} from "./pages";
import { AuthLayout, DashLayout, Layout } from "./components/layouts";
import AddUser from "./pages/ManageUser/AddUser";
import ManageUserPage from "./UI/ManageUserPage";
import ManageApplicationPage from "./UI/ManageAppPage";
import { ToastContainer } from "react-toastify";

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
                        {/* Home Page */}
                        <Route path='home' element={<HomePage />} />

                        {/* User Page */}
                        <Route path='user'>
                            <Route index element={<ManageUserPage />} />
                            <Route path='add-user' element={<AddUser />} />
                        </Route>

                        {/* Application Page */}
                        <Route path='manage-application' element={<ManageApplicationPage />} />

                        {/* Log Activity Page */}
                        <Route path='log-activity' element={<LogActivity />} />
                        <Route path='setting' element={<Settings />} />
                    </Route>
                </Route>
            </Routes>
            <ToastContainer
                position='top-center'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme='light'
            />
        </>
    );
};

export default App;
