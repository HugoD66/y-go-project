"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const user_roles_enum_1 = require("./entities/types/user.roles.enum");
const errors_1 = require("./errorsRegister/errors");
let UsersService = exports.UsersService = class UsersService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        try {
            const existingUser = await this.usersRepository.findOne({
                where: { email: createUserDto.email },
            });
            if (existingUser) {
                throw new errors_1.EmailAlreadyExistsException();
            }
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
            const user = this.usersRepository.create({
                name: createUserDto.name,
                email: createUserDto.email,
                password: hashedPassword,
                picture: createUserDto.picture ?? null,
                role: createUserDto.role ?? user_roles_enum_1.UserRoleEnum.Utilisateur,
            });
            const savedUser = await this.usersRepository.save(user);
            return {
                id: savedUser.id,
                name: savedUser.name,
                email: savedUser.email,
                picture: savedUser.picture,
                role: savedUser.role,
            };
        }
        catch (error) {
            if (error instanceof errors_1.EmailAlreadyExistsException ||
                error instanceof errors_1.InvalidEmailFormatException ||
                error instanceof errors_1.NameTooShortException ||
                error instanceof errors_1.ServerErrorException ||
                error instanceof errors_1.InvalidPasswordFormatException) {
                throw error;
            }
            throw new errors_1.ServerErrorException();
        }
    }
    async changePassword(changePasswordDto) {
        console.log(`Received changePasswordDto:`, changePasswordDto);
        const user = await this.usersRepository.findOne({
            where: { email: changePasswordDto.email },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User not found`);
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(changePasswordDto.password, salt);
        await this.usersRepository.update(user.id, { password: hashedPassword });
        return { message: `Mot de passe changé` };
    }
    async login(loginDto) {
        try {
            const user = await this.usersRepository.findOne({
                where: { email: loginDto.email },
            });
            if (!user) {
                throw new common_1.NotFoundException(`User not found`);
            }
            const passwordMatch = await bcrypt.compare(loginDto.password, user.password);
            if (!passwordMatch) {
                throw new common_1.UnauthorizedException(`Invalid password`);
            }
            const payload = { sub: user.id, email: user.email };
            return {
                ...user,
                access_token: await this.jwtService.signAsync(payload),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        return this.usersRepository.findOne({ where: { id } });
    }
    async findOneRandom() {
        const users = await this.usersRepository.find();
        return users[Math.floor(Math.random() * users.length)];
    }
    async findAll() {
        return this.usersRepository.find();
    }
    async update(id, updateUserDto) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const updatedUser = {
            ...user,
            ...updateUserDto,
        };
        await this.usersRepository.save(updatedUser);
        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            picture: updatedUser.picture,
            role: updatedUser.role,
        };
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map