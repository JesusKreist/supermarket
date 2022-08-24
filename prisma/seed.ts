import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// model Customer {
//     id            Int      @id @default(autoincrement())
//     firstName     String   @map("first_name") @db.VarChar(100)
//     lastName      String   @map("last_name") @db.VarChar(100)
//     phoneNumber   String   @unique() @map("phone_number") @db.VarChar(10)
//     emailAddress  String   @unique() @map("email_address") @db.VarChar(500)
//     rewardsPoints Int      @default(0) @map("rewards_points")
//     createdAt     DateTime @default(now()) @map("created_at") @db.DateTime(0)
//     updatedAt     DateTime @default(now()) @map("updated_at") @db.DateTime(0)
//     orders        Order[]

//     @@map("customers")
//   }

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateDates = (): {
  createdAt: Date;
  updatedAt: Date;
} => {
  const createdAt = faker.date.past(5);
  const updatedAt = faker.date.between(createdAt, new Date());

  return { createdAt, updatedAt };
};

// for (let i = 0; i < 10; i++) {
//   console.dir(generateDates());
// }

const generateEmployees = async (numberOfEmployees: number) => {
  for (let i = 0; i < numberOfEmployees; i++) {
    console.log(`Adding employee with id ${i + 1}`);

    await prisma.employee.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phoneNumber: faker.phone.number('##########'),
        emailAddress: `${faker.name.firstName()}.${faker.name.lastName()}@mailforspam.com}`,
        streetAddress: faker.address.streetAddress(),
        cityAddress: faker.address.city(),
        stateAddress: faker.address.state(),
        isCurrentlyOnShift: faker.datatype.boolean(),
        lastCheckInTime: faker.date.recent(4),
        role: 'CASHIER',
        ...generateDates(),
      },
    });
  }
};

const generateCustomers = async (numberOfCustomers: number) => {
  for (let i = 0; i < numberOfCustomers; i++) {
    console.log(`Adding customer with id ${i + 1}`);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const emailAddress = `${firstName}.${lastName}@mailforspam.com}`;
    const rewardsPoints = generateRandomNumber(1000, 99999);
    const phoneNumber = faker.phone.number('##########');
    const { createdAt, updatedAt } = generateDates();

    const customerData = {
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      rewardsPoints,
      createdAt,
      updatedAt,
    };

    await prisma.customer.create({
      data: customerData,
    });
  }
};

const main = async () => {
  //   generateCustomers(10);
  generateEmployees(15);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
