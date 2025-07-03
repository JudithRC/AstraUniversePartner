import type { Route } from "./+types/login"
import LoginPage from "../components/LoginPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Astra Universe Partner - Login" },
    { name: "description", content: "Sign in to Astra Universe Partner" },
  ]
}

export default function Login() {
  return <LoginPage />
}
