import React, { useEffect, useState } from 'react';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  useEffect(() => {
    fetch('/api/getSchools')
      .then(res => res.json())
      .then(data => setSchools(data));
  }, []);

  return (
    <div className="page">
      <h2 className="title">Our Schools</h2>
      <div className="grid">
        {schools.map((school) => (
          <div className="card" key={school.id}>
            <div className="img-wrapper">
              <img
                src={school.image || '/file.svg'}
                alt={school.name}
                className="school-img"
              />
            </div>
            <div className="content">
              <h3>{school.name}</h3>
              <p className="address">{school.address}</p>
              <p className="city">{school.city}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .page {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        .title {
          text-align: center;
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 2rem;
          color: #005bb5;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.5rem;
        }
        .card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          flex-direction: column;
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        .img-wrapper {
          height: 160px;
          overflow: hidden;
        }
        .school-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .card:hover .school-img {
          transform: scale(1.08);
        }
        .content {
          padding: 1rem;
          text-align: left;
        }
        h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #222;
          margin: 0 0 0.5rem;
        }
        .address {
          color: #555;
          font-size: 0.95rem;
          margin-bottom: 0.3rem;
        }
        .city {
          color: #0070f3;
          font-weight: 600;
          font-size: 0.95rem;
        }
        @media (max-width: 600px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
