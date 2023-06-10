import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupFullTextSearch1686176333306 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        UPDATE product
        SET document_with_weights = setweight(to_tsvector(name), 'A') ||
                                    setweight(to_tsvector(coalesce("desc", '')), 'B');
        
        CREATE INDEX document_weights_idx
            ON product
                USING GIN (document_with_weights);
        
        CREATE FUNCTION product_tsvector_trigger() RETURNS trigger AS
        $$
        begin
            new.document_with_weights :=
                        setweight(to_tsvector('english', coalesce(new.name, '')), 'A')
                        || setweight(to_tsvector('english', coalesce(new.desc, '')), 'B');
            return new;
        end
        $$ LANGUAGE plpgsql;
        
        CREATE TRIGGER tsvectorupdate
            BEFORE INSERT OR UPDATE
            ON product
            FOR EACH ROW
        EXECUTE PROCEDURE product_tsvector_trigger();
            `);
	}

	public async down(): Promise<void> {}
}
