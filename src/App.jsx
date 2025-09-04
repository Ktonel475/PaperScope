import { Routes, Route } from "react-router-dom";
import AuthControl from "@/components/authControl";
{
  /* Import pages */
}
import PaperDetail from "@/pages/detailPage";
import PaperList from "@/pages/PaperList";
import PaperSearch from "@/pages/paperSearch";
import Dashboard from "@/pages/Admin/dashboard";
import MainLayout from "@/pages/mainlayout";
import Login from "@/pages/Admin/login";
import NotFoundPage from "@/pages/NotFoundPage";
import AboutPage from "@/pages/aboutPage";

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<PaperList />} />
        <Route path="/paper/:id" element={<PaperDetail />} />
        <Route path="/search" element={<PaperSearch />} />
      </Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <AuthControl>
            <Dashboard />
          </AuthControl>
        }
      />
    </Routes>
  );
}
