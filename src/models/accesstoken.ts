import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('accesstoken')
  export class AccessToken extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @PrimaryColumn({ name: 'id' })
    id: string;
  
    @PrimaryColumn({ name: 'user_id' })
    userId: string;
  
    @Column({ name: 'created_date' })
    createdDate: Date;
  }
  