import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromptModule } from './modules/prompt/prompt.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/prompt-manager'),
    PromptModule,
  ],
})
export class AppModule {}