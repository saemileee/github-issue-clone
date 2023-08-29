import {createBrowserRouter, Navigate} from 'react-router-dom';
import App from './App';
import ROUTES from './constants/routes';
import Issues from './pages/Issues/Issues';
import IssuePost from './pages/Issues/IssuePost';
import NotFound from './pages/NotFound';

export const Router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Navigate to={ROUTES.ISSUES} replace={true} />,
            },
            {
                path: ROUTES.ISSUES,
                element: <Issues />,
            },
            {
                path: `${ROUTES.ISSUES}/:id`,
                element: <IssuePost />,
            },
        ],
        errorElement: <NotFound />,
    },
]);
