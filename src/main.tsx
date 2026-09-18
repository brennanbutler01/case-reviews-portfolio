import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './routes/home'
import ReviewsPage from './routes/reviews'
import StaffPage from './routes/staff'
import AuthGuard from '@/components/authGuard'
import Auth0ProviderWithNavigate from '@/components/auth0ProviderWithNavigate'
import { CallbackPage } from '@/routes/callback'
import ErrorPage from '@/routes/error'
import StatsPage from '@/routes/stats'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithNavigate>
                <Routes>
                    <Route path={'*'} element={<ErrorPage />} />
                    <Route path={'/'} element={<HomePage />} />
                    <Route path={'/callback'} element={<CallbackPage />} />
                    <Route
                        path={'/reviews'}
                        element={<AuthGuard component={ReviewsPage} />}
                    />
                    <Route
                        path={'/staff'}
                        element={<AuthGuard component={StaffPage} />}
                    />
                    <Route
                        path={'/stats'}
                        element={<AuthGuard component={StatsPage} />}
                    />
                </Routes>
            </Auth0ProviderWithNavigate>
        </BrowserRouter>
    </React.StrictMode>,
)
