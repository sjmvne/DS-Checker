# 🧴 DS Checker 2.0

> **L'assistente scientifico avanzato per la Dermatite Seborroica.**

**DS Checker** è una web app moderna progettata per analizzare la sicurezza dei prodotti cosmetici (shampoo, creme, lozioni) per chi soffre di Dermatite Seborroica. Utilizza un database dermatologico rigoroso per identificare ingredienti che nutrono la *Malassezia* (il fungo responsabile della DS).

![DS Checker Preview](https://via.placeholder.com/800x400?text=DS+Checker+2.0+Preview)

## ✨ Funzionalità Principali

### 🔍 Analisi Intelligente
- **Scanner Codice a Barre**: Integrazione con Quagga2 e OpenFoodFacts per ottenere ingredienti istantaneamente.
- **Inserimento Manuale**: Copia/Incolla la lista ingredienti (supporto OCR tramite fotocamera).
- **Verdetto Immediato**: Punteggio di sicurezza chiaro (0-100) con classificazione Sicuro/Attenzione/Alto Rischio.

### 📚 Risorse Educative
- **Database Ingredienti**: Esplora oltre 350+ ingredienti catalogati con filtri per categoria (Acidi Grassi, Esteri, Oli, ecc.).
- **Dizionario Dermatologico**: Glossario integrato per comprendere termini tecnici (es. "Idrolisi", "Biofilm", "Polisorbati").
- **Protocolli & Scienza**: Guide basate su studi clinici per il trattamento e la comprensione della patologia.
- **Fonti Scientifiche**: Riferimenti bibliografici trasparenti per un approccio "Evidence-Based".

### 🔬 Dettagli Tecnici per Ingrediente
Ogni ingrediente analizzato offre una scheda dettagliata con:
- **Profilo Scientifico**: Lunghezza catena di carbonio, peso molecolare.
- **Meccanismo d'Azione**: Perché l'ingrediente è problematico (es. nutrimento diretto, attivazione infiammazione).
- **Contesto Clinico**: Rischio di penetrazione barriera, interazione sinergica, ecc.

### 🎨 User Experience
- **Interfaccia Glassmorphism**: Design moderno, pulito e reattivo.
- **Dark Mode**: Tema scuro automatico o manuale.
- **Cronologia**: Salva le tue scansioni localmente sul dispositivo.
- **Privacy Totale**: Nessun dato viene inviato a server esterni; l'analisi avviene nel browser.

---

## 🛠️ Stack Tecnologico

- **Core**: React 18 + Vite
- **Styling**: CSS3 Moderno (Custom Properties, Glassmorphism)
- **Dati**: Architettura JSON complessa per catalogo ingredienti e logica di analisi.
- **API**: OpenFoodFacts (per recupero dati prodotti)
- **Librerie**: `quagga2` (Barcode), `date-fns`.

---

## 🚀 Installazione & Sviluppo

### Prerequisiti
- Node.js 16+
- npm 8+

### Setup

1. **Clona la repository**:
   ```bash
   git clone https://github.com/tuo-username/DS-Checker.git
   cd DS-Checker
   ```

2. **Installa le dipendenze**:
   ```bash
   npm install
   ```

3. **Avvia il server di sviluppo**:
   ```bash
   npm run dev
   ```
   L'app sarà disponibile su `http://localhost:5173`.

### Build per Produzione

Per generare i file statici ottimizzati (es. per GitHub Pages):

```bash
npm run build
```
I file saranno nella cartella `dist/`.

---

## 🧪 Come Funziona l'Analisi

Il cuore dell'applicazione è un motore di analisi che confronta gli ingredienti contro "liste di esclusione" scientifiche:

1. **Acidi Grassi C11-C24**: Fonte primaria di cibo per la Malassezia.
2. **Esteri**: Idrolizzati dal fungo per rilasciare acidi grassi liberi.
3. **Oli e Lipidi**: La maggior parte degli oli vegetali sono vietati (tranne MCT e Squalano).
4. **Fermenti**: Prodotti derivati da batteri/lieviti che possono innescare reazioni crociate.
5. **Attivatori AhR**: Ingredienti che possono innescare infiammazione neurogenica.

---

## 📝 Licenza

Distribuito sotto licenza MIT.

---

*Realizzato con 💜 per la community DS.*