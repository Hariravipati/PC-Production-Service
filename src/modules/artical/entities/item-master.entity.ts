import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'item_master' })
export class ItemMasterEntity {
  @PrimaryGeneratedColumn({ name: 'item_code', type: 'int' })
  itemCode: number;

  @Column({ name: 'item_name', type: 'varchar', length: 100, nullable: true })
  itemName?: string;

  @Column({ name: 'item_status', type: 'varchar', length: 10, nullable: true })
  itemStatus?: string;

  @Column({ name: 'item_remarks', type: 'varchar', length: 200, nullable: true })
  itemRemarks?: string;
}