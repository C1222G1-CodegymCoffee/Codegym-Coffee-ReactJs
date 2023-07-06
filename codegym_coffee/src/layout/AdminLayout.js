import { useNavigate } from "react-router";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  if (!sessionStorage.getItem("TOKEN")) {
    navigate("/login");
    return;
  }

  if (sessionStorage.getItem("ROLES") !== "ROLE_ADMIN") {
    navigate("/accessDenied");
    return;
  }

  return <>{children}</>;
}
