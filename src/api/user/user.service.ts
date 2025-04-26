import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from 'src/core/entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileService } from 'src/infrastructure/file';
import { QueryHelperService } from 'src/infrastructure/query/query-helper';
import { PaginationDto } from 'src/infrastructure/query/dto/pagination.dto';
import { FilterDto } from 'src/infrastructure/query/dto/filter.dto';
import { BcryptEncryption } from 'src/infrastructure/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly fileService: FileService,
    private readonly queryHelper: QueryHelperService,
  ) { }

  async create(createUserDto: CreateUserDto, currentUserId: string, imageFile: Express.Multer.File): Promise<any> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email, is_deleted: false } });

      if (existingUser) {
        throw new BadRequestException('Email is already in use');
      }

      const hashedPassword = await BcryptEncryption.encrypt(createUserDto.password)

      const user = this.userRepository.create({ ...createUserDto, image: null, password: hashedPassword });

      if (imageFile) {
        const imageFileName = await this.fileService.saveFile(imageFile);
        user.image = imageFileName;
      }

      user.created_by = currentUserId;
      await this.userRepository.save(user);

      return { status: 201, data: user, message: 'User successfully created' };
    } catch (error) {
      throw new InternalServerErrorException('Error creating user: ' + error.message);
    }
  }

  async findAll(paginationDto: PaginationDto, filterDto?: FilterDto): Promise<any> {
    try {
      const queryBuilder: SelectQueryBuilder<UserEntity> = this.userRepository.createQueryBuilder('user');

      // Foydalanuvchi qidirmoqchi bo'lgan ustunlar
      const searchFields = ['user.name', 'user.email'];

      return await QueryHelperService.paginateAndFilter(queryBuilder, paginationDto, filterDto, searchFields);
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving users: ' + error.message);
    }
  }

  async findOneWithRelations(id: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['applications', 'skills', 'certificates', 'education', 'contributions'],
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return { status: 200, data: user, message: 'User retrieved with relations' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Rethrow if it's a NotFoundException
      }
      throw new InternalServerErrorException('Error retrieving user: ' + error.message);
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return { status: 200, data: user, message: 'User retrieved successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Rethrow if it's a NotFoundException
      }
      throw new InternalServerErrorException('Error retrieving user: ' + error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto, currentUserId: string, imageFile: Express.Multer.File): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { id, is_deleted: false } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      let imageFileName = user.image;

      if (imageFile) {
        if (user.image) {
          await this.fileService.deleteFile(user.image);
        }

        imageFileName = await this.fileService.saveFile(imageFile);
      }

      await this.userRepository.update(id, { ...updateUserDto, image: imageFileName, updated_by: currentUserId });

      const updatedUser = await this.userRepository.findOne({ where: { id } });

      return { status: 201, data: updatedUser, message: 'User successfully updated' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; 
      }
      throw new InternalServerErrorException('Error updating user: ' + error.message);
    }
  }

  async updateProfile(id: string, updateUserDto: UpdateUserDto, imageFile: Express.Multer.File): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { id, is_deleted: false } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      let imageFileName = user.image;

      if (imageFile) {
        if (user.image) {
          await this.fileService.deleteFile(user.image);
        }

        imageFileName = await this.fileService.saveFile(imageFile);
      }

      await this.userRepository.update(id, { ...updateUserDto, role: user.role, image: imageFileName, updated_by: id });

      const updatedUser = await this.userRepository.findOne({ where: { id } });

      return { status: 200, data: updatedUser, message: 'User successfully updated' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; 
      }
      throw new InternalServerErrorException('Error updating user: ' + error.message);
    }
  }

  async remove(id: string, currentUserId: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.deleted_at = new Date();
      user.deleted_by = currentUserId;
      user.is_deleted = true;

      await this.userRepository.save(user);

      return { status: 200, data: null, message: 'User successfully soft-deleted' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; 
      }
      throw new InternalServerErrorException('Error deleting user: ' + error.message);
    }
  }
}
