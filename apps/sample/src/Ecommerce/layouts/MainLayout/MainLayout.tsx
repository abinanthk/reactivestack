import { NavBar } from "@/Ecommerce/routes/NavBar";
import { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
    </div>
  );
};
