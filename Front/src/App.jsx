import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PaginaSensores from './pages/paginaSensores/paginaSensores';
import PaginaAmbientes from './pages/paginaAmbientes/paginaAmbientes';
import PaginaHistorico from './pages/paginaHistorico/paginaHistorico';
import PaginaLogin from './pages/paginaLogin/paginaLogin';
import PaginaHome from './pages/paginaHome/paginaHome';

// protege as rotas
const RotaProtegida = ({ children }) => {
  const token = localStorage.getItem('tokenAcesso');

  // Se não tiver token manda pro login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Se tiver renderiza a pagina normal
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*geral acessa */}
        <Route path="/login" element={<PaginaLogin />} />

        {/* só com login*/}
        <Route path="/" element={
          <RotaProtegida>
            <PaginaHome />
          </RotaProtegida>
        } />
        
        <Route path="/sensores" element={
          <RotaProtegida>
            <PaginaSensores />
          </RotaProtegida>
        } />
        
        <Route path="/ambientes" element={
          <RotaProtegida>
            <PaginaAmbientes />
          </RotaProtegida>
        } />
        
        <Route path="/historico" element={
          <RotaProtegida>
            <PaginaHistorico />
          </RotaProtegida>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;