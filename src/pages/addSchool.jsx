import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    if (data.image && data.image[0]) {
      formData.set('image', data.image[0]);
    }

    try {
      const res = await fetch('/api/addSchool', {
        method: 'POST',
        body: formData,
      });

      let result;
      try {
        result = await res.json();
      } catch {
        throw new Error("Server did not return JSON. Likely an API crash.");
      }

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setMessage('School added successfully!');
      reset();
      setImagePreview(null);
    } catch (err) {
      setMessage(` ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Add School</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="field">
          <label>School Name</label>
          <input {...register('name', { required: true })} placeholder="Enter school name" />
          {errors.name && <span>Name is required</span>}
        </div>

        <div className="field">
          <label>Address</label>
          <input {...register('address', { required: true })} placeholder="Enter address" />
          {errors.address && <span>Address is required</span>}
        </div>

        <div className="field">
          <label>City</label>
          <input {...register('city', { required: true })} placeholder="Enter city" />
          {errors.city && <span>City is required</span>}
        </div>

        <div className="field">
          <label>State</label>
          <input {...register('state', { required: true })} placeholder="Enter state" />
          {errors.state && <span>State is required</span>}
        </div>

        <div className="field">
          <label>Contact Number</label>
          <input {...register('contact', { required: true, pattern: /^[0-9]{10,}$/ })} placeholder="Enter contact number" />
          {errors.contact && <span>Valid contact is required</span>}
        </div>

        <div className="field">
          <label>School Image</label>
          <input type="file" {...register('image', { required: true })} accept="image/*" onChange={handleImageChange} />
          {errors.image && <span>Image is required</span>}
          {imagePreview && (
            <div className="img-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <div className="field">
          <label>Email</label>
          <input {...register('email_id', { required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ })} placeholder="Enter email" />
          {errors.email_id && <span>Valid email is required</span>}
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Submitting...' : 'Add School'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}

      <style jsx>{`
        .container {
          max-width: 550px;
          margin: 3rem auto;
          padding: 2.5rem;
          background: linear-gradient(135deg, #ffffff 0%, #f9fbff 100%);
          border-radius: 16px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.08);
          transition: transform 0.2s;
        }
        .container:hover {
          transform: translateY(-3px);
        }
        .title {
          text-align: center;
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 2.5rem;
          background: linear-gradient(90deg, #0070f3, #005bb5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        label {
          font-weight: 600;
          color: #222;
        }
        input {
          padding: 0.8rem 1rem;
          border: 1.5px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          background: #fdfdfd;
          transition: border 0.2s, box-shadow 0.2s;
        }
        input:focus {
          border-color: #0070f3;
          box-shadow: 0 0 0 3px rgba(0,118,255,0.2);
          outline: none;
        }
        input[type="file"] {
          padding: 0.4rem 0;
          background: none;
        }
        .img-preview {
          margin-top: 0.7rem;
          text-align: center;
        }
        .img-preview img {
          max-width: 200px;
          max-height: 140px;
          border-radius: 10px;
          border: 2px solid #eee;
          box-shadow: 0 3px 12px rgba(0,0,0,0.15);
        }
        .submit-btn {
          background: linear-gradient(90deg, #0070f3 0%, #005bb5 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0.9rem 1.6rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 3px 10px rgba(0,0,0,0.12);
          transition: background 0.2s, transform 0.2s;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          background: linear-gradient(90deg, #005bb5 0%, #003f88 100%);
        }
        .submit-btn:disabled {
          background: #eaeaea;
          color: #888;
          cursor: not-allowed;
        }
        span {
          color: #d93025;
          font-size: 0.9rem;
        }
        .message {
          text-align: center;
          margin-top: 1.4rem;
          font-weight: 600;
          color: #005bb5;
          font-size: 1.05rem;
        }
        @media (max-width: 600px) {
          .container {
            max-width: 100%;
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
