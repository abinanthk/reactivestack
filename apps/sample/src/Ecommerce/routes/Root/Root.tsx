import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Home, Login } from "../../pages";
import { MainLayout } from "@/Ecommerce/layouts/MainLayout";

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <MainLayout>
              <Outlet />
            </MainLayout>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
