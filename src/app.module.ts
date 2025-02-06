import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromptModule } from './modules/prompt/prompt.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    PromptModule,
  ],
})
export class AppModule {}