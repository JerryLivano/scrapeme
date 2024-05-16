import { Route, Routes } from "react-router-dom";
import {
    HomePage,
    ForgotPassword,
    Login,
    NewPassword,
    Settings,
    ManageApp,
    ManageUser,
    LogActivity,
} from "./pages";
import { AuthLayout, DashLayout, Layout } from "./components/layouts";
import AddUser from "./pages/ManageUser/AddUser";
import ManageUserpage from "./UI/ManageUserpage";

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
                        <Route path='user' element={<ManageUser />} />

                        <Route path='user/add-user' element={<AddUser />} />
                        {/* Application Page */}
                        <Route path='application' element={<ManageApp />} />

                        {/* Log Activity Page */}
                        <Route path='log-activity' element={<LogActivity />} />
                        <Route path='setting' element={<Settings />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
};

export default App;
