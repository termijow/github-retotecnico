'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const username = 'termijow';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/github/user/' + username);
        if (!res.ok) throw new Error('Error en la API');
        const data = await res.json();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError('No se pudo cargar el perfil');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p>Cargando</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Perfil de GitHub</h1>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
        <img
          src={userData.avatar_url}
          alt="Avatar"
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
        />
        <div>
          <h2>{userData.name || userData.login}</h2>
          <p>{userData.bio}</p>
          <p>Repositorios: {userData.public_repos}</p>
          <p>Seguidores: {userData.followers}</p>
          <a href={userData.html_url} target="_blank">Ver perfil</a>
        </div>
      </div>
    </div>
  );
}
