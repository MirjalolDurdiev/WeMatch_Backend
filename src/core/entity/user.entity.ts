import { Entity, Column, OneToMany } from 'typeorm';
import { ApplicationEntity } from './application.entity';
import { SkillEntity } from './skill.entity';
import { CertificateEntity } from './certificate.entity';
import { EducationEntity } from './education.entity';
import { ContributionEntity } from './contribution-history.entity';
import { BaseEntity } from 'src/common/database/BaseEntity';
import { Gender, UserRoles } from 'src/common/database/Enum';

@Entity()
export class UserEntity extends BaseEntity {

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ nullable: true })
  image: string

  @Column({ nullable: true })
  age: number

  @Column({ nullable: true })
  gender: Gender

  @Column({ nullable: true })
  location: string


  @Column({ type: 'enum', enum: UserRoles, default: 'user' })
  role: UserRoles;

  @Column({ nullable: true, type: 'text' })
  bio: string

  @OneToMany(() => ApplicationEntity, (application) => application.user)
  applications: ApplicationEntity[];

  @OneToMany(() => SkillEntity, (skill) => skill.user)
  skills: SkillEntity[];

  @OneToMany(() => CertificateEntity, (certificate) => certificate.user)
  certificates: CertificateEntity[];

  @OneToMany(() => EducationEntity, (education) => education.user)
  education: EducationEntity[];

  @OneToMany(() => ContributionEntity, (contribution) => contribution.user)
  contributions: ContributionEntity[];
}
