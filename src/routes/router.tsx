import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import PATHS from '.'
import App from '@/App';
import { lazy } from 'react';
const Home = lazy(() => import('@/pages'));
const CulvertLayout = lazy(() => import('@/layouts/CulvertLayout'));
const CulvertHome = lazy(() => import('@/pages/Culvert'));
const ConduitFlow = lazy(() => import('@/pages/Culvert/ConduitFlow'));
const CulvertRating = lazy(() => import('@/pages/Culvert/CulvertRating'));
const HWOutletProtection = lazy(() => import('@/pages/Culvert/HWOutletProtection'));
const Profile = lazy(() => import('@/pages/Culvert/Profile'));
const Versions = lazy(() => import('@/pages/Culvert/Versions'));
const Documentation = lazy(() => import('@/pages/Culvert/Documentation'));
const LOMCLayout = lazy(() => import('@/layouts/LOMCLayout'));
const LOMC = lazy(() => import('@/pages/LOMC'));
const LOMCSettings = lazy(() => import('@/pages/LOMC/Settings/Settings'));
const LOMCMap = lazy(() => import('@/pages/LOMC/Map'));
const Rational = lazy(() => import('@/pages/Rational'));
const About = lazy(() => import('@/pages/About'));

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={PATHS.APP} element={<App />}>
            <Route index element={<Home />} />
            <Route path={PATHS.CULVERT.HOME} element={<CulvertLayout />}>
                <Route index element={<CulvertHome />} />
                <Route path={PATHS.CULVERT.CONDUIT_FLOW} element={<ConduitFlow />} />
                <Route path={PATHS.CULVERT.CULVERT_RATING} element={<CulvertRating />} />
                <Route path={PATHS.CULVERT.HW_OUTLET_PROTECTION} element={<HWOutletProtection />} />
                <Route path={PATHS.CULVERT.PROFILE} element={<Profile />} />
                <Route path={PATHS.CULVERT.PREVIOUS_VERSIONS} element={<Versions />} />
                <Route path={PATHS.CULVERT.DOCUMENTATION} element={<Documentation />} />
            </Route>
            <Route path={PATHS.LOMC.HOME} element={<LOMCLayout />}>
                <Route index element={<LOMC />} />
                <Route path={PATHS.LOMC.MAP} element={<LOMCMap />} />
                <Route path={PATHS.LOMC.SETTINGS} element={<LOMCSettings />} />
            </Route>
            <Route path={PATHS.RATIONAL.HOME} element={<Rational />} />
            <Route path={PATHS.ABOUT} element={<About />} />
            <Route path={PATHS.UNKNOWN} element={<Navigate to={PATHS.HOME} replace />} />
        </Route>
    )
)