import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customer_reel_detail' })
export class CustomerReelDetailEntity {
  @PrimaryGeneratedColumn({ name: 'reel_detail_no', type: 'int' })
  reelDetailNo: number;

  @Column({ name: 'reel_no', type: 'int', nullable: true })
  reelNo?: number;

  @Column({ name: 'item_code', type: 'int', nullable: true })
  itemCode?: number;

  @Column({ name: 'qty', type: 'double precision', nullable: true })
  qty?: number;

  @Column({ name: 'rate', type: 'double precision', nullable: true })
  rate?: number;

  @Column({ name: 'amount', type: 'double precision', nullable: true })
  amount?: number;

  @Column({ name: 'gst_percent', type: 'smallint', nullable: true })
  gstPercent?: number;

  @Column({ name: 'gst_amount', type: 'double precision', nullable: true })
  gstAmount?: number;

  @Column({ name: 'total_amount', type: 'double precision', nullable: true })
  totalAmount?: number;

  @Column({ name: 'remarks', type: 'varchar', length: 200, nullable: true })
  remarks?: string;

  @Column({ name: 'created_by', type: 'varchar', length: 50, nullable: true })
  createdBy?: string;

  @Column({ name: 'updated_by', type: 'varchar', length: 50, nullable: true })
  updatedBy?: string;

  @Column({ name: 'unit', type: 'varchar', length: 30, nullable: true })
  unit?: string;
}