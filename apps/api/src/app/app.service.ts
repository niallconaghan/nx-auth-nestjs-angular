import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: `API is up: ${ new Date().toLocaleString() }` };
  }
}
