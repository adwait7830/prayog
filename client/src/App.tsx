import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
const Home = lazy(() => import('./pages/home'));
const About = lazy(() => import('./pages/about'));
const Login = lazy(() => import('./pages/auth/login'));
const Register = lazy(() => import('./pages/auth/register'));
const Projects = lazy(() => import('./pages/projects'));
const Workshops = lazy(() => import('./pages/workshops'));
const ProjectsView = lazy(() => import('./pages/projects/view'));
const WorkshopsView = lazy(() => import('./pages/workshops/view'));
const Project = lazy(() => import('./pages/projects/project'));
const MyProjects = lazy(() => import('./pages/user/student/projects'));
const Student = lazy(() => import('./pages/user/student'));
const Admin = lazy(() => import('./pages/admin'));
const Institute = lazy(() => import('./pages/user/institute'));
const NotFound = lazy(() => import('./components/not-found'));
const MyWorkshops = lazy(() => import('./pages/user/institute/workshops'));
const InstituteDashboard = lazy(() => import('./pages/user/institute/dashboard'));
const AddProject = lazy(() => import('./pages/user/student/add-project'));
const AddWorkshop = lazy(()=>import('./pages/user/institute/add-workshop')) ;
const Students = lazy(()=>import('./pages/user/institute/dashboard/students')) ;
const MyDrafts  = lazy(()=>import('./pages/user/student/drafts'));
import Navbar from './components/navbar';
import Footer from './components/footer';
import Loader from './components/loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { Toaster } from 'react-hot-toast';
import ServerDown from './components/server-down';
import { adminLogin, adminLogout } from './redux/adminSlice';
import AdminDashboard from './pages/admin/admin-dashboard';
import { studentLogin, studentLogout } from './redux/studentSlice';
import { instituteLogin, instituteLogout } from './redux/instituteSlice';

function App() {
  const studentLogged = useSelector((state: RootState) => state.student.logged);
  const instituteLogged = useSelector((state: RootState) => state.institute.logged);
  const adminLogged = useSelector((state: RootState) => state.admin.logged);
  const logged = studentLogged || instituteLogged || adminLogged;

  const profileRoute = studentLogged ? (
    <Route path="/profile"  >

      <Route index={true} element={<Student />} />
      <Route path="projects" element={<MyProjects />} />
      <Route path="drafts" element={<MyDrafts />} />
      <Route path="add" element={<AddProject />} />

    </Route>
  )
    : instituteLogged ? (
      <Route path="/profile"  >

        <Route index={true} element={<Institute />} />
        <Route path="workshops" element={<MyWorkshops />} />
        <Route path='dashboard'>
          <Route index={true} element={<InstituteDashboard />}/>
          <Route path='students' element={<Students />}/>

        </Route>
        <Route path="add" element={<AddWorkshop />} />
        

      </Route>
    ) : null

  const adminRoute = adminLogged
    ? <Route path="/admin" element={<AdminDashboard />} />
    : <Route path="/admin" element={<Admin />} />

  const loginRoute = !logged ? (
    <Route path="/auth/login" element={<Login />} />
  ) : null;
  const registerRoute = !logged ? (
    <Route path="/auth/register" element={<Register />} />
  ) : null;

  const [isLoading, setLoading] = useState(true)

  const dispatch = useDispatch();
  useEffect(() => {
    const setSession = async () => {
      try {
        const response = await fetch(process.env.SERVER_URL + 'auth/get-details', {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem('jwt') || ''
          },
        });
        const data = await response.json();
        if (data.success) {
          if (data.type === 'student') {
            dispatch(studentLogin({ details: data.details }))
          } else {
            dispatch(instituteLogin({ details: data.details }))
          }
        } else {
          if (sessionStorage.getItem('jwt')) {
            dispatch(instituteLogout());
            dispatch(studentLogout());
          }
        }

        const response2 = await fetch(process.env.SERVER_URL + 'auth/get-admin', {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem('admin') || ''
          },
        })
        const data2 = await response2.json();
        if (data2.success) {
          dispatch(adminLogin({ details: data2.details }));
        } else {
          if (sessionStorage.getItem('admin')) {
            dispatch(adminLogout());
          }
        }
      } catch {
        return <ServerDown />
      } finally {
        setLoading(false);
      }
    };
    setSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <Suspense fallback={<Loader />}>
        {isLoading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/workshops" element={<Workshops />} />
            {profileRoute}
            {loginRoute}
            {registerRoute}
            {adminRoute}
            <Route path="/projects/view" element={<ProjectsView />} />
            <Route path="/workshops/view" element={<WorkshopsView />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        )}
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}
export default App
