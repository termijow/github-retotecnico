import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GitHubService {
  async getUser(username: string) {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      if (response.status === 404) {
        throw new Error('No se encontro el usuario .');
      }
      return {
        login: response.data.login,
        name: response.data.name,
        bio: response.data.bio || 'Sin biografía',
        public_repos: response.data.public_repos,
        followers: response.data.followers,
        following: response.data.following,
        avatar_url: response.data.avatar_url,
        html_url: response.data.html_url,
      };
    } catch (error) {
      return { error: 'Error al obtener datos de GitHub' };
    }
  }
}
