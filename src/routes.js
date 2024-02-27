import CoursesPage from "./pages/CoursesPage"
import MainPage from "./pages/MainPage"
import Page404 from "./pages/Page404"
import CoursePage from "./pages/CoursePage"
import AdminPage from "./pages/AdminPage"
import AdminCoursePage from "./pages/AdminCoursePage"
import AuthPage from "./pages/AuthPage"
import { ServiceADMIN_ROUTE, CourseADMIN_ROUTE, RequestADMIN_ROUTE, SERVICE_ROUTE, SERVICES_ROUTE, LICENSES_ROUTE, CONTACT_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE, PAGE404_ROUTE, MAINPAGE_ROUTE, COURSES_ROUTE, COURSE_ROUTE, REQUEST_ROUTE } from "./utils/consts"
import RequestPage from "./pages/RequestPage"
import ContactPage from "./pages/ContactPage"
import LicensePage from "./pages/LicensePage"
import ServicesPage from "./pages/ServicesPage"
import ServicePage from "./pages/ServicePage"
import AdminRequest from "./pages/AdminRequest"
import AdminOneRequest from "./pages/AdminOneRequest"
import AdminOneFirmRequest from "./pages/AdminOneFirmRequest"
import { Link } from "react-router-dom"
import AdminLicensePage from "./pages/AdminLicensePage"
import AdminLkPage from "./pages/AdminLkPage"
import AdminServicesPage from "./pages/AdminServicesPage"
import AdminServicePage from "./pages/AdminServicePage"

//описание всех маршуртов к страницам
export const authRoutes = [
    {
        path: CourseADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: ServiceADMIN_ROUTE,
        Component: AdminServicesPage
    },
    {
        path: ServiceADMIN_ROUTE + '/service/:service_id',
        Component: AdminServicePage
    },
    {
        path: CourseADMIN_ROUTE + '/course/:course_id',
        Component: AdminCoursePage
    },
    {
        path: RequestADMIN_ROUTE,
        Component: AdminRequest
    },
    {
        path: RequestADMIN_ROUTE + '/request/:request_id',
        Component: AdminOneRequest
    },
    {
        path: RequestADMIN_ROUTE + '/request_firm/:request_id',
        Component: AdminOneFirmRequest
    },
    {
        path: ADMIN_ROUTE + '/license',
        Component: AdminLicensePage
    },
    {
        path: ADMIN_ROUTE + '/settings',
        Component: AdminLkPage
    },
]

export const publicRoutes = [
    {
        path: PAGE404_ROUTE,
        Component: Page404
    },
    {
        path: MAINPAGE_ROUTE,
        Component: MainPage,
    },
    {
        path: COURSES_ROUTE,
        Component: CoursesPage,
    },
    {
        path: COURSE_ROUTE + '/:course_id',
        Component: CoursePage
    },
    {
        path: REQUEST_ROUTE,
        Component: RequestPage
    },
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: CONTACT_ROUTE,
        Component: ContactPage
    },
    {
        path: LICENSES_ROUTE,
        Component: LicensePage
    },
    {
        path: SERVICES_ROUTE,
        Component: ServicesPage
    },
    {
        path: SERVICE_ROUTE + '/:service_id',
        Component: ServicePage
    },
]