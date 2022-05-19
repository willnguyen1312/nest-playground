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

  @Get('/file-view')
  viewFile(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'sample.pdf'));
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
    });
    return new StreamableFile(file);
  }

  @Get('/file-download')
  downloadFile(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'sample.pdf'));
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=sample.pdf',
    });
    return new StreamableFile(file);
  }

  @Get('/file-view-csv')
  viewFileCSV(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'addresses.csv'));
    res.set({
      'Content-Type': 'text/plain; charset=UTF-8',
      'Content-Disposition': 'inline',
    });
    return new StreamableFile(file);
  }

  @Get('/file-view-pdf')
  viewFilePDF(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'sample.pdf'));
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
    });
    return new StreamableFile(file);
  }
}
