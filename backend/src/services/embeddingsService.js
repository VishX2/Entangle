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

module.exports = {
  getEmbedding
};