import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-8`}
    >
      <div className="card">
        <h1 className="title">School Management</h1>
        <p className="subtitle">
          Manage schools easily — add new ones or explore the list.
        </p>
        <div className="actions">
          <a href="/addSchool" className="btn">
            Add School
          </a>
          <a href="/showSchools" className="btn secondary">
            Show Schools
          </a>
        </div>
      </div>

      <style jsx>{`
        .card {
          background: #ffffff;
          border-radius: 20px;
          padding: 3rem 2.5rem;
          max-width: 500px;
          text-align: center;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
        }
        .title {
          font-size: 2.4rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, #0070f3, #005bb5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .subtitle {
          font-size: 1.1rem;
          color: #555555;
          margin-bottom: 2.5rem;
        }
        .actions {
          display: flex;
          gap: 1.2rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn {
          padding: 0.95rem 1.8rem;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          background: #0070f3;
          color: #ffffff;
          transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        }
        .btn:hover {
          background: #005bb5;
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
        }
        .btn.secondary {
          background: #00b37e;
        }
        .btn.secondary:hover {
          background: #008f62;
        }
      `}</style>
    </div>
  );
}
