import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/presentation/components/layout';

// Páginas
import HomePage from '@/presentation/pages/Home/HomePage';
import DepartmentsPage from '@/presentation/pages/Departments/DepartmentsPage';
import DepartmentDetailPage from '@/presentation/pages/Departments/DepartmentDetailPage';
import RegionsPage from '@/presentation/pages/Regions/RegionsPage';
import TourismPage from '@/presentation/pages/Tourism/TourismPage';
import NotFoundPage from '@/presentation/pages/NotFound/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout><HomePage /></MainLayout>,
  },
  {
    path: '/departments',
    element: <MainLayout><DepartmentsPage /></MainLayout>,
  },
  {
    path: '/departments/:id',
    element: <MainLayout><DepartmentDetailPage /></MainLayout>,
  },
  {
    path: '/regions',
    element: <MainLayout><RegionsPage /></MainLayout>,
  },
  {
    path: '/tourism',
    element: <MainLayout><TourismPage /></MainLayout>,
  },
  {
    path: '*',
    element: <MainLayout><NotFoundPage /></MainLayout>,
  },
]);
