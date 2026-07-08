import { JSX, memo } from "react";
import { Outlet } from "react-router";
import { Header } from "@/Components/Widgets/Header";
import styles from "./Styles.module.scss";


function ApplicantLayoutComponent(): JSX.Element {

  return (
    <div className={styles.container}>

      <aside className={styles.sidebar}>
        <Header role="Абитуриент"/>
      </aside>


      <main className={styles.content}>
        <Outlet/>
      </main>

    </div>
  );
}


export const ApplicantPage = memo(ApplicantLayoutComponent);