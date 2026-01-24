import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'article' })
@Unique('UQ_article_article_name', ['articleName'])
export class ArticleEntity {
  @PrimaryColumn({ name: 'article_no', type: 'int' })
  articleNo: number;

  @Column({ name: 'article_name', type: 'varchar', length: 50 })
  articleName: string;

  @Column({ name: 'article_hsn_code', type: 'varchar', length: 30, nullable: true })
  articleHsnCode?: string;

  @Column({ name: 'article_unit', type: 'varchar', length: 30, nullable: true })
  articleUnit?: string;

  @Column({ name: 'article_gst_percent', type: 'int', nullable: true })
  articleGstPercent?: number;

  @Column({ name: 'article_date', type: 'date', nullable: true })
  articleDate?: Date;

  @Column({ name: 'article_no_of_ply', type: 'int', nullable: true })
  articleNoOfPly?: number;

  @Column({ name: 'article_flute_type', type: 'varchar', length: 10, nullable: true })
  articleFluteType?: string;

  // SQL float -> Postgres double precision
  @Column({ name: 'article_box_weight', type: 'double precision', nullable: true })
  articleBoxWeight?: number;

  // SQL tinyint -> Postgres smallint
  @Column({ name: 'article_ups', type: 'smallint', nullable: true })
  articleUps?: number;

  @Column({ name: 'article_pcs_per_bunddle', type: 'double precision', nullable: true })
  articlePcsPerBunddle?: number;

  @Column({ name: 'article_id_length', type: 'double precision', nullable: true })
  articleIdLength?: number;

  @Column({ name: 'article_id_width', type: 'double precision', nullable: true })
  articleIdWidth?: number;

  @Column({ name: 'article_id_height', type: 'double precision', nullable: true })
  articleIdHeight?: number;

  @Column({ name: 'article_od_lenth', type: 'double precision', nullable: true })
  articleOdLenth?: number;

  @Column({ name: 'article_od_width', type: 'double precision', nullable: true })
  articleOdWidth?: number;

  @Column({ name: 'article_od_height', type: 'double precision', nullable: true })
  articleOdHeight?: number;

  @Column({ name: 'article_uom', type: 'varchar', length: 10, nullable: true })
  articleUom?: string;

  @Column({ name: 'article_sheet_size', type: 'varchar', length: 50, nullable: true })
  articleSheetSize?: string;

  @Column({ name: 'article_rotary_size', type: 'varchar', length: 50, nullable: true })
  articleRotarySize?: string;

  @Column({ name: 'article_board_cutting_size', type: 'varchar', length: 50, nullable: true })
  articleBoardCuttingSize?: string;

  @Column({ name: 'article_board_gsm', type: 'varchar', length: 50, nullable: true })
  articleBoardGsm?: string;

  @Column({ name: 'article_bs', type: 'varchar', length: 50, nullable: true })
  articleBs?: string;

  @Column({ name: 'article_cs', type: 'varchar', length: 50, nullable: true })
  articleCs?: string;

  @Column({ name: 'article_moisture', type: 'varchar', length: 50, nullable: true })
  articleMoisture?: string;

  @Column({ name: 'article_printing', type: 'varchar', length: 100, nullable: true })
  articlePrinting?: string;

  @Column({ name: 'article_color', type: 'varchar', length: 50, nullable: true })
  articleColor?: string;

  @Column({ name: 'article_art_work', type: 'varchar', length: 100, nullable: true })
  articleArtWork?: string;

  @Column({ name: 'article_block_code', type: 'varchar', length: 50, nullable: true })
  articleBlockCode?: string;

  @Column({ name: 'remarks', type: 'varchar', length: 100, nullable: true })
  remarks?: string;

  @Column({ name: 'article_status', type: 'varchar', length: 30, nullable: true })
  articleStatus?: string;

  @Column({ name: 'article_rate', type: 'double precision', nullable: true })
  articleRate?: number;

  @Column({ name: 'customer_fcode', type: 'int', nullable: true })
  customerFcode?: number;

  @Column({ name: 'article_type', type: 'varchar', length: 20, nullable: true })
  articleType?: string;

  @Column({ name: 'article_pcs_per_board', type: 'double precision', nullable: true })
  articlePcsPerBoard?: number;

  @Column({ name: 'revision', type: 'int', nullable: true })
  revision?: number;

  @Column({ name: 'created_by', type: 'varchar', length: 50, nullable: true })
  createdBy?: string;

  @Column({ name: 'updated_by', type: 'varchar', length: 50, nullable: true })
  updatedBy?: string;

  @Column({ name: 'route', type: 'varchar', length: 30, nullable: true })
  route?: string;

  @Column({ name: 'board_margin', type: 'int', nullable: true })
  boardMargin?: number;

  @Column({ name: 'reel_margin', type: 'int', nullable: true })
  reelMargin?: number;

  @Column({ name: 'article_reel_size', type: 'double precision', nullable: true })
  articleReelSize?: number;

  @Column({ name: 'article_square_meter', type: 'double precision', nullable: true })
  articleSquareMeter?: number;

