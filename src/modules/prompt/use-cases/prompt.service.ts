import { Injectable, HttpService, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePromptDto } from '../dto/create-prompt.dto';
import { UpdatePromptDto } from '../dto/update-prompt.dto';
import { Prompt } from '../entities/prompt.entity';

@Injectable()
export class PromptService {
  constructor(
    @InjectModel('Prompt') private readonly promptModel: Model<Prompt>,
    private readonly httpService: HttpService,
  ) {}

  async create(createPromptDto: CreatePromptDto): Promise<Prompt> {
    const createdPrompt = new this.promptModel(createPromptDto);
    return createdPrompt.save();
  }

  async findAll(): Promise<Prompt[]> {
    return this.promptModel.find().exec();
  }

  async findOne(id: string): Promise<Prompt> {
    const prompt = await this.promptModel.findById(id).exec();
    if (!prompt) {
      throw new NotFoundException(`Prompt with ID ${id} not found`);
    }
    return prompt;
  }

  async update(id: string, updatePromptDto: UpdatePromptDto): Promise<Prompt> {
    const updatedPrompt = await this.promptModel.findByIdAndUpdate(id, updatePromptDto, { new: true }).exec();
    if (!updatedPrompt) {
      throw new NotFoundException(`Prompt with ID ${id} not found`);
    }
    return updatedPrompt;
  }

  async remove(id: string): Promise<Prompt> {
    const deletedPrompt = await this.promptModel.findByIdAndRemove(id).exec();
    if (!deletedPrompt) {
      throw new NotFoundException(`Prompt with ID ${id} not found`);
    }
    return deletedPrompt;
  }

  async getCustomPrompt(promptId: string): Promise<any> {
    const prompt = await this.findOne(promptId);
    const response = await this.httpService.post('https://smith.langchain.com/hub/hardkothari/prompt-maker', {
      template: prompt.template,
    }).toPromise();
    return response.data;
  }
}