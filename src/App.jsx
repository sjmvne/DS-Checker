import { useState } from 'react'
import Header from './components/Header'
import Scanner from './components/Scanner'
import Search from './components/Search'
import Results from './components/Results'
import History from './components/History'
import ThemeToggle from './components/ThemeToggle'
import LoadingOverlay from './components/LoadingOverlay'
import LanguageSelector from './components/LanguageSelector'
import Menu from './components/Menu'
import References from './components/References'
import Credits from './components/Credits'
import DatabaseViewer from './components/DatabaseViewer'
import ScienceGuide from './components/ScienceGuide'
import Protocols from './components/Protocols'
import Dictionary from './components/Dictionary'
import Tutorial from './components/Tutorial'
import EducationLayout from './components/education/EducationLayout'

import { useTheme } from './hooks/useTheme'
import { useLanguage } from './context/LanguageContext'
import { useHistory } from './hooks/useHistory'
import { useAnalyzer } from './hooks/useAnalyzer'
import { calculateScore } from './utils/calculateScore'
import { formatDate } from './utils/formatters'
import './App.css'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage() // Add this hook usage
  const { history, addToHistory, clearHistory } = useHistory()
  const { analyzeIngredients } = useAnalyzer()
  
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState('home') // 'home', 'database', 'references', 'credits', 'science', 'protocols'
  const [aiRequest, setAiRequest] = useState(null) // For scanner -> search communication

  const handleAnalyze = (productName, ingredientsInput, metadata = {}) => {
    // Determine if input is valid (string or non-empty array)
    const isValidInput = Array.isArray(ingredientsInput) 
      ? ingredientsInput.length > 0
      : ingredientsInput && ingredientsInput.trim();

    if (!isValidInput) {
      // Use simple alert or toast. For now, alert needs translation.
      // Since App.jsx is top level, valid to use t() if hook is available.
      // Wait, App uses t? Let's check imports.
      // App.jsx likely doesn't have `t` destructured yet if not used before.
      // But we can assume it will be used now.
      alert(t ? t('alert.empty_ingredients') : 'Inserisci ingredienti!');
      return
    }

    setLoading(true)
    
    // Simulate slight delay for better UX
    setTimeout(() => {
      const analysis = analyzeIngredients(ingredientsInput)
      
      let ingredients = [];
      if (Array.isArray(ingredientsInput)) {
        ingredients = ingredientsInput;
      } else {
        // Use same robust regex as analyzer
        ingredients = ingredientsInput
          .replace(/^ingredients[:\s]*/i, '')
          .split(/[,|\n\r•*;\t]/)
          .map(i => i.trim())
          .filter(i => i.length > 0)
      }
      
      const result = {
        productName: productName || 'Prodotto Senza Nome',
        date: formatDate(new Date()),
        analysis,
        score: calculateScore(analysis),
        totalIngredients: analysis.total || ingredients.length,
        // AI Metadata (if provided)
        imageUrl: metadata.imageUrl || null,
        sources: metadata.sources || [],
        barcode: metadata.barcode || null,
        confidence: metadata.confidence || null
      }
      
      setResults(result)
      addToHistory(result)
      setLoading(false)

      if (currentPage !== 'home') setCurrentPage('home')

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }, 100)
    }, 500)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'database':
        return <DatabaseViewer />
      case 'science':
        return <ScienceGuide />
      case 'protocols':
        return <Protocols />
      case 'references':
        return <References />
      case 'dictionary':
        return <Dictionary />
      case 'credits':
        return <Credits />
      case 'education':
        return <EducationLayout />
      case 'home':
      default:
        return (
          <>
            <div className="main-grid">
              <Scanner 
                onAnalyze={handleAnalyze} 
                onAiRequest={(barcode) => setAiRequest({ barcode, timestamp: Date.now() })}
              />
              <Search 
                onAnalyze={handleAnalyze} 
                aiRequest={aiRequest}
              />
            </div>

            {results && (
              <div id="results-section">
                <Results data={results} />
              </div>
            )}

            {history.length > 0 && (
              <History 
                items={history} 
                onItemClick={(item) => {
                  setResults(item);
                   setTimeout(() => {
                      document.getElementById('results-section')?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      })
                    }, 100)
                }}
                onClear={clearHistory}
              />
            )}
          </>
        )
    }
  }

  return (
    <div className="app" data-theme={theme}>
      <LanguageSelector />
      <Menu 
        onNavigate={setCurrentPage} 
        currentTheme={theme} 
        onThemeToggle={toggleTheme} 
      />
      
      <Header />

      <main className="content-area">
        {renderPage()}
      </main>


      <LoadingOverlay isVisible={loading} />
      <Tutorial />
    </div>
  )
}
