import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI with GEMINI_API_KEY if present
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Search Grounding endpoint for Cafe Coffee Day information
app.post('/api/grounded-search', async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query is required' });
  }

  if (!ai) {
    return res.json({
      answer: `Café Coffee Day was founded on 11 July 1996 on Brigade Road, Bengaluru by V. G. Siddhartha. Sourcing shade-grown Arabica and Robusta beans from its heritage estates in Chikmagalur, Karnataka, CCD created India's modern café culture with its signature line "A Lot Can Happen Over Coffee".`,
      sources: [
        { title: 'Café Coffee Day Official Heritage', url: 'https://www.cafecoffeeday.com' }
      ]
    });
  }

  try {
    const prompt = `You are the official digital assistant for Café Coffee Day (CCD), India's premier coffee house founded on Brigade Road, Bengaluru in 1996 with the iconic motto "A Lot Can Happen Over Coffee".
Use Google Search grounding to provide accurate, verified information about Café Coffee Day (e.g. coffee sourcing from Chikmagalur estates, menu items like The Devil's Own, South Indian Filter Kaapi, cafe locations across Bengaluru, Mumbai, Delhi, highways, and company history).
Provide a concise, welcoming, fact-checked response (2-4 paragraphs maximum).

User question: "${query}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const candidate = response.candidates?.[0];
    const text = response.text || 'Information retrieved.';
    
    // Extract grounding sources if provided by search grounding
    const sources: { title: string; url: string }[] = [];
    const groundingChunks = candidate?.groundingMetadata?.groundingChunks;
    if (Array.isArray(groundingChunks)) {
      for (const chunk of groundingChunks) {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || 'Café Coffee Day Reference',
            url: chunk.web.uri
          });
        }
      }
    }

    if (sources.length === 0) {
      sources.push({
        title: 'Café Coffee Day Official Site',
        url: 'https://www.cafecoffeeday.com'
      });
    }

    return res.json({
      answer: text,
      sources: sources.slice(0, 4)
    });
  } catch (err: any) {
    console.error('Gemini Search Grounding error:', err);
    return res.json({
      answer: `Café Coffee Day (CCD) is India's pioneer café network, founded in 1996 on Brigade Road, Bengaluru. Its coffees are cultivated in Chikmagalur, Karnataka, and served across hundreds of city and highway cafés under the famous motto "A Lot Can Happen Over Coffee".`,
      sources: [
        { title: 'Café Coffee Day Official', url: 'https://www.cafecoffeeday.com' }
      ]
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Café Coffee Day experience server running on http://localhost:${PORT}`);
  });
}

startServer();
