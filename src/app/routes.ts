import { createBrowserRouter } from "react-router";
import { HomePage } from "@/app/pages/HomePage";
import { EvaluatePage } from "@/app/pages/EvaluatePage";
import { TeamFitPage } from "@/app/pages/TeamFitPage";
import { AboutPage } from "@/app/pages/AboutPage";
import { ContactPage } from "@/app/pages/ContactPage";
import { LoginPage } from "@/app/pages/LoginPage";
import { SignupPage } from "@/app/pages/SignupPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/evaluate",
    Component: EvaluatePage,
  },
  {
    path: "/team-fit",
    Component: TeamFitPage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/contact",
    Component: ContactPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
]);
