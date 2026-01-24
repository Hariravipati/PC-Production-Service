import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customer_reel' })
export class CustomerReelEntity {
  @PrimaryGeneratedColumn({ name: 'reel_no', type: 'int' })
  reelNo: number;

  @Column({ name: 'customer_code', type: 'int', nullable: true })
  customerCode?: number;

  @Column({ name: 'reel_date', type: 'date', nullable: true })
  reelDate?: Date;

  @Column({ name: 'remarks', type: 'varchar', length: 200, nullable: true })
  remarks?: string;
}