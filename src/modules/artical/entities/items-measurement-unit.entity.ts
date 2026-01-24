import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items_measurement_unit' })
export class ItemsMeasurementUnitEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'item_code', type: 'int' })
  itemCode: number;

  @Column({ name: 'unit', type: 'varchar', length: 30 })
  unit: string;
}