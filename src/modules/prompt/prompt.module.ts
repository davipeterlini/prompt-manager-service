import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromptController } from './prompt.controller';
import { PromptService } from './prompt.service';
import { PromptSchema } from './schemas/prompt.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Prompt', schema: PromptSchema }])],
  controllers: [PromptController],
  providers: [PromptService],
})
export class PromptModule {}