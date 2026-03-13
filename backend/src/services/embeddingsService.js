/**
 * OpenAI Embeddings Service
 * Used for semantic similarity in AI matchmaking.
 * Falls back gracefully when OPENAI_API_KEY is not set.
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
let openaiClient = null;

function getClient() {
  if (!OPENAI_API_KEY || OPENAI_API_KEY === '') return null;
  if (!openaiClient) {
    try {
      const { OpenAI } = require('openai');
      openaiClient = new OpenAI({ apiKey: OPENAI_API_KEY });
    } catch (err) {
      console.warn('[embeddings] OpenAI client init failed:', err.message);
      return null;
    }
  }
  return openaiClient;
}

function buildProfileText(company) {
  const parts = [
    company.name || '',
    company.description || '',
    company.investment_focus || '',
    company.funding_stage || '',
    company.headquarters || '',
  ].filter(Boolean);
  return parts.join(' ').trim().slice(0, 8000) || 'No profile';
}

/**
 * Get embedding vector for a company profile.
 * @param {Object} company - Company object
 * @returns {Promise<number[]|null>} Embedding vector or null if unavailable
 */
async function getEmbedding(company) {
  const client = getClient();
  if (!client) return null;

  const text = buildProfileText(company);
  if (!text) return null;

  try {
    const response = await client.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    return response.data?.[0]?.embedding ?? null;
  } catch (err) {
    console.warn('[embeddings] OpenAI API error:', err.message);
    return null;
  }
}

/**
 * Get embeddings for multiple companies in batch (OpenAI allows up to 2048 inputs).
 * @param {Object[]} companies - Array of company objects
 * @returns {Promise<Map<number, number[]>>} Map of company id -> embedding
 */
async function getEmbeddingsBatch(companies) {
  const client = getClient();
  if (!client || !companies.length) return new Map();

  const inputs = companies.map((c) => ({
    id: c.id,
    text: buildProfileText(c),
  })).filter((x) => x.text);

  if (!inputs.length) return new Map();

  try {
    const response = await client.embeddings.create({
      model: 'text-embedding-3-small',
      input: inputs.map((x) => x.text),
    });

    const map = new Map();
    const data = response.data || [];
    inputs.forEach((input, i) => {
      const emb = data[i]?.embedding;
      if (emb) map.set(input.id, emb);
    });
    return map;
  } catch (err) {
    console.warn('[embeddings] OpenAI batch API error:', err.message);
    return new Map();
  }
}

/**
 * Cosine similarity between two vectors.
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number} Similarity 0-1
 */
function cosineSimilarity(a, b) {
  if (!a || !b || a.length !== b.length) return 0.5;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  if (denom === 0) return 0.5;
  const sim = dot / denom;
  return Math.max(0, Math.min(1, (sim + 1) / 2)); // map [-1,1] to [0,1]
}

function isEmbeddingsAvailable() {
  return !!getClient();
}

module.exports = {
  getEmbedding,
  getEmbeddingsBatch,
  cosineSimilarity,
  isEmbeddingsAvailable,
};
