import { useNavigate } from "react-router";

export default function MainLayout({ children }) {
  const navigate = useNavigate();

  if (!sessionStorage.getItem("TOKEN")) {
    navigate("/login");
    return;
  }

  return <>{children}</>;
}
