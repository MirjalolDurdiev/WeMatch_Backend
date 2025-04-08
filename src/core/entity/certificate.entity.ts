import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from 'src/common/database/BaseEntity';

@Entity()
export class CertificateEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.certificates, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column({ length: 255 })
  certificate_name: string;

  @Column({ length: 255 })
  issued_by: string;

  @Column({ type: 'timestamp' })
  issue_date: Date;

  @Column({ length: 500, nullable: true })
  image: string;

  @Column({ length: 500, nullable: true })
  certificate_url: string;

  @Column({ type: 'text', nullable: true })
  description: string;
  
  @Column({ type: 'timestamp', nullable: true })
  expiration_date: Date;

}
