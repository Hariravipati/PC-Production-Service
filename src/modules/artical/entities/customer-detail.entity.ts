import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customer_detail' })
export class CustomerDetailEntity {
  @PrimaryGeneratedColumn({ name: 'customer_code', type: 'int' })
  customerCode: number;

  @Column({ name: 'customer_name', type: 'varchar', length: 200, nullable: true })
  customerName?: string;

  @Column({ name: 'customer_contact_no', type: 'varchar', length: 50, nullable: true })
  customerContactNo?: string;

  @Column({ name: 'customer_address1', type: 'varchar', length: 200, nullable: true })
  customerAddress1?: string;

  @Column({ name: 'customer_address2', type: 'varchar', length: 200, nullable: true })
  customerAddress2?: string;

  @Column({ name: 'customer_gstin', type: 'varchar', length: 50, nullable: true })
  customerGstin?: string;

  @Column({ name: 'customer_state', type: 'varchar', length: 50, nullable: true })
  customerState?: string;

  @Column({ name: 'customer_state_code', type: 'varchar', length: 10, nullable: true })
  customerStateCode?: string;

  @Column({ name: 'customer_country', type: 'varchar', length: 50, nullable: true })
  customerCountry?: string;

  @Column({ name: 'created_by', type: 'varchar', length: 50, nullable: true })
  createdBy?: string;

  @Column({ name: 'updated_by', type: 'varchar', length: 50, nullable: true })
  updatedBy?: string;

  @Column({ name: 'customer_remarks', type: 'varchar', length: 200, nullable: true })
  customerRemarks?: string;
}