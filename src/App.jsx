import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashboardLayout from "./components/layout/Dashboard/DashboardLayout";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ScrapePage from "./pages/ScrapePage/ScrapePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import AccountPage from "./pages/AccountPage/AccountPage";

const App = () => {
    return (
        <>
            <Routes>
                {/* Public Pages */}
                {/* Login Page */}
                <Route index element={<LoginPage />} />
                <Route path='register' element={<RegisterPage />} />

                {/* Private Route */}
                <Route element={<DashboardLayout />}>
                    {/* Dashboard */}
                    <Route path='dashboard' element={<DashboardPage />} />

                    {/* Scrape */}
                    <Route path='scrape' element={<ScrapePage />} />

                    {/* Category */}
                    <Route path='category' element={<CategoryPage />} />

                    {/* Account */}
                    <Route path='account' element={<AccountPage />} />
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
