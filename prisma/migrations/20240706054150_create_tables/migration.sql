-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "grouped" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_groups" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "event_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_peoples" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "matched" TEXT NOT NULL DEFAULT '',
    "cpf" TEXT,

    CONSTRAINT "event_peoples_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_groups" ADD CONSTRAINT "event_groups_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_peoples" ADD CONSTRAINT "event_peoples_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_peoples" ADD CONSTRAINT "event_peoples_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "event_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
