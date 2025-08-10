module.exports = {
  schemas: [
    { name: 'user', schemaPath: './prisma/schema-user.prisma' },
    { name: 'item', schemaPath: './prisma/schema-item.prisma' },
    { name: 'pvp', schemaPath: './prisma/schema-pvp.prisma' },
    { name: 'achievements', schemaPath: './prisma/schema-achievements-titles.prisma' },
    { name: 'crime', schemaPath: './prisma/schema-crime.prisma' },
    { name: 'techniques', schemaPath: './prisma/schema-techniques-buffs.prisma' },
  ],
};
// This configuration file is used to define multiple Prisma schemas for the application.
// Each schema corresponds to a specific domain or feature of the application.
