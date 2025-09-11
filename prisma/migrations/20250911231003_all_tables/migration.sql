-- CreateTable
CREATE TABLE "public"."events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "grouped" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."event_groups" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "event_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."event_peoples" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "event_group_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "matched" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "event_peoples_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."event_groups" ADD CONSTRAINT "event_groups_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."event_peoples" ADD CONSTRAINT "event_peoples_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."event_peoples" ADD CONSTRAINT "event_peoples_event_group_id_fkey" FOREIGN KEY ("event_group_id") REFERENCES "public"."event_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
