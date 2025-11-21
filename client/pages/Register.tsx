import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Simple client template: store user in session
    sessionStorage.setItem("user", email);
    navigate("/login");
  }

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-md">
        <div className="rounded-2xl border bg-card p-8">
          <h2 className="mb-4 text-2xl font-bold">Register</h2>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <label className="grid gap-1">
              <span className="text-sm font-medium">Email</span>
              <input required value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium">Password</span>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-ring" />
            </label>

            <div className="flex items-center gap-3">
              <Button type="submit">Create Account</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
