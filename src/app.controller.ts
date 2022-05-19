import { Controller, Get, Response, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/file')
  getFile(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'sample.pdf'));
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
    });
    return new StreamableFile(file);
  }
}
