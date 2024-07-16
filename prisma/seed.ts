const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const men = await prisma.category.create({
    data: {
      name: "Men",
      slug: "men",
    },
  });
  const clothing = await prisma.category.create({
    data: {
      name: "Clothing",
      slug: "clothing",
    },
  });
  const shoes = await prisma.category.create({
    data: {
      name: "Shoes",
      slug: "shoes",
    },
  });
  const woman = await prisma.category.create({
    data: {
      name: "Women",
      slug: "women",
    },
  });

  console.log({ men, clothing, shoes, woman });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
