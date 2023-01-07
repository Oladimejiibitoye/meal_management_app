import { Test, TestingModule } from '@nestjs/testing';
import { AddonsCategoriesService } from './addons_categories.service';

describe('AddonsCategoriesService', () => {
  let service: AddonsCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddonsCategoriesService],
    }).compile();

    service = module.get<AddonsCategoriesService>(AddonsCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
