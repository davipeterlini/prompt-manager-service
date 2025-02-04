import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromptController } from './controllers/prompt.controller';
import { PromptService } from './use-cases/prompt.service';
import { PromptSchema } from './schemas/prompt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Prompt', schema: PromptSchema }]),
    HttpModule,
  ],
  controllers: [PromptController],
  providers: [PromptService],
})
export class PromptModule {}