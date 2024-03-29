"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBarRatingModule = void 0;
const common_1 = require("@nestjs/common");
const user_bar_rating_service_1 = require("./user-bar-rating.service");
const user_bar_rating_controller_1 = require("./user-bar-rating.controller");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const user_bar_rating_entity_1 = require("./entities/user-bar-rating.entity");
const bars_module_1 = require("../bars/bars.module");
const rate_fixtures_1 = require("../fixtures/rate.fixtures");
let UserBarRatingModule = exports.UserBarRatingModule = class UserBarRatingModule {
};
exports.UserBarRatingModule = UserBarRatingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_bar_rating_entity_1.UserBarRating]), users_module_1.UsersModule, bars_module_1.BarsModule],
        exports: [user_bar_rating_service_1.UserBarRatingService],
        controllers: [user_bar_rating_controller_1.UserBarRatingController],
        providers: [rate_fixtures_1.RateFixtures, user_bar_rating_service_1.UserBarRatingService],
    })
], UserBarRatingModule);
//# sourceMappingURL=user-bar-rating.module.js.map