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
import { GlossaryProvider, useGlossaryContext } from './context/GlossaryContext'
import DefinitionPopup from './components/common/DefinitionPopup'
import './App.css'

// Separate component to consume context safely
const AppContent = () => {
    const { theme, toggleTheme } = useTheme()
    const { t } = useLanguage()
    const { history, addToHistory, clearHistory, removeFromHistory } = useHistory()
    const { analyzeIngredients } = useAnalyzer()
    const { selectedTerm, closeTerm } = useGlossaryContext()
    
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState('home')
    const [aiRequest, setAiRequest] = useState(null)
  
    const handleAnalyze = (productName, ingredientsInput, metadata = {}) => {
      const isValidInput = Array.isArray(ingredientsInput) 
        ? ingredientsInput.length > 0
        : ingredientsInput && ingredientsInput.trim();
  
      if (!isValidInput) {
        alert(t ? t('alert.empty_ingredients') : 'Inserisci ingredienti!');
        return
      }
  
      setLoading(true)
      
      setTimeout(() => {
        const analysis = analyzeIngredients(ingredientsInput)
        
        let ingredients = [];
        if (Array.isArray(ingredientsInput)) {
          ingredients = ingredientsInput;
        } else {
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
          imageUrl: metadata.imageUrl || null,
          sources: metadata.sources || [],
          barcode: metadata.barcode || null,
          confidence: metadata.confidence || null
        }
        
        setResults(result)
        addToHistory(result)
        setLoading(false)
  
        if (currentPage !== 'home') setCurrentPage('home')
  
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
        case 'database': return <DatabaseViewer />
        case 'science': return <ScienceGuide />
        case 'protocols': return <Protocols />
        case 'references': return <References />
        case 'dictionary': return <Dictionary />
        case 'credits': return <Credits />
        case 'education': return <EducationLayout />
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
                  onRemoveItem={removeFromHistory}
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
        
        {currentPage !== 'credits' && <Header />}
  
        <main className="content-area">
          {renderPage()}
        </main>
  
        <LoadingOverlay isVisible={loading} />
        <Tutorial />
        
        {selectedTerm && (
            <DefinitionPopup 
                term={selectedTerm.term}
                definition={selectedTerm.definition}
                category={selectedTerm.category}
                onClose={closeTerm}
            />
        )}
      </div>
    )
}

export default function App() {
    return (
        <GlossaryProvider>
            <AppContent />
        </GlossaryProvider>
    )
}
