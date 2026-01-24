import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'items' })
@Unique('UQ_item_name_color_type_index', [
  'itemName',
  'itemSize',
  'itemColor',
  'itemGsm',
  'itemBf',
])
export class ItemsEntity {
  @PrimaryGeneratedColumn({ name: 'item_code', type: 'int' })
  itemCode: number;

  @Column({ name: 'item_product_group', type: 'varchar', length: 100, nullable: true })
  itemProductGroup?: string;

  @Column({ name: 'item_name', type: 'varchar', length: 100, nullable: true })
  itemName?: string;

  @Column({ name: 'item_hsn_code', type: 'varchar', length: 30, nullable: true })
  itemHsnCode?: string;

  @Column({ name: 'item_unit', type: 'varchar', length: 30, nullable: true })
  itemUnit?: string;

  @Column({ name: 'item_size', type: 'double precision', nullable: true })
  itemSize?: number;

  @Column({ name: 'item_size_inch', type: 'double precision', nullable: true })
  itemSizeInch?: number;

  @Column({ name: 'item_color', type: 'varchar', length: 30, nullable: true })
  itemColor?: string;

  @Column({ name: 'item_gsm', type: 'double precision', nullable: true })
  itemGsm?: number;

  @Column({ name: 'item_bf', type: 'double precision', nullable: true })
  itemBf?: number;

  @Column({ name: 'item_qc_required', type: 'varchar', length: 10, nullable: true })
  itemQcRequired?: string;

  @Column({ name: 'item_access_qty_percent', type: 'double precision', nullable: true })
  itemAccessQtyPercent?: number;

  @Column({ name: 'item_gst_percent', type: 'smallint', nullable: true })
  itemGstPercent?: number;

  @Column({ name: 'item_sl_no', type: 'varchar', length: 10, nullable: true })
  itemSlNo?: string;

  @Column({ name: 'item_purchase_rate', type: 'double precision', nullable: true })
  itemPurchaseRate?: number;

  @Column({ name: 'item_opening_stock', type: 'double precision', nullable: true })
  itemOpeningStock?: number;

  @Column({ name: 'item_min_stock', type: 'double precision', nullable: true })
  itemMinStock?: number;

  @Column({ name: 'item_max_stock', type: 'double precision', nullable: true })
  itemMaxStock?: number;

  @Column({ name: 'item_current_stock', type: 'double precision', nullable: true })
  itemCurrentStock?: number;

  @Column({ name: 'item_image', type: 'bytea', nullable: true })
  itemImage?: Buffer;

  @Column({ name: 'branch', type: 'varchar', length: 100, nullable: true })
  branch?: string;

  @Column({ name: 'user', type: 'varchar', length: 30, nullable: true })
  user?: string;

  @Column({ name: 'item_approval_required', type: 'varchar', length: 5, nullable: true })
  itemApprovalRequired?: string;

  @Column({ name: 'item_remarks', type: 'varchar', length: 100, nullable: true })
  itemRemarks?: string;

  @Column({ name: 'item_type', type: 'varchar', length: 10, nullable: true })
  itemType?: string;

  @Column({ name: 'item_status', type: 'varchar', length: 10 })
  itemStatus: string;

  @Column({ name: 'item_avg_purchase_rate', type: 'double precision' })
  itemAvgPurchaseRate: number;

  @Column({ name: 'paper_type', type: 'varchar', length: 30, nullable: true })
  paperType?: string;
}