
import { ToastContainer } from 'react-toastify'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import MainRoutes from './routes/MainRoutes'
import { SearchContextProvider } from './context/SearchContext'

function App() {

  return (
    <AuthProvider>
      <SearchContextProvider>
        <ToastContainer position="top-center" autoClose={3000} />
        <MainRoutes />
      </SearchContextProvider>
    </AuthProvider>
  )
}

export default App
