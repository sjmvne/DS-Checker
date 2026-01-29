 require('dotenv').config();
    const express = require('express');
    const cors = require('cors');
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

    const app = express();
    const PORT = process.env.PORT || 3000;

    // Configura CORS per alccettare richieste dal tuo frontend
    app.use(cors({
        origin: ['http://localhost:5173', 'https://tuo-username.github.io']
    }));
    app.use(express.json());

    // Endpoint per la ricerca INCI
    app.post('/api/v1/ai/search-inci', async (req, res) => {
        try {
            const { barcode, product_name, brand, country } = req.body;
            
            console.log(`🤖 AI Search Request: ${product_name} (${brand})`);

            const messages = [
                {
                    role: "system",
                    content: "Sei un esperto cosmetologo. Restituisci SOLO un oggetto JSON valido con i dettagli del prodotto. Non aggiungere markdown o testo extra."
                },
                {
                    role: "user",
                    content: `Trova gli ingredienti (INCI) per:
                    Prodotto: ${product_name}
                    Marca: ${brand}
                    Paese: ${country || 'IT'}
                    Barcode: ${barcode || 'N/A'}
                    
                    Rispondi esattamente con questo formato JSON:
                    {
                      "product_name": "Nome esatto",
                      "brand": "Marca esatta",
                      "product_image_url": "URL immagine (o null)",
                      "ingredients_list": ["Ingrediente1", "Ingrediente2", ...],
                      "confidence_reason": "Motivo della confidenza",
                      "sources": ["url1", "url2"]
                    }`
                }
            ];

            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'sonar-reasoning', // o 'sonar-pro'
                    messages: messages,
                    temperature: 0.2
                })
            });

            if (!response.ok) {
                const err = await response.text();
                throw new Error(`Perplexity API Error: ${err}`);
            }

            const data = await response.json();
            
            // Parsing della risposta JSON dell'AI
            let content = data.choices[0].message.content;
            // Rimuovi eventuali backticks markdown ```json ... ```
            content = content.replace(/```json/g, '').replace(/```/g, '').trim();
            
            const jsonResult = JSON.parse(content);

            res.json({
                status: 'success',
                data: jsonResult,
                confidence: 0.9 // Simulato o calcolato
            });

        } catch (error) {
            console.error('SERVER ERROR:', error);
            res.status(500).json({ status: 'error', error: error.message });
        }
    });

    app.listen(PORT, () => {
        console.log(`✅ Backend AI in ascolto su http://localhost:${PORT}`);
    });