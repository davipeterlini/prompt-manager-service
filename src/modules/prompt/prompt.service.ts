import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';
import { Prompt } from './interfaces/prompt.interface';

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
    return this.promptModel.findById(id).exec();
  }

  async update(id: string, updatePromptDto: UpdatePromptDto): Promise<Prompt> {
    return this.promptModel.findByIdAndUpdate(id, updatePromptDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Prompt> {
    return this.promptModel.findByIdAndRemove(id).exec();
  }

  async getCustomPrompt(promptId: string): Promise<any> {
    const prompt = await this.findOne(promptId);
    const response = await this.httpService.post('https://smith.langchain.com/hub/hardkothari/prompt-maker', {
      template: prompt.template,
    }).toPromise();
    return response.data;
  }
}