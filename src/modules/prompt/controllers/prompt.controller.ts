import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PromptService } from '../use-cases/prompt.service';
import { CreatePromptDto } from '../dto/create-prompt.dto';
import { UpdatePromptDto } from '../dto/update-prompt.dto';

@Controller('prompts')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Post()
  async create(@Body() createPromptDto: CreatePromptDto) {
    return this.promptService.create(createPromptDto);
  }

  @Get()
  async findAll() {
    return this.promptService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.promptService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePromptDto: UpdatePromptDto) {
    return this.promptService.update(id, updatePromptDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.promptService.remove(id);
  }
}