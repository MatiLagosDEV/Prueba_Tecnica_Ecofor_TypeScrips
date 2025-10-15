import React, { useState } from 'react';
import './App.css';
import CatPages from './pages/CatPages';
import { BrowserRouter, Routes, Route, Navigate, Link} from 'react-router-dom';
import FavoritePages from './pages/FavoritePages';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [originFilter, setOriginFilter] = useState('');
  const [temperamentoFilter, setTemperamentoFilter] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <BrowserRouter>
      <div className="App">
        <nav className="bg-green-600 shadow-lg p-4 mb-6">
          <div className="container mx-auto flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Link 
                to="/Cats" 
                className="bg-white text-green-700 hover:bg-green-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm"
              >
                Ver Gatos
              </Link>
              <Link 
                to="/Favorites" 
                className="bg-white text-green-700 hover:bg-green-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm"
              >
                Mis Favoritos
              </Link>
            </div>
            
            <form onSubmit={handleSearch} className="flex items-center flex-wrap gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-48 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <select
                value={originFilter}
                onChange={(e) => setOriginFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                <option value="">Todos los orígenes</option>
                <option value="Estados Unidos">Estados Unidos</option>
                <option value="Reino Unido">Reino Unido</option>
                <option value="Egipto">Egipto</option>
                <option value="Tailandia">Tailandia</option>
                <option value="Irán">Irán</option>
                <option value="Birmania">Birmania</option>
                <option value="Rusia">Rusia</option>
              </select>

              <select
                value={temperamentoFilter}
                onChange={(e) => setTemperamentoFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                <option value="">Todos los temperamentos</option>
                <option value="Amigable">Amigable</option>
                <option value="Tranquilo">Tranquilo</option>
                <option value="Activo">Activo</option>
                <option value="Inteligente">Inteligente</option>
                <option value="Independiente">Independiente</option>
                <option value="Cariñoso">Cariñoso</option>
              </select>

              {(searchTerm || originFilter || temperamentoFilter) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setOriginFilter('');
                    setTemperamentoFilter('');
                  }}
                  className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Limpiar
                </button>
              )}
            </form>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Navigate to="/Cats" />} />
          <Route path="/Cats" element={
            <CatPages 
              searchTerm={searchTerm}
              originFilter={originFilter}
              temperamentoFilter={temperamentoFilter}
            />
          } />
          <Route path="/Favorites" element={<FavoritePages searchTerm={searchTerm} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
