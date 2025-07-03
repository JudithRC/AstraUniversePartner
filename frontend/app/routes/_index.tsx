import type { Route } from "./+types/_index"
import LandingPage from "../components/LandingPage"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Astra Universe Partner" },
    { name: "description", content: "Explore the Galaxy, Create Your Legend" },
  ]
}

export default function Index() {
  return <LandingPage />
}
