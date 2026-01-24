import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'item_master' })
export class ItemMaster {
  @PrimaryColumn({ name: 'master_item_name', type: 'varchar', length: 100 })
  masterItemName: string;

  @Column({ name: 'master_hsn_code', type: 'varchar', length: 30, nullable: true })
  masterHsnCode?: string;

  @Column({ name: 'master_item_unit', type: 'varchar', length: 10, nullable: true })
  masterItemUnit?: string;

  @Column({ name: 'master_item_gst_percent', type: 'smallint', nullable: true })
  masterItemGstPercent?: number;
}