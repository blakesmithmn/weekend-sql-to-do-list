CREATE TABLE "tasks"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (250) NOT NULL,
	"notes" VARCHAR (250),
	"complete" BOOLEAN NOT NULL);


-- test data
INSERT INTO "tasks"
	("name", "notes", "complete")
	VALUES
	('Plant a Money Tree', 'Gotta have more bells!', 'false'),
	('Dig Up Fossils', 'Never know what you might find!', 'false'),
	('Harvest Fruit', 'yum :)', 'true');
	
	
