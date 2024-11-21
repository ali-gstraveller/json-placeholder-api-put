import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { useState } from 'react';
import axios from 'axios';



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put('/api/updatePost', { id, title, body });
      setResponse(res.data);
    } catch (error) {
      setResponse({ error: error.response?.data?.error || error.message });
    }
  };


  return (
    <div style={{ padding: '20px' }}>
      <h1>Update Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Post ID:
            <input
              type="number"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Body:
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Update</button>
      </form>
      {response && (
        <div style={{ marginTop: '20px' }}>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
