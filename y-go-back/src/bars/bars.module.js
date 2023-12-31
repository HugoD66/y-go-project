'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === `object` && typeof Reflect.decorate === `function`)
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, `__esModule`, { value: true });
exports.BarsModule = void 0;
const common_1 = require(`@nestjs/common`);
const bars_service_1 = require(`./bars.service`);
const bars_controller_1 = require(`./bars.controller`);
const typeorm_1 = require(`@nestjs/typeorm`);
const bar_entity_1 = require(`./entities/bar.entity`);
let BarsModule = class BarsModule {};
BarsModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [typeorm_1.TypeOrmModule.forFeature([bar_entity_1.Bar])],
      controllers: [bars_controller_1.BarsController],
      providers: [bars_service_1.BarsService],
      exports: [bars_service_1.BarsService],
    }),
  ],
  BarsModule,
);
exports.BarsModule = BarsModule;
