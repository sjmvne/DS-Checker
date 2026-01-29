 require('dotenv').config();
    const express = require('express');
    const cors = require('cors');
    const cookieParser = require('cookie-parser');
    const csrf = require('csurf');
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

    const app = express();
    const PORT = process.env.PORT || 3000;

    // Configura CORS per alccettare richieste dal tuo frontend
    app.use(cors({
        origin: [
            'http://localhost:5173', 
            'https://sjmvne.github.io',
            'https://sjmvne.github.io/DS-Checker' 
        ],
        credentials: true
    }));
    app.use(express.json());
    app.use(cookieParser());
    
    // CSRF Protection
    const csrfProtection = csrf({ cookie: true });
    
    // Expose CSRF token
    app.get('/api/csrf-token', csrfProtection, (req, res) => {
        res.json({ csrfToken: req.csrfToken() });
    });

    // Apply CSRF protection to all unsafe methods (POST, PUT, DELETE)
    // Note: csurf middleware does this check automatically when used. 
    // We can apply it globally or per route. Global is safer.
    app.use(csrfProtection);

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
                    content: "Sei un motore di ricerca cosmetico avanzato. Il tuo compito è trovare i dati UFFICIALI del prodotto online. \n1. Correggi il nome e la marca se quelli forniti sono incompleti o errati.\n2. Cerca attivamente un URL di immagine valido (jpg/png) da e-commerce o siti ufficiali.\n3. Estrai la lista INCI reale."
                },
                {
                    role: "user",
                    content: `Analizza questo prodotto e trova i dati reali online:
                    Input Utente: "${product_name}"
                    Marca Probabile: "${brand}"
                    Paese: ${country || 'IT'}
                    Barcode: ${barcode || 'N/A'}
                    
                    Istruzioni:
                    - Usa il barcode o il nome per trovare il prodotto esatto.
                    - "product_name": Usa il nome commerciale completo trovato su internet.
                    - "brand": Usa la marca ufficiale trovata.
                    - "product_image_url": Trova un link diretto all'immagine (es. che finisce in .jpg o .png). Se non trovi nulla di affidabile, metti null.`
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