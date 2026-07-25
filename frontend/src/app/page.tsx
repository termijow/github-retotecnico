'use client';

import { useEffect, useState } from 'react';

interface GitHubUser {
  avatar_url: string;
  name: string | null;
  login: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
}

export default function Home() {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const username = 'termijow';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/github/user/${username}`);

        if (!res.ok) {
          throw new Error('Error en la API');
        }

        const data: GitHubUser = await res.json();

        setUserData(data);
      } catch (err) {
        setError('No se pudo cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!userData) {
    return <p>No se encontró información del usuario.</p>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Perfil de GitHub</h1>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <img
          src={userData.avatar_url}
          alt={`Avatar de ${userData.login}`}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
          }}
        />

        <div>
          <h2>{userData.name || userData.login}</h2>

          <p>{userData.bio || 'Sin biografía disponible'}</p>

          <p>Repositorios: {userData.public_repos}</p>

          <p>Seguidores: {userData.followers}</p>

          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver perfil
          </a>
        </div>
      </div>
    </div>
  );
}