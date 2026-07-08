import { Header } from "@/Components/Widgets/Header";
import { LeftLinks } from "@/Components/Widgets/LeftLinks/LeftLinks";
import { useAuthStore } from "@/store/authStore";
import { JSX, memo } from "react";
import { Outlet } from "react-router";
import styles from './Styles.module.scss';


const employeeLinks = [
  {
    name: 'Прогнозирование',
    link: '/employee/forecasting'
  },
  {
    name: 'Справка',
    link: '/employee/help'
  },
  {
    name: 'Отчёты',
    link: '/employee/reports'
  }
];


function EmployeeLayout(): JSX.Element {
  const role = useAuthStore(
    state => state.role
  );

  const roleName = {
    employee: 'Сотрудник вуза',
    applicant: 'Абитуриент',
    guest: 'Гость'
  }[role];

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Header role={roleName}/>
        <LeftLinks links={employeeLinks}/>
      </aside>
      <main className={styles.content}>
        <Outlet/>
      </main>
    </div>
  );
}

export const EmployeePage = memo(EmployeeLayout);