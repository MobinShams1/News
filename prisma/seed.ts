import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "فناوری و هوش مصنوعی", slug: "technology" },
    { name: "اقتصادی و بازار", slug: "economy" },
    { name: "ورزشی", slug: "sports" },
    { name: "سیاسی و بین‌الملل", slug: "politics" },
    { name: "فرهنگ و هنر", slug: "culture" },
    { name: "حوادث و جامعه", slug: "society" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
      },
    });
  }

  console.log("Categories seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });