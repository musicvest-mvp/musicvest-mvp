import React from 'react';
import { AuthProvider } from './hooks/use-auth';
import { Switch, Route, useLocation } from 'wouter';

const HomePage = React.lazy(() => import('./pages/home-page'));
const AuthPage = React.lazy(() => import('./pages/auth-page'));

const App: React.FC = () => {
    const [location] = useLocation();

    const routes = [
        { path: '/', component: HomePage },
        { path: '/login', component: AuthPage },
    ];

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <AuthProvider>
                <Switch>
                    {routes.map((route) => (
                        <Route key={route.path} path={route.path} component={route.component} />
                    ))}
                </Switch>
            </AuthProvider>
        </React.Suspense>
    );
};

export default App;