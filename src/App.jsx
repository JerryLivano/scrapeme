import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashboardLayout from "./components/layout/Dashboard/DashboardLayout";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ScrapePage from "./pages/ScrapePage/ScrapePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import RequireAuth from "./components/layout/RequireAuth";
import { Permission } from "./utils/roleUtilities";
import SitePage from "./pages/SitePage/SItePage";
import SiteRequestPage from "./pages/SiteRequestPage/SiteRequestPage";
import { extractGuid, extractRole, getAuthToken } from "./utils/authUtilities";
import AddSitePage from "./pages/SitePage/AddSitePage";
import EditSitePage from "./pages/SitePage/EditSitePage";

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
                    <Route
                        path='dashboard'
                        element={
                            <RequireAuth permissions={Permission.Dashboard}>
                                <DashboardPage />
                            </RequireAuth>
                        }
                    />

                    {/* Scrape */}
                    <Route
                        path='scrape'
                        element={
                            <RequireAuth permissions={Permission.Scrape}>
                                <ScrapePage />
                            </RequireAuth>
                        }
                    />

                    {/* Site */}
                    <Route path='site'>
                        <Route
                            index
                            element={
                                <RequireAuth permissions={Permission.Site}>
                                    <SitePage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='add-site'
                            element={
                                <RequireAuth permissions={Permission.Site}>
                                    <AddSitePage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='edit-site'
                            element={
                                <RequireAuth permissions={Permission.Site}>
                                    <EditSitePage />
                                </RequireAuth>
                            }
                        />
                    </Route>

                    {/* Site Request */}
                    <Route
                        path='request'
                        element={
                            <RequireAuth permissions={Permission.Request}>
                                <SiteRequestPage />
                            </RequireAuth>
                        }
                    />

                    {/* Category */}
                    {/* <Route
                        path='category'
                        element={
                            <RequireAuth permissions={Permission.Category}>
                                <CategoryPage />
                            </RequireAuth>
                        }
                    /> */}

                    {/* Account */}
                    <Route
                        path='account'
                        element={
                            <RequireAuth permissions={Permission.Account}>
                                <AccountPage />
                            </RequireAuth>
                        }
                    />
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
