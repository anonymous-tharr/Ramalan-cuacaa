export default async function handler(req, res) {
  const city = req.query.city || '';
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing OPENWEATHER_API_KEY' });
  }

  if (!city) {
    return res.status(400).json({ error: 'Missing "city" query parameter' });
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=id`);
    const data = await response.json();
    // forward status code if OpenWeather returns error
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
