import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="min-h-[60vh] py-16">
      <div className="container max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <hr className="my-6" />
        <p className="text-foreground/70 mb-6">
          We value your privacy. This page outlines how we collect, use, and protect your information.
        </p>
        <p className="text-sm text-foreground/60">
          For questions, contact us via the <Link className="text-primary hover:underline" to="/contact">Contact</Link> page.
        </p>
      </div>
    </div>
  );
}
