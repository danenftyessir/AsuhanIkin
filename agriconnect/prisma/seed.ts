import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // create users
  const investor = await prisma.user.upsert({
    where: { email: "investor@test.com" },
    update: {},
    create: {
      email: "investor@test.com",
      name: "Sarah Investor",
      role: "INVESTOR",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      phone: "+62812345678",
      location: "Jakarta",
      totalInvestment: 25000000,
      totalReturn: 3125000,
    },
  });

  const farmer1 = await prisma.user.upsert({
    where: { email: "ahmad@test.com" },
    update: {},
    create: {
      email: "ahmad@test.com",
      name: "Ahmad Suryadi",
      role: "FARMER",
      avatar: "https://i.pravatar.cc/150?u=ahmad",
      phone: "+62812345679",
      location: "Boyolali, Jawa Tengah",
      experience: 15,
      rating: 4.9,
      totalProjects: 12,
      verified: true,
    },
  });

  const farmer2 = await prisma.user.upsert({
    where: { email: "siti@test.com" },
    update: {},
    create: {
      email: "siti@test.com",
      name: "Siti Rahayu",
      role: "FARMER",
      avatar: "https://i.pravatar.cc/150?u=siti",
      phone: "+62812345680",
      location: "Lampung Timur",
      experience: 10,
      rating: 4.8,
      totalProjects: 8,
      verified: true,
    },
  });

  const farmer3 = await prisma.user.upsert({
    where: { email: "budi@test.com" },
    update: {},
    create: {
      email: "budi@test.com",
      name: "Budi Hartono",
      role: "FARMER",
      avatar: "https://i.pravatar.cc/150?u=budi",
      phone: "+62812345681",
      location: "Cianjur, Jawa Barat",
      experience: 12,
      rating: 4.7,
      totalProjects: 15,
      verified: true,
    },
  });

  // create investments
  const investment1 = await prisma.investment.upsert({
    where: { id: "inv-1" },
    update: {},
    create: {
      id: "inv-1",
      title: "Cabai Merah Premium",
      description:
        "Proyek penanaman cabai merah dengan sistem IoT monitoring. Varietas unggul dengan produktivitas tinggi dan tahan hama.",
      location: "Boyolali, Jawa Tengah",
      roi: 18,
      duration: 6,
      minInvest: 1000000,
      target: 50000000,
      collected: 32000000,
      status: "FUNDING",
      category: "sayuran",
      image:
        "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=600",
      farmerId: farmer1.id,
    },
  });

  const investment2 = await prisma.investment.upsert({
    where: { id: "inv-2" },
    update: {},
    create: {
      id: "inv-2",
      title: "Jagung Manis Organik",
      description:
        "Budidaya jagung manis organik dengan metode ramah lingkungan. Hasil panen dijamin berkualitas premium.",
      location: "Lampung Timur",
      roi: 15,
      duration: 4,
      minInvest: 500000,
      target: 25000000,
      collected: 18000000,
      status: "PLANTING",
      category: "sayuran",
      image: "https://images.unsplash.com/photo-1551754477-7421e0d9c471?w=600",
      farmerId: farmer2.id,
    },
  });

  const investment3 = await prisma.investment.upsert({
    where: { id: "inv-3" },
    update: {},
    create: {
      id: "inv-3",
      title: "Tomat Cherry Hidroponik",
      description:
        "Teknologi hidroponik modern untuk menghasilkan tomat cherry berkualitas tinggi. Sistem otomatis untuk hasil optimal.",
      location: "Cianjur, Jawa Barat",
      roi: 22,
      duration: 3,
      minInvest: 2000000,
      target: 15000000,
      collected: 5000000,
      status: "FUNDING",
      category: "sayuran",
      image:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600",
      farmerId: farmer3.id,
    },
  });

  // create investment relationships
  await prisma.investmentUser.upsert({
    where: {
      investmentId_userId: {
        investmentId: investment1.id,
        userId: investor.id,
      },
    },
    update: {},
    create: {
      investmentId: investment1.id,
      userId: investor.id,
      amount: 5000000,
    },
  });

  // create products
  const product1 = await prisma.product.upsert({
    where: { id: "prod-1" },
    update: {},
    create: {
      id: "prod-1",
      name: "Cabai Merah Segar",
      description:
        "Cabai merah segar hasil panen langsung dari kebun. Kualitas premium dengan rasa pedas yang pas.",
      price: 35000,
      unit: "kg",
      category: "sayuran",
      stock: 50,
      image:
        "https://images.unsplash.com/photo-1583258292688-d0213dc5252c?w=400",
      organic: true,
      harvestDate: new Date("2025-07-01"),
      farmerId: farmer1.id,
    },
  });

  const product2 = await prisma.product.upsert({
    where: { id: "prod-2" },
    update: {},
    create: {
      id: "prod-2",
      name: "Jagung Manis",
      description:
        "Jagung manis organik dengan rasa yang lezat dan manis alami. Bebas pestisida kimia.",
      price: 12000,
      unit: "kg",
      category: "sayuran",
      stock: 100,
      image: "https://images.unsplash.com/photo-1551754477-7421e0d9c471?w=400",
      organic: true,
      harvestDate: new Date("2025-06-28"),
      farmerId: farmer2.id,
    },
  });

  const product3 = await prisma.product.upsert({
    where: { id: "prod-3" },
    update: {},
    create: {
      id: "prod-3",
      name: "Tomat Cherry Premium",
      description:
        "Tomat cherry hidroponik dengan rasa manis dan tekstur renyah. Kaya vitamin dan antioksidan.",
      price: 25000,
      unit: "500g",
      category: "sayuran",
      stock: 30,
      image:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
      organic: false,
      harvestDate: new Date("2025-06-30"),
      farmerId: farmer3.id,
    },
  });

  // create reviews
  await prisma.review.upsert({
    where: { id: "rev-1" },
    update: {},
    create: {
      id: "rev-1",
      rating: 5,
      comment: "Cabai segar dan pedas sesuai ekspektasi!",
      userId: investor.id,
      productId: product1.id,
    },
  });

  // create IoT data
  await prisma.ioTData.create({
    data: {
      temperature: 28.5,
      humidity: 75,
      soilPh: 6.8,
      nutrients: 85,
      investmentId: investment1.id,
    },
  });

  await prisma.ioTData.create({
    data: {
      temperature: 26.2,
      humidity: 82,
      soilPh: 6.5,
      nutrients: 78,
      investmentId: investment2.id,
    },
  });

  // create progress logs
  await prisma.progressLog.create({
    data: {
      stage: "Perkecambahan",
      description:
        "Proses perkecambahan benih berhasil dengan tingkat keberhasilan 95%",
      progress: 100,
      investmentId: investment1.id,
    },
  });

  await prisma.progressLog.create({
    data: {
      stage: "Pertumbuhan Vegetatif",
      description: "Tanaman tumbuh dengan baik, tinggi rata-rata 25cm",
      progress: 65,
      investmentId: investment1.id,
    },
  });

  // create courses
  await prisma.course.upsert({
    where: { id: "course-1" },
    update: {},
    create: {
      id: "course-1",
      title: "Teknik Budidaya Cabai Modern",
      description:
        "Pelajari teknik budidaya cabai dengan teknologi terkini untuk hasil maksimal.",
      category: "budidaya",
      level: "Pemula",
      duration: 8,
      modules: 12,
      rating: 4.9,
      students: 1250,
      instructor: "Dr. Agus Pertanian",
      image:
        "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=300",
    },
  });

  await prisma.course.upsert({
    where: { id: "course-2" },
    update: {},
    create: {
      id: "course-2",
      title: "Manajemen Hama Terpadu",
      description:
        "Strategi pengendalian hama yang efektif dan ramah lingkungan.",
      category: "perlindungan",
      level: "Menengah",
      duration: 6,
      modules: 8,
      rating: 4.8,
      students: 890,
      instructor: "Prof. Siti Hama",
      image:
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300",
    },
  });

  // create enrollments
  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: farmer1.id,
        courseId: "course-1",
      },
    },
    update: {},
    create: {
      userId: farmer1.id,
      courseId: "course-1",
      progress: 75,
    },
  });

  // create notifications
  await prisma.notification.create({
    data: {
      type: "INVESTMENT",
      message: "Investasi Anda di Cabai Merah mencapai progress 75%",
      userId: investor.id,
    },
  });

  await prisma.notification.create({
    data: {
      type: "INVESTMENT",
      message: "Investasi baru masuk untuk lahan cabai Anda",
      userId: farmer1.id,
    },
  });

  // create chat messages
  await prisma.chatMessage.create({
    data: {
      content:
        "Selamat pagi! Terima kasih sudah tertarik dengan investasi cabai saya.",
      senderId: farmer1.id,
      receiverId: investor.id,
    },
  });

  await prisma.chatMessage.create({
    data: {
      content:
        "Pagi pak! Saya ingin tahu lebih detail tentang kondisi lahannya",
      senderId: investor.id,
      receiverId: farmer1.id,
    },
  });

  // create forum posts
  await prisma.forumPost.create({
    data: {
      title: "Tips Mengatasi Hama Cabai di Musim Hujan",
      content:
        "Bagaimana cara efektif mengatasi hama cabai yang sering muncul di musim hujan? Mohon sharing pengalaman rekan-rekan petani.",
      authorId: farmer1.id,
      replies: 5,
      likes: 12,
    },
  });

  await prisma.forumPost.create({
    data: {
      title: "Investasi Pertanian: Prospek dan Risiko",
      content:
        "Diskusi mengenai prospek dan risiko investasi di sektor pertanian. Apa yang perlu diperhatikan investor pemula?",
      authorId: investor.id,
      replies: 8,
      likes: 18,
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
