/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// eslint-disable-next-line prettier/prettier
export default class CreateAppointments1594256576978 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'appointments',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'provider',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'date',
						type: 'timestamp with time zone',
						isNullable: false,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('appointments');
	}
}
