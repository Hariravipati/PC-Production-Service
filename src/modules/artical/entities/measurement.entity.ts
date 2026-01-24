import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'measurement' })
export class MeasurementEntity {
  @PrimaryColumn({ name: 'unit', type: 'varchar', length: 30 })
  unit: string;

  @Column({ name: 'unit_name', type: 'varchar', length: 30, nullable: true })
  unitName?: string;
}