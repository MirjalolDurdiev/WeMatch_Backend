// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { UserEntity } from './user.entity';
// import { BaseEntity } from 'src/common/database/BaseEntity';

// @Entity()
// export class AdminEntity extends BaseEntity {

//   @ManyToOne(() => UserEntity, (user) => user.adminRoles, { onDelete: 'CASCADE' })
//   user: UserEntity;

//   @Column({ type: 'enum', enum: ['super_admin', 'moderator'], default: 'moderator' })
//   role: 'super_admin' | 'moderator';
// }
