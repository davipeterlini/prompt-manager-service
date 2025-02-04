import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/common';
import { Model } from 'mongoose';
import { of } from 'rxjs';
import { PromptService } from '../../src/modules/prompt/prompt.service';
import { Prompt } from '../../src/modules/prompt/interfaces/prompt.interface';
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
};

describe('PromptService', () => {
  let service: PromptService;
  let model: Model<Prompt>;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<PromptService>(PromptService);
    model = module.get<Model<Prompt>>(getModelToken('Prompt'));
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a prompt', async () => {
    const createPromptDto: CreatePromptDto = {
      name: 'Test Prompt',
      description: 'Test Description',
      template: 'Test Template',
    };
    jest.spyOn(model, 'create').mockImplementationOnce(() => Promise.resolve(mockPrompt()));
    const result = await service.create(createPromptDto);
    expect(result).toEqual(mockPrompt());
  });

  it('should return all prompts', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([mockPrompt()]),
    } as any);
    const result = await service.findAll();
    expect(result).toEqual([mockPrompt()]);
  });

  it('should return a single prompt', async () => {
    const id = 'someId';
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockPrompt()),
    } as any);
    const result = await service.findOne(id);
    expect(result).toEqual(mockPrompt());
  });

  it('should update a prompt', async () => {
    const id = 'someId';
    const updatePromptDto: UpdatePromptDto = {
      name: 'Updated Prompt',
    };
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce({ ...mockPrompt(), ...updatePromptDto }),
    } as any);
    const result = await service.update(id, updatePromptDto);
    expect(result).toEqual({ ...mockPrompt(), ...updatePromptDto });
  });

  it('should delete a prompt', async () => {
    const id = 'someId';
    jest.spyOn(model, 'findByIdAndRemove').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockPrompt()),
    } as any);
    const result = await service.remove(id);
    expect(result).toEqual(mockPrompt());
  });

  it('should get a custom prompt', async () => {
    const id = 'someId';
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockPrompt());
    const result = await service.getCustomPrompt(id);
    expect(result).toEqual('Custom Prompt Response');
  });
});