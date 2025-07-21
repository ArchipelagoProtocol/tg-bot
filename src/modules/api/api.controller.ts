import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiService } from './api.service';
import { Public } from '@common/decorators/public';
import { ApiKeyGuard } from '@common/guards/api-key';

@Controller('telegram')
@UseGuards(ApiKeyGuard)
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Public()
  @Post('response')
  async sendProcessedMessage(
    @Body() body: { message: string; chatId: number },
  ) {
    await this.apiService.sendMessage(body.chatId, body.message);
    return { status: 'sent' };
  }
}
