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
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 font-sans text-zinc-100 selection:bg-red-500/30">
      
<<<<<<< HEAD
=======
      {/* Elementos decorativos de fondo (opcional para realzar el glassmorphism sutil) */}
>>>>>>> dc436434753144c951246df78ea13b4dae136baa
      <div className="absolute top-0 left-0 w-full h-96 bg-red-900/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="w-full max-w-2xl space-y-6 z-10">
        
<<<<<<< HEAD
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">GitHub Profile</h1>
          <p className="text-zinc-400">Descubre perfiles de desarrolladores al instante.</p>
        </div>

=======
        {/* Header */}
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">GitHub Profile</h1>
        </div>

        {/* Buscador con Glassmorphism Rojo Sutil */}
>>>>>>> dc436434753144c951246df78ea13b4dae136baa
        <form onSubmit={handleSearch} className="bg-black/40 backdrop-blur-xl border border-red-500/30 p-2 rounded-xl shadow-2xl hover:border-red-500/60 transition-colors duration-300">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Ingresa un username..."
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-white placeholder-zinc-500 focus:outline-none transition-all"
              />
              {searchError && (
                <p className="absolute -bottom-8 left-2 text-red-500 text-xs font-medium">
                  {searchError}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={searching}
              className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center min-w-[120px]"
            >
              {searching ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>

<<<<<<< HEAD
        <div className="bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-2xl shadow-2xl p-8 relative overflow-hidden group hover:border-red-500/60 transition-colors duration-500">
          
          <div className="flex flex-col md:flex-row items-center gap-8">
=======
        {/* Contenido del Perfil con Glassmorphism Vercel-like */}
        <div className="bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-2xl shadow-2xl p-8 relative overflow-hidden group hover:border-red-500/60 transition-colors duration-500">
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
>>>>>>> dc436434753144c951246df78ea13b4dae136baa
            <div className="relative">
              <img
                src={userData?.avatar_url || 'https://github.com/github.png'}
                alt="Avatar"
                className="w-32 h-32 rounded-full border border-red-500/30 object-cover shadow-[0_0_20px_rgba(220,38,38,0.15)] group-hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all duration-500"
              />
            </div>
            
<<<<<<< HEAD
=======
            {/* Información */}
>>>>>>> dc436434753144c951246df78ea13b4dae136baa
            <div className="flex-1 text-center md:text-left w-full">
              <h2 className="text-3xl font-bold text-white mb-1 tracking-tight">
                {userData?.name || userData?.login || 'Usuario no encontrado'}
              </h2>
              <p className="text-red-500 font-medium">@{userData?.login || '...'}</p>
              <p className="text-zinc-400 mt-4 leading-relaxed">{userData?.bio || 'Sin biografía proporcionada.'}</p>
              
<<<<<<< HEAD
=======
              {/* Estadísticas */}
>>>>>>> dc436434753144c951246df78ea13b4dae136baa
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-2xl font-bold text-white">{userData?.public_repos || 0}</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Repos</span>
                </div>
                <div className="flex flex-col items-center md:items-start border-l border-red-500/20 pl-4">
                  <span className="text-2xl font-bold text-white">{userData?.followers || 0}</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Seguidores</span>
                </div>
                <div className="flex flex-col items-center md:items-start border-l border-red-500/20 pl-4">
                  <span className="text-2xl font-bold text-white">{userData?.following || 0}</span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Siguiendo</span>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href={userData?.html_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-2.5 border border-red-500/30 bg-black/50 hover:bg-red-950/30 hover:border-red-500 text-red-50 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Ver en GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
