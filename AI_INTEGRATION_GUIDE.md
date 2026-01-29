# 🤖 Guida Integrazione AI (Perplexity Sonar)

Questa guida ti spiega passo dopo passo come configurare il **Backend Intermediario** necessario per usare la ricerca IA in modo sicuro, proteggendo la tua chiave API.

> **Perché serve un backend?**
> La chiave API di Perplexity (`pplx-...`) non deve mai essere salvata nel codice Frontend (React), altrimenti sarebbe visibile a chiunque visiti il sito. Il backend fa da "ponte" sicuro.

---

## 🚀 Passo 1: Preparazione Backend

1.  Crea una cartella `backend` nella root del progetto (fuori da `src`):
    ```bash
    mkdir backend
    cd backend
    ```

2.  Inizializza un progetto Node.js e installa le dipendenze:
    ```bash
    npm init -y
    npm install express cors dotenv node-fetch
    ```

3.  Crea un file `server.js` dentro `backend/` con questo codice:

    ```javascript
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
    ```

---

## 🔑 Passo 2: Configurazione Chiavi (.env)

### 1. Nel Backend
Crea un file `.env` dentro la cartella `backend/`:

```env
PORT=3000
PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
*(Sostituisci `pplx-...` con la tua chiave reale)*

### 2. Nel Frontend
Crea (o modifica) il file `.env.local` nella root del progetto principale (`DS-Checker/`):

```env
VITE_AI_API_URL=http://localhost:3000
```

---

## ▶️ Passo 3: Avvio

Per far funzionare tutto in locale, devi avere **due terminali aperti**:

**Terminale 1 (Backend):**
```bash
cd backend
node server.js
```

**Terminale 2 (Frontend - quello che usi di solito):**
```bash
npm run dev
```

---

## 🌍 Passo 4: Deployment su Render.com (Gratis)

Render è perfetto per ospitare il tuo backend Node.js gratuitamente. Ecco come fare:

### 1. Preparazione Repository
Assicurati di aver fatto commit e push di tutto su GitHub, inclusa la cartella `backend`.
```bash
git add .
git commit -m "Aggiunto backend AI"
git push origin main
```

### 2. Crea il Web Service su Render
1.  Vai su [dashboard.render.com](https://dashboard.render.com) e registrati/accedi.
2.  Clicca **New +** -> **Web Service**.
3.  Seleziona **Build and deploy from a Git repository**.
4.  Connetti il tuo account GitHub e seleziona la repository `DS-Checker`.

### 3. Configura il Servizio
Compila il form con questi dati esatti:

| Campo | Valore da inserire |
|-------|-------------------|
| **Name** | `sezia-backend` (o quello che vuoi) |
| **Region** | `Frankfurt (EU Central)` (più veloce per l'Italia) |
| **Root Directory** | `backend` (⚠️ Importante!) |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | `Free` |

### 4. Variabili d'Ambiente (Environment Variables)
Ci sono due modi per farlo, scegli quello che preferisci:

**Opzione A: Environment Variables (Consigliato)**
Scorri giù fino alla sezione "Environment Variables", clicca **Add Environment Variable** e inserisci:
*   **Key**: `PERPLEXITY_API_KEY`
*   **Value**: `pplx-xxxxxxxx...` (La tua chiave)

**Opzione B: Secret Files (Alternativa comoda)**
Se preferisci incollare tutto il file:
1.  Clicca su **Secret Files**.
2.  Nome file: `.env`
3.  Contenuto: Incolla l'intero contenuto del tuo file `.env` locale.
    ```env
    PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxxxxx
    ```
Questa opzione creerà fisicamente il file sul server, che verrà letto da `server.js`.

Clicca **Create Web Service**.

### 5. Collega il Frontend
Render impiegherà 1-2 minuti per avviare il server.
Una volta finito, vedrai in alto a sinistra un URL tipo:
`https://sezia-backend.onrender.com`

Copia questo URL e:
1.  Vai nelle **Settings** della tua repository GitHub -> **Pages**.
2.  Assicurati che il sito sia deployato.
3.  Nel tuo codice locale, apri `.env.local` e cambia l'URL per quando farai la build:
    ```env
    VITE_AI_API_URL=https://sezia-backend.onrender.com
    ```
    *(Nota: In locale puoi continuare a usare localhost, oppure testare direttamente questo URL)*.

> **Nota CORS**: Se il tuo frontend su GitHub Pages non riesce a connettersi, potresti dover aggiornare `server.js` aggiungendo il tuo dominio Render o `*` (asterisco) nella configurazione CORS, poi fare un nuovo push.
