import { createBrowserRouter } from 'react-router-dom';
import { HomePage, ErrorPage, ForgotPassword, Login, ManageApp, ManageUser, LogActivity, AppList, AddUser } from '../pages';
import  ManageUserPage  from "../UI/ManageUserpage"
import Reference from '../Reference';
import ManageUserpage from '../UI/ManageUserpage';

const router = createBrowserRouter([
    {
        path: '/error-page',
        element: <ErrorPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/reference',
        element: <Reference />,
    },
    {
        path: '/home',
        element: <HomePage />,
    },
    {
        path: '/application',
        element: <ManageApp />,
    },
    {
        path: '/user',
        element: <ManageUserpage />,
    },
    {
        path: '/log-activity',
        element: <LogActivity />,
    },
    {
        path: '/applist',
        element: <AppList />,
    },
    {
        path: '/add-user',
        element: <AddUser />,
    },


]);

// export default router;
