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
      <a
        href="/register"
        style={{
          display: "inline-block",
          margin: "16px 0",
          padding: "12px 32px",
          borderRadius: "24px",
          background: "#cec3e6",
          color: "#222",
          fontWeight: 600,
          fontSize: "18px",
          textDecoration: "none",
        }}
      >
        Sign Up
      </a>
      <ApiTest />
    </div>
  );
}