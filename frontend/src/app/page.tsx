'use client';

import { useEffect, useState } from 'react';
import { GitHubProfile, GitHubErrorResponse } from '@/types/github';

export default function Home() {
  const [userData, setUserData] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  
  const username = 'termijow';

  const fetchProfile = async (user: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/github/user/${user}`);
      if (!res.ok) {
        const data: GitHubErrorResponse = await res.json();
        throw new Error(data.error || 'Usuario no encontrado');
      }
      const data: GitHubProfile = await res.json();
      setUserData(data);
      setLoading(false);
      setSearchError('');
    } catch (err) {
      setError('Error al cargar el perfil');
      setLoading(false);
      setSearchError('Usuario no encontrado');
    } finally {
      setSearching(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchUsername.trim()) return;
    setSearching(true);
    fetchProfile(searchUsername);
  };

  useEffect(() => {
    fetchProfile(username);
  }, []);

  if (loading && !searching) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header con Glassmorphism */}
        <div className="glass-card p-8 rounded-2xl shadow-2xl mb-6 bg-white/10 backdrop-blur-md border border-white/20">
          <h1 className="text-3xl font-bold text-white mb-2">Perfil de GitHub</h1>
          <p className="text-gray-300">Explora y descubre perfiles de desarrolladores</p>
        </div>

        {/* Buscador con Glassmorphism */}
        <form onSubmit={handleSearch} className="glass-card p-6 rounded-2xl shadow-xl mb-6 bg-white/10 backdrop-blur-md border border-white/20">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar por username de GitHub..."
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
              />
              {searchError && (
                <p className="absolute -bottom-6 left-0 text-red-400 text-sm">
                  {searchError}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={searching}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50"
            >
              {searching ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>

        {/* Contenido del Perfil con Glassmorphism */}
        <div className="glass-card p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <img
              src={userData?.avatar_url || 'https://github.com/github.png'}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-white/20 shadow-lg object-cover"
            />
            
            {/* Información */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white">
                {userData?.name || userData?.login || 'Usuario no encontrado'}
              </h2>
              <p className="text-blue-300">@{userData?.login || '...'}</p>
              <p className="text-gray-300 mt-2">{userData?.bio || 'Sin biografía'}</p>
              
              {/* Estadísticas */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-white/10 p-3 rounded-lg text-center">
                  <span className="text-2xl font-bold text-white">{userData?.public_repos || 0}</span>
                  <p className="text-sm text-gray-300">Repositorios</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg text-center">
                  <span className="text-2xl font-bold text-white">{userData?.followers || 0}</span>
                  <p className="text-sm text-gray-300">Seguidores</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg text-center">
                  <span className="text-2xl font-bold text-white">{userData?.following || 0}</span>
                  <p className="text-sm text-gray-300">Siguiendo</p>
                </div>
              </div>
              
              <a 
                href={userData?.html_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold transition-all duration-300"
              >
                Visitar Perfil de GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
