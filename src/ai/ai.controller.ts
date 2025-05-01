import { BadRequestException, Controller, Get, InternalServerErrorException, Query } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get()
  async generateText(@Query('prompt') prompt: string): Promise<{ result: string }> {
    if (!prompt) {
      throw new BadRequestException('Prompt is required');
    }

    try {
      const result = await this.aiService.generateText(prompt);
      return { result };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
