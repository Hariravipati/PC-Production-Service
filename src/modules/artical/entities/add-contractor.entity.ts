import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'add_contractor' })
export class AddContractorEntity {
  @PrimaryGeneratedColumn({ name: 'contractor_code', type: 'int' })
  contractorCode: number;

  @Column({ name: 'contractor_name', type: 'varchar', length: 100, nullable: true })
  contractorName?: string;

  @Column({ name: 'contractor_contact_no', type: 'varchar', length: 50, nullable: true })
  contractorContactNo?: string;

  @Column({ name: 'contractor_address1', type: 'varchar', length: 150, nullable: true })
  contractorAddress1?: string;

  @Column({ name: 'contractor_address2', type: 'varchar', length: 150, nullable: true })
  contractorAddress2?: string;

  @Column({ name: 'contractor_state', type: 'varchar', length: 50, nullable: true })
  contractorState?: string;

  @Column({ name: 'contractor_state_code', type: 'varchar', length: 5, nullable: true })
  contractorStateCode?: string;

  @Column({ name: 'contractor_country', type: 'varchar', length: 30, nullable: true })
  contractorCountry?: string;

  @Column({ name: 'contractor_tin_no', type: 'varchar', length: 30, nullable: true })
  contractorTinNo?: string;

  @Column({ name: 'contractor_remarks', type: 'varchar', length: 200, nullable: true })
  contractorRemarks?: string;

  @Column({ name: 'created_by', type: 'varchar', length: 50, nullable: true })
  createdBy?: string;

  @Column({ name: 'updated_by', type: 'varchar', length: 50, nullable: true })
  updatedBy?: string;
}