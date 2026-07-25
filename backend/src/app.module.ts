import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitHubService } from './github.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GitHubService],
})
export class AppModule {}
