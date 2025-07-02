import type { Route } from "./+types/home"
import LandingPage from "../components/LandingPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Astra Universe Partner - Home" },
    { name: "description", content: "Welcome to Astra Universe Partner!" },
  ]
}

export default function Home() {
  return <LandingPage />
}
