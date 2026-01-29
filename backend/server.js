 require('dotenv').config();
    const express = require('express');
    const cors = require('cors');
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

    const app = express();
    const PORT = process.env.PORT || 3000;

    // Configura CORS per alccettare richieste dal tuo frontend
    app.use(cors({
        origin: [
            'http://localhost:5173', 
            'https://sjmvne.github.io',
            'https://sjmvne.github.io/DS-Checker' 
        ]
    }));
    app.use(express.json());

    // Endpoint per la ricerca INCI
    app.post('/api/v1/ai/search-inci', async (req, res) => {
        try {
            const { barcode, product_name, brand, country } = req.body;
            
            console.log(`🤖 AI Search Request: ${product_name} (${brand})`);

            const jsonSchema = {
                type: "object",
                properties: {
                    product_name: { type: "string" },
                    brand: { type: "string" },
                    product_image_url: { type: ["string", "null"] },
                    ingredients_list: { 
                        type: "array", 
                        items: { type: "string" } 
                    },
                    confidence_reason: { type: "string" },
                    sources: { 
                        type: "array", 
                        items: { type: "string" } 
                    },
                    barcode: { type: ["string", "null"] },
                    product_type: { type: "string" },
                    confidence_score: { type: "number" }
                },
                required: ["product_name", "brand", "ingredients_list", "confidence_reason", "sources", "confidence_score", "product_type", "product_image_url"]
            };

            const messages = [
                {
                    role: "system",
                    content: "Sei un esperto cosmetologo. Restituisci i dettagli del prodotto richiesto rispettando rigorosamente lo schema JSON fornito."
                },
                {
                    role: "user",
                    content: `Trova gli ingredienti (INCI) per:
                    Prodotto: ${product_name}
                    Marca: ${brand}
                    Paese: ${country || 'IT'}
                    Barcode: ${barcode || 'N/A'}`
                }
            ];

            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'sonar', 
                    messages: messages,
                    temperature: 0.1, // Lower temperature for stricter schema adherence
                    response_format: {
                        type: 'json_schema',
                        json_schema: {
                            schema: jsonSchema
                        }
                    }
                })
            });

            if (!response.ok) {
                const err = await response.text();
                throw new Error(`Perplexity API Error: ${err}`);
            }

            const data = await response.json();
            
            // Parsing della risposta JSON dell'AI (con schema structured non dovrebbe servire strip markdown)
            let content = data.choices[0].message.content;
            const jsonResult = JSON.parse(content);
            
            console.log('✅ AI Response:', JSON.stringify(jsonResult, null, 2));

            res.json({
                status: 'success',
                data: jsonResult,
                data: jsonResult,
                confidence: jsonResult.confidence_score || 0.95 
            });

        } catch (error) {
            console.error('SERVER ERROR:', error);
            res.status(500).json({ status: 'error', error: error.message });
        }
    });

    app.listen(PORT, () => {
        console.log(`✅ Backend AI in ascolto su http://localhost:${PORT}`);
    });