import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find a test user and their character
  const user = await prisma.user.findFirst({});
  if (!user) throw new Error('No user found');
  const character = await prisma.character.findFirst({ where: { userId: user.id } });
  if (!character) throw new Error('No character found');

  // Create sample equipment item
  const swordItem = await prisma.item.create({
    data: {
      name: 'Plasma Sword',
      description: 'A high-tech sword with plasma blade.',
      type: 'EQUIPMENT',
      rarity: 'RARE',
      equipment: {
        create: {
          slot: 'WEAPON',
          attack: 15,
          defense: 2,
        },
      },
    },
    include: { equipment: true },
  });
  // Create sample consumable item
  const stimItem = await prisma.item.create({
    data: {
      name: 'Nano Stimpack',
      description: 'Restores 50 health instantly.',
      type: 'CONSUMABLE',
      rarity: 'UNCOMMON',
      consumable: {
        create: {
          effect: 'Restore Health',
          amount: 50,
        },
      },
    },
    include: { consumable: true },
  });

  // Add items to character's inventory
  await prisma.inventoryItem.create({
    data: {
      characterId: character.id,
      itemId: swordItem.id,
      quantity: 1,
      equipped: true, // Equip the sword
      equippedByCharacterId: character.id,
    },
  });

  await prisma.inventoryItem.create({
    data: {
      characterId: character.id,
      itemId: stimItem.id,
      quantity: 3,
      equipped: false,
    },
  });

  console.log('Test items added to inventory!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
