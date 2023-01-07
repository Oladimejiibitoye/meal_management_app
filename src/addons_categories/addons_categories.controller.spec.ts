import { Test, TestingModule } from '@nestjs/testing';
import { AddonsCategoriesController } from './addons_categories.controller';

describe('AddonsCategoriesController', () => {
  let controller: AddonsCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddonsCategoriesController],
    }).compile();

    controller = module.get<AddonsCategoriesController>(AddonsCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
