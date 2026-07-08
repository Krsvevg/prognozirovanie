import { EmployeePage } from '@/Components/Layouts/EmployeeLayout';
import { EmployeeForecasting } from '@/Components/Pages/Employee/EmployeeForecasting';
import { ApplicantPage } from '@/Components/Layouts/ApplicantLayout/ApplicantLayout';
import { ApplicantForecasting } from '@/Components/Pages/Applicant/ApplicantForecasting';
import { Login } from '@/Components/Pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import '../styles/index.scss';
import './styles.scss';
import { EmployeeHelp } from '@/Components/Pages/Employee/EmployeeHelp';
import { EmployeeReports } from '@/Components/Pages/Employee/EmployeeReports';
import { RoleGuard } from '@/Components/Guards/RoleGuard';

function AppComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={<Login />} 
        />

        <Route
          path="/applicant"
          element={
            <RoleGuard role="applicant">
              <ApplicantPage/>
              </RoleGuard>
          }
        >
          <Route 
            index 
            element={
              <Navigate 
                to="forecasting" 
                replace
              />
              }
          />

          <Route
            path="forecasting"
            element={<ApplicantForecasting/>}
          />
        </Route>

        <Route
          path="/employee"
          element={
            <RoleGuard role="employee">
              <EmployeePage />
            </RoleGuard>
          }
        >
          <Route 
            index 
            element={
              <Navigate 
                to="forecasting" 
                replace 
              />
            } 
          />

          <Route 
            path="forecasting" 
            element={<EmployeeForecasting />} 
          />

          <Route 
            path="help" 
            element={<EmployeeHelp />} 
          />

          <Route 
            path="reports" 
            element={<EmployeeReports />} 
          />

        </Route>

        <Route 
          path="/" 
          element={
            <Navigate 
              to="/login" 
              replace 
            />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export const App = AppComponent;
