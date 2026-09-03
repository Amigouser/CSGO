import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { steamId: "76561198000000001" },
      update: {},
      create: {
        steamId: "76561198000000001",
        nickname: "ProPlayer_KG",
        mmr: 5800,
        rank: "Immortal",
        wins: 120,
        losses: 45,
      },
    }),
    prisma.user.upsert({
      where: { steamId: "76561198000000002" },
      update: {},
      create: {
        steamId: "76561198000000002",
        nickname: "MidOrFeed",
        mmr: 5100,
        rank: "Divine",
        wins: 98,
        losses: 52,
      },
    }),
    prisma.user.upsert({
      where: { steamId: "76561198000000003" },
      update: {},
      create: {
        steamId: "76561198000000003",
        nickname: "BishkekBoss",
        mmr: 4200,
        rank: "Ancient",
        wins: 72,
        losses: 48,
      },
    }),
    prisma.user.upsert({
      where: { steamId: "76561198000000004" },
      update: {},
      create: {
        steamId: "76561198000000004",
        nickname: "DotaKing99",
        mmr: 3500,
        rank: "Legend",
        wins: 58,
        losses: 42,
      },
    }),
    prisma.user.upsert({
      where: { steamId: "76561198000000005" },
      update: {},
      create: {
        steamId: "76561198000000005",
        nickname: "CarryPlayer",
        mmr: 4600,
        rank: "Ancient",
        wins: 85,
        losses: 60,
      },
    }),
  ]);

  // Create sample tournaments
  const tournaments = await Promise.all([
    prisma.tournament.upsert({
      where: { id: "seed-t1" },
      update: {},
      create: {
        id: "seed-t1",
        name: "INTKG Winter Cup 2026",
        game: "dota2",
        format: "double_elim",
        status: "registration",
        maxTeams: 16,
        teamSize: 5,
        description: "Зимний кубок по Dota 2. Double Elimination формат с призовым фондом.",
        startDate: new Date("2026-02-15T18:00:00"),
        prizePool: "50,000 сом",
      },
    }),
    prisma.tournament.upsert({
      where: { id: "seed-t2" },
      update: {},
      create: {
        id: "seed-t2",
        name: "CS2 Pro League KG",
        game: "cs2",
        format: "groups_playoffs",
        status: "active",
        maxTeams: 8,
        teamSize: 5,
        description: "Профессиональная лига CS2 в Кыргызстане",
        startDate: new Date("2026-01-20T18:00:00"),
        prizePool: "30,000 сом",
      },
    }),
    prisma.tournament.upsert({
      where: { id: "seed-t3" },
      update: {},
      create: {
        id: "seed-t3",
        name: "Dota 2 Swiss Challenge",
        game: "dota2",
        format: "swiss",
        status: "upcoming",
        maxTeams: 32,
        teamSize: 5,
        description: "Швейцарский формат для всех желающих",
        startDate: new Date("2026-03-01T18:00:00"),
        prizePool: "20,000 сом",
      },
    }),
  ]);

  // Register some users for tournaments
  await Promise.all([
    prisma.tournamentParticipant.upsert({
      where: { userId_tournamentId: { userId: users[0].id, tournamentId: tournaments[0].id } },
      update: {},
      create: { userId: users[0].id, tournamentId: tournaments[0].id },
    }),
    prisma.tournamentParticipant.upsert({
      where: { userId_tournamentId: { userId: users[1].id, tournamentId: tournaments[0].id } },
      update: {},
      create: { userId: users[1].id, tournamentId: tournaments[0].id },
    }),
    prisma.tournamentParticipant.upsert({
      where: { userId_tournamentId: { userId: users[2].id, tournamentId: tournaments[0].id } },
      update: {},
      create: { userId: users[2].id, tournamentId: tournaments[0].id },
    }),
    prisma.tournamentParticipant.upsert({
      where: { userId_tournamentId: { userId: users[3].id, tournamentId: tournaments[0].id } },
      update: {},
      create: { userId: users[3].id, tournamentId: tournaments[0].id },
    }),
    prisma.tournamentParticipant.upsert({
      where: { userId_tournamentId: { userId: users[4].id, tournamentId: tournaments[0].id } },
      update: {},
      create: { userId: users[4].id, tournamentId: tournaments[0].id },
    }),
  ]);

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
