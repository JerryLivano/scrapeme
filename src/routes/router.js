import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage, ForgotPassword, Login } from '../pages';
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
]);

export default router;
