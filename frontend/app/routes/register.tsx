import type { Route } from "./+types/register"
import RegisterPage from "../components/RegisterPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Astra Universe Partner - Register" },
    { name: "description", content: "Create your account for Astra Universe Partner" },
  ]
}

export default function Register() {
  return <RegisterPage />
}
