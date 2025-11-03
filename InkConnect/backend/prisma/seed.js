import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Artists
  const artist1 = await prisma.artist.create({
    data: {
      name: 'Ayla Nomura',
      email: 'ayla@inkconnect.dev',
      bio: 'Afro-Korean tattoo artist blending traditional and digital art.',
      avatarUrl: 'https://placehold.co/200x200',
      portfolio: {
        create: [
          { title: 'Neo-Tribal Sleeve', imageUrl: 'https://placehold.co/600x400' },
          { title: 'Cyber Geisha', imageUrl: 'https://placehold.co/600x400' }
        ]
      }
    },
    include: { portfolio: true }
  });

  const artist2 = await prisma.artist.create({
    data: {
      name: 'Jin Park',
      email: 'jin@inkconnect.dev',
      bio: 'Specializes in geometric and minimalist designs.',
      avatarUrl: 'https://placehold.co/200x200',
      portfolio: {
        create: [
          { title: 'Mandala Chest Piece', imageUrl: 'https://placehold.co/600x400' }
        ]
      }
    },
    include: { portfolio: true }
  });

  // Create Bookings
  const booking1 = await prisma.booking.create({
    data: {
      artistId: artist1.id,
      clientName: 'Sasha Rivera',
      date: new Date('2025-11-05T14:00:00Z'),
      status: 'confirmed'
    }
  });

  const booking2 = await prisma.booking.create({
    data: {
      artistId: artist2.id,
      clientName: 'Jordan Lee',
      date: new Date('2025-11-12T10:30:00Z'),
      status: 'pending'
    }
  });

  // Create Payments
  await prisma.payment.createMany({
    data: [
      {
        artistId: artist1.id,
        amount: 250.0,
        status: 'completed',
        bookingId: booking1.id
      },
      {
        artistId: artist2.id,
        amount: 180.0,
        status: 'pending',
        bookingId: booking2.id
      }
    ]
  });

  console.log('✅ Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
