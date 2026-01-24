import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'supply_by' })
export class SupplyByEntity {
  @PrimaryColumn({ name: 'supply_by', type: 'varchar', length: 100 })
  supplyBy: string;
}