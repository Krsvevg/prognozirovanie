import { Navigate } from "react-router";
import { useAuthStore } from "@/store/authStore";


interface RoleGuardProps {
  children: React.ReactNode;
  role: "employee" | "applicant";
}


export function RoleGuard({
  children,
  role
}: RoleGuardProps) {

  const userRole = useAuthStore(
    state => state.role
  );


  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }


  return children;
}