  // SQL bit -> Postgres boolean
  @Column({ name: 'is_id_selected', type: 'boolean', nullable: true })
  isIdSelected?: boolean;

  @Column({ name: 'item_fcode', type: 'int', nullable: true })
  itemFcode?: number;

  @Column({ name: 'is_tray_required', type: 'boolean', nullable: true })
  isTrayRequired?: boolean;

  @Column({ name: 'is_partition_required', type: 'boolean', nullable: true })
  isPartitionRequired?: boolean;

  @Column({ name: 'no_of_color', type: 'int', nullable: true })
  noOfColor?: number;

  @Column({ name: 'lamination', type: 'varchar', length: 30, nullable: true })
  lamination?: string;

  @Column({ name: 'met_pad', type: 'varchar', length: 30, nullable: true })
  metPad?: string;

  @Column({ name: 'window_article', type: 'varchar', length: 30, nullable: true })
  windowArticle?: string;

  @Column({ name: 'board_length', type: 'double precision', nullable: true })
  boardLength?: number;

  @Column({ name: 'board_width', type: 'double precision', nullable: true })
  boardWidth?: number;

  @Column({ name: 'split_join_stage', type: 'varchar', length: 50, nullable: true })
  splitJoinStage?: string;

  @Column({ name: 'uv', type: 'boolean', nullable: true })
  uv?: boolean;

  @Column({ name: 'dripoff', type: 'boolean', nullable: true })
  dripoff?: boolean;

  @Column({ name: 'varnish', type: 'boolean', nullable: true })
  varnish?: boolean;

  @Column({ name: 'article_current_stock', type: 'double precision', nullable: true })
  articleCurrentStock?: number;

  @Column({ name: 'material_type', type: 'varchar', length: 30, nullable: true })
  materialType?: string;

  @Column({ name: 'uv_size', type: 'varchar', length: 30, nullable: true })
  uvSize?: string;

  @Column({ name: 'dripoff_size', type: 'varchar', length: 30, nullable: true })
  dripoffSize?: string;

  @Column({ name: 'varnish_size', type: 'varchar', length: 30, nullable: true })
  varnishSize?: string;

  @Column({ name: 'article_board_weight', type: 'double precision', nullable: true })
  articleBoardWeight?: number;

  @Column({ name: 'lamination_rate', type: 'double precision', nullable: true })
  laminationRate?: number;

  @Column({ name: 'metpad_rate', type: 'double precision', nullable: true })
  metpadRate?: number;

  @Column({ name: 'window_rate', type: 'double precision', nullable: true })
  windowRate?: number;

  @Column({ name: 'uv_rate', type: 'double precision', nullable: true })
  uvRate?: number;

  @Column({ name: 'dripoff_rate', type: 'double precision', nullable: true })
  dripoffRate?: number;

  @Column({ name: 'varnish_rate', type: 'double precision', nullable: true })
  varnishRate?: number;

  @Column({ name: 'lamination_rs', type: 'double precision', nullable: true })
  laminationRs?: number;

  @Column({ name: 'lamination_cs', type: 'double precision', nullable: true })
  laminationCs?: number;

  @Column({ name: 'lamination_qty', type: 'double precision', nullable: true })
  laminationQty?: number;

  @Column({ name: 'met_pad_rs', type: 'double precision', nullable: true })
  metPadRs?: number;

  @Column({ name: 'met_pad_cs', type: 'double precision', nullable: true })
  metPadCs?: number;

  @Column({ name: 'met_pad_qty', type: 'double precision', nullable: true })
  metPadQty?: number;

  @Column({ name: 'window_rs', type: 'double precision', nullable: true })
  windowRs?: number;

  @Column({ name: 'window_cs', type: 'double precision', nullable: true })
  windowCs?: number;

  @Column({ name: 'window_qty', type: 'double precision', nullable: true })
  windowQty?: number;

  @Column({ name: 'uv_size_ii', type: 'varchar', length: 30, nullable: true })
  uvSizeIi?: string;

  @Column({ name: 'dripoff_size_ii', type: 'varchar', length: 30, nullable: true })
  dripoffSizeIi?: string;

  @Column({ name: 'varnish_size_ii', type: 'varchar', length: 30, nullable: true })
  varnishSizeIi?: string;

  @Column({ name: 'lamination_amt', type: 'double precision', nullable: true })
  laminationAmt?: number;

  @Column({ name: 'metpet_amt', type: 'double precision', nullable: true })
  metpetAmt?: number;

  @Column({ name: 'window_amt', type: 'double precision', nullable: true })
  windowAmt?: number;

  @Column({ name: 'uv_amt', type: 'double precision', nullable: true })
  uvAmt?: number;

  @Column({ name: 'drip_off', type: 'double precision', nullable: true })
  dripOff?: number;

  @Column({ name: 'varnish_amt', type: 'double precision', nullable: true })
  varnishAmt?: number;

  @Column({ name: 'corrugation_ups', type: 'int', nullable: true })
  corrugationUps?: number;

  @Column({ name: 'from_deckle', type: 'int', nullable: true })
  fromDeckle?: number;

  @Column({ name: 'from_length', type: 'int', nullable: true })
  fromLength?: number;
}
