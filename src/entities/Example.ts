import {
  Column,
  Entity,
  PrimaryColumn,
  Generated
} from 'typeorm';

@Entity('example')
export class Example {
  @PrimaryColumn('int')
  @Generated()
  id: number;

  @Column('varchar')
  title: string;
}