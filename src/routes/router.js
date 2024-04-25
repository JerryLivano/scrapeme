import { createBrowserRouter } from 'react-router-dom';
import { HomePage, ErrorPage, ForgotPassword, Login, ManageApp, ManageUser, LogActivity, AppList } from '../pages';
import Reference from '../Reference';

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
        path: '/homepage',
        element: <HomePage />,
    },
    {
        path: '/manageapp',
        element: <ManageApp />,
    },
    {
        path: '/manageuser',
        element: <ManageUser />,
    },
    {
        path: '/logactivity',
        element: <LogActivity />,
    },
    {
        path: '/applist',
        element: <AppList />,
    },

]);

// export default router;
