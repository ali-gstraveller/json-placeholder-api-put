import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, title, body } = req.body;

    if (!id || !title || !body) {
      return res.status(400).json({ error: 'id, title, and body are required' });
    }

    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { title, body },
        { headers: { 'Content-Type': 'application/json' } }
      );

      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ error: error.response?.data || error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
