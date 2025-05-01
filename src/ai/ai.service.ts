import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  async generateText(prompt: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.intelligence.io.solutions/api/v1/chat/completions',
        {
          model: 'deepseek-ai/DeepSeek-R1',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.IO_API_KEY}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.log(error);
      throw new Error(
        `AI API Error: ${error.response?.data?.error || error.message}`,
      );
    }
  }
}
