import {
  BaseEntity,
  Column,
  Entity, ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentEntity } from './student.entity';

@Entity()
export class PortfolioUrlEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 3000,
  })
  url: string;

  @ManyToOne(
    type => StudentEntity,
    entity => entity.portfolioUrls,
  )
  student: StudentEntity;
}