import type { Route } from "./+types/home";
import ApiTest from "../components/ApiTest";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Astra Universe Partner - Home" },
    { name: "description", content: "Welcome to Astra Universe Partner!" },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <ApiTest />
    </div>
  );
}