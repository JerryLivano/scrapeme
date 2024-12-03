import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashboardLayout from "./components/layout/Dashboard/DashboardLayout";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ScrapePage from "./pages/ScrapePage/ScrapePage";
import AccountPage from "./pages/AccountPage/AccountPage";
import RequireAuth from "./components/layout/RequireAuth";
import { Permission } from "./utils/roleUtilities";
import SitePage from "./pages/SitePage/SitePage";
import SiteRequestPage from "./pages/SiteRequestPage/SiteRequestPage";
import AddSitePage from "./pages/SitePage/AddSitePage";
import EditSitePage from "./pages/SitePage/EditSitePage";
import ManageTemplatePage from "./pages/SitePage/TemplatePage/ManageTemplatePage";
import ScrapeSitePage from "./pages/ScrapePage/ScrapeSitePage";
import ScrapeHistoryPage from "./pages/ScrapePage/ScrapeHistoryPage";
import ScrapedDataPage from "./pages/ScrapePage/ScrapedDataPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

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
                    <Route path='scrape'>
                        <Route
                            index
                            element={
                                <RequireAuth permissions={Permission.Scrape}>
                                    <ScrapePage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path=':guid'
                            element={
                                <RequireAuth permissions={Permission.Scrape}>
                                    <ScrapeSitePage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='history'
                            element={
                                <RequireAuth permissions={Permission.History}>
                                    <ScrapeHistoryPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='history/:guid'
                            element={
                                <RequireAuth permissions={Permission.History}>
                                    <ScrapedDataPage />
                                </RequireAuth>
                            }
                        />
                    </Route>

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
                        <Route
                            path='template'
                            element={
                                <RequireAuth permissions={Permission.Template}>
                                    <ManageTemplatePage />
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

                    {/* Account */}
                    <Route
                        path='account'
                        element={
                            <RequireAuth
                                permissions={Permission.Account}
                                children={<AccountPage />}
                            >
                                <AccountPage />
                            </RequireAuth>
                        }
                    />
                </Route>

                <Route path='/*' element={<NotFoundPage />} />
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
