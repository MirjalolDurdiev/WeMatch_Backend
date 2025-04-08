import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { BaseEntity } from "src/common/database/BaseEntity";

@Entity()
export class ContributionEntity extends BaseEntity {

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity;

    @Column({ type: 'varchar', length: 255 })
    company_name: string;  

    @Column({ type: 'varchar', length: 100 })
    position: string; 

    @Column({ type: 'text', nullable: true })
    description: string;  

    @Column({ type: 'timestamp' })
    start_date: Date;  

    @Column({ type: 'timestamp', nullable: true })
    end_date: Date; 

    @Column({ type: 'boolean', default: false })
    is_current: boolean;  
}
