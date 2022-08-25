import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

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

// for (let i = 0; i < 100; i++) {
//   console.log(faker.commerce.price(1, 100, 2));
// }

const genRandomDecimal = (min: number, max: number, decimalPlaces: number) => {
  const rand = Math.random() * (max - min) + min;
  const power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
};

// for (let i = 0; i < 100; i++) {
//   console.log(genRandomDecimal(1, 100, 2));
// }

const generateEmployees = async (
  numberOfEmployees: number,
  role: 'CASHIER' | 'MANAGER' | 'SUPERVISOR' = 'CASHIER',
) => {
  for (let i = 0; i < numberOfEmployees; i++) {
    console.log(`Adding employee with id ${i + 1}`);

    await prisma.employee.create({
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phoneNumber: faker.phone.number('##########'),
        emailAddress: `${faker.name.firstName()}.${faker.name.lastName()}@mailforspam.com`,
        streetAddress: faker.address.streetAddress(),
        cityAddress: faker.address.city(),
        stateAddress: faker.address.state(),
        isCurrentlyOnShift: faker.datatype.boolean(),
        lastCheckInTime: faker.date.recent(4),
        role,
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
    const emailAddress = `${firstName}.${lastName}@mailforspam.com`;
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

const allCashiers = async () => {
  const cashiers = await prisma.employee.findMany({
    where: { role: 'CASHIER' },
  });

  return cashiers;
};

const makeAnOrder = async (customerId: number, employeeId: number) => {
  const orderData = {
    customerId,
    employeeId,
    ...generateDates(),
  };

  await prisma.order.create({
    data: orderData,
  });
};

const generateProducts = async (numberOfProducts: number) => {
  for (let i = 0; i < numberOfProducts; i++) {
    console.log(`Adding product with id ${i + 1}`);
    const itemName = faker.commerce.productName();
    const price = genRandomDecimal(1, 100, 2);
    const category = faker.helpers.arrayElement([
      'Beverages',
      'Condiments',
      'Confections',
      'Dairy Products',
      'Grains/Cereals',
      'Meat/Poultry',
      'Produce',
      'Seafood',
    ]);

    const productData = {
      itemName,
      price,
      category,
    };

    await prisma.product.create({
      data: productData,
    });
  }
};

const main = async () => {
  //   const cashiers = await allCashiers();
  //   console.dir(cashiers);
  //   generateCustomers(10);
  //   generateEmployees(1, 'MANAGER');
  //   generateEmployees(3, 'SUPERVISOR');
  //   generateEmployees(15);
  generateProducts(3000);
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
