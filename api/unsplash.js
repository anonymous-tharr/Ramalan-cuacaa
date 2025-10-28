export default async function handler(req, res) {
  const city = req.query.city || '';
  const apiKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing UNSPLASH_ACCESS_KEY' });
  }

  if (!city) {
    return res.status(400).json({ error: 'Missing "city" query parameter' });
  }

  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&client_id=${apiKey}&orientation=landscape&per_page=6`);
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}