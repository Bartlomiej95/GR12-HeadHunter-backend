import {
  BaseEntity,
  Column,
  Entity, ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentEntity } from '../db_proposed_structure/src/student/student.entity';

@Entity()
export class ProjectUrlEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 3000,
  })
  url: string;

  @ManyToOne(
    type => StudentEntity,
    entity => entity.projectUrls,
  )
  student: StudentEntity;
}