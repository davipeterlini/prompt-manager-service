import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/common';
import { Model } from 'mongoose';
import { of } from 'rxjs';
import { PromptController } from '../../src/modules/prompt/controllers/prompt.controller';
import { PromptService } from '../../src/modules/prompt/use-cases/prompt.service';
import { Prompt } from '../../src/modules/prompt/entities/prompt.entity';
import { CreatePromptDto } from '../../src/modules/prompt/dto/create-prompt.dto';
import { UpdatePromptDto } from '../../src/modules/prompt/dto/update-prompt.dto';

const mockPrompt = (name = 'Test Prompt', description = 'Test Description', template = 'Test Template'): any => ({
  name,
  description,
  template,
});

const mockPromptModel = {
  new: jest.fn().mockResolvedValue(mockPrompt()),
  constructor: jest.fn().mockResolvedValue(mockPrompt()),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndRemove: jest.fn(),
  create: jest.fn(),
  exec: jest.fn(),
  save: jest.fn().mockResolvedValue(mockPrompt()),
};

describe('PromptController', () => {
  let controller: PromptController;
  let service: PromptService;
  let model: Model<Prompt>;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromptController],
      providers: [
        PromptService,
        {
          provide: getModelToken('Prompt'),
          useValue: mockPromptModel,
        },
        {
          provide: HttpService,
          useValue: {
            post: jest.fn().mockReturnValue(of({ data: 'Custom Prompt Response' })),
          },
        },
      ],
    }).compile();

    controller = module.get<PromptController>(PromptController);
    service = module.get<PromptService>(PromptService);
    model = module.get<Model<Prompt>>(getModelToken('Prompt'));
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a prompt', async () => {
    const createPromptDto: CreatePromptDto = {
      name: 'Test Prompt',
      description: 'Test Description',
      template: 'Test Template',
    };
    jest.spyOn(service, 'create').mockImplementationOnce(() => Promise.resolve(mockPrompt()));
    const result = await controller.create(createPromptDto);
    expect(result).toEqual(mockPrompt());
  });

  it('should return all prompts', async () => {
    jest.spyOn(service, 'findAll').mockImplementationOnce(() => Promise.resolve([mockPrompt()]));
    const result = await controller.findAll();
    expect(result).toEqual([mockPrompt()]);
  });

  it('should return a single prompt', async () => {
    const id = 'someId';
    jest.spyOn(service, 'findOne').mockImplementationOnce(() => Promise.resolve(mockPrompt()));
    const result = await controller.findOne(id);
    expect(result).toEqual(mockPrompt());
  });

  it('should update a prompt', async () => {
    const id = 'someId';
    const updatePromptDto: UpdatePromptDto = {
      name: 'Updated Prompt',
    };
    jest.spyOn(service, 'update').mockImplementationOnce(() => Promise.resolve({ ...mockPrompt(), ...updatePromptDto }));
    const result = await controller.update(id, updatePromptDto);
    expect(result).toEqual({ ...mockPrompt(), ...updatePromptDto });
  });

  it('should delete a prompt', async () => {
    const id = 'someId';
    jest.spyOn(service, 'remove').mockImplementationOnce(() => Promise.resolve(mockPrompt()));
    const result = await controller.remove(id);
    expect(result).toEqual(mockPrompt());
  });
});