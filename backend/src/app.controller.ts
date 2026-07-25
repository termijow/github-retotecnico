import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { GitHubService } from './github.service';

@Controller('api/github')
export class AppController {
  constructor(private githubService: GitHubService) {}

  @Get('user/:username')
  async getProfile(@Param('username') username: string) {
    const data = await this.githubService.getUser(username);
    return data;
  }
}
