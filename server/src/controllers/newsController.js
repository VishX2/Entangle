const config = require('../config');

/**
 * Server-side proxy for NewsAPI. Browser calls are blocked on the Developer plan
 * except from localhost; production clients must use this route.
 */
async function headlines(req, res) {
  try {
    if (!config.newsApiKey) {
      return res.json({ articles: [] });
    }

    const url = new URL('https://newsapi.org/v2/top-headlines');
    url.searchParams.set('category', 'business');
    url.searchParams.set('language', 'en');
    url.searchParams.set('pageSize', '6');
    url.searchParams.set('apiKey', config.newsApiKey);

    const newsRes = await fetch(url);
    const data = await newsRes.json().catch(() => ({}));

    if (!newsRes.ok || data.status === 'error') {
      console.error('NewsAPI error:', data?.message || data?.code || newsRes.status);
      return res.json({ articles: [] });
    }

    return res.json({ articles: Array.isArray(data.articles) ? data.articles : [] });
  } catch (err) {
    console.error('News fetch error:', err.message);
    return res.json({ articles: [] });
  }
}

module.exports = { headlines };
