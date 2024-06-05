import { Route, Routes } from "react-router-dom";
import {
    HomePage,
    ForgotPassword,
    Login,
    NewPassword,
    Settings,
    LogActivity,
} from "./pages";
import { AuthLayout, DashLayout, Layout } from "./components/layouts/index";
import AddUser from "./pages/ManageUser/AddUser/index";
import ManageUserPage from "./UI/ManageUserPage";
import ManageApplicationPage from "./UI/ManageAppPage";
import { ToastContainer } from "react-toastify";
import RequireAuth from "./features/auth/RequireAuth";
import { Permission } from "./utils/roleUtilities";

const App = () => {
    return (
        <>
            <Routes>
                {/* Public Pages */}
                {/* Login Page */}
                <Route element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route
                        path='forgot-password'
                        element={<ForgotPassword />}
                    />
                    <Route path='reset-password' element={<NewPassword />} />
                </Route>

                {/* Protected Pages */}
                <Route element={<DashLayout />}>
                    {/* Home Page */}
                    <Route
                        path='home'
                        element={
                            <RequireAuth permissions={Permission.Home}>
                                <HomePage />
                            </RequireAuth>
                        }
                    />

                    {/* User Page */}
                    <Route path='user'>
                        <Route
                            index
                            element={
                                <RequireAuth permissions={Permission.User}>
                                    <ManageUserPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='add-user'
                            element={
                                <RequireAuth permissions={Permission.User}>
                                    <AddUser />
                                </RequireAuth>
                            }
                        />
                    </Route>

                    {/* Application Page */}
                    <Route
                        path='application'
                        element={
                            <RequireAuth permissions={Permission.Application}>
                                <ManageApplicationPage />
                            </RequireAuth>
                        }
                    />

                    {/* Log Activity Page */}
                    <Route path='log-activity' element={<LogActivity />} />
                    <Route path='setting' element={<Settings />} />
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
