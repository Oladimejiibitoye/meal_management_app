import { Module } from '@nestjs/common';
import { AddonsService } from './addons.service';
import { AddonsController } from './addons.controller';
import { ObjectionModule } from 'nestjs-objection';
import { AddonModel } from 'src/database/models/addon.model';

@Module({
  imports: [ObjectionModule.forFeature([AddonModel])],
  providers: [AddonsService],
  controllers: [AddonsController]
})
export class AddonsModule {}
