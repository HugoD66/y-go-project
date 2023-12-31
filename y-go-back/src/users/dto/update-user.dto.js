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
exports.UpdateUserDto = void 0;
const mapped_types_1 = require(`@nestjs/mapped-types`);
const class_validator_1 = require(`class-validator`);
const create_user_dto_1 = require(`./create-user.dto`);
class UpdateUserDto extends (0, mapped_types_1.PartialType)(
  create_user_dto_1.CreateUserDto,
) {}
__decorate(
  [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()],
  UpdateUserDto.prototype,
  `name`,
  void 0,
);
__decorate(
  [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()],
  UpdateUserDto.prototype,
  `username`,
  void 0,
);
__decorate(
  [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()],
  UpdateUserDto.prototype,
  `address`,
  void 0,
);
__decorate(
  [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEmail)()],
  UpdateUserDto.prototype,
  `email`,
  void 0,
);
__decorate(
  [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()],
  UpdateUserDto.prototype,
  `phone`,
  void 0,
);
exports.UpdateUserDto = UpdateUserDto;
