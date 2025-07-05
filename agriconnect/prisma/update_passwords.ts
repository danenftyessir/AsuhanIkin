import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Ganti 'password123' dengan password sementara yang Anda inginkan
  const temporaryPassword = 'password123'; 
  const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

  console.log('Mencari pengguna yang belum memiliki password...');
  
  const usersToUpdate = await prisma.user.findMany({
    where: {
      password: null,
    },
  });

  if (usersToUpdate.length === 0) {
    console.log('✅ Semua pengguna sudah memiliki password.');
    return;
  }

  console.log(`Menemukan ${usersToUpdate.length} pengguna. Memperbarui password...`);

  const updatedCount = await prisma.user.updateMany({
    where: {
      password: null,
    },
    data: {
      password: hashedPassword,
    },
  });

  console.log(`✅ Berhasil memperbarui password untuk ${updatedCount.count} pengguna.`);
  console.log(`Password sementara yang digunakan: ${temporaryPassword}`);
}

main()
  .catch((e) => {
    console.error('❌ Terjadi kesalahan saat memperbarui password:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });