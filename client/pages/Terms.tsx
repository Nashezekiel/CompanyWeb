import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-[60vh] py-16">
      <div className="container max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Terms & Conditions</h1>
        <hr className="my-6" />
        <p className="text-foreground/70 mb-6">
          These terms govern your use of our website and services. Please read them carefully.
        </p>
        <p className="text-sm text-foreground/60">
          For questions, contact us via the <Link className="text-primary hover:underline" to="/contact">Contact</Link> page.
        </p>
      </div>
    </div>
  );
}
