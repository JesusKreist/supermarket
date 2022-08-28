import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const NUMBER_OF_ITEMS_IN_DB = 3000;
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

const genRandomDecimal = (min: number, max: number, decimalPlaces: number) => {
  const rand = Math.random() * (max - min) + min;
  const power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
};

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

const getCashierOnShift = async () => {
  const cashiersOnShift = await prisma.employee.findMany({
    where: {
      role: 'CASHIER',
      isCurrentlyOnShift: true,
    },
  });

  const cashierOnShift =
    cashiersOnShift[Math.floor(Math.random() * cashiersOnShift.length)];

  return cashierOnShift;
};

const allCustomers = async () => {
  const customers = await prisma.customer.findMany();
  return customers;
};

const makeAnOrder = async (
  customerId: number | undefined,
  employeeId: number | undefined,
) => {
  console.log('#'.repeat(50));
  if (customerId === undefined) {
    const customer = await prisma.customer.findFirst();
    customerId = customer.id;
  }

  if (employeeId === undefined) {
    const employee = await prisma.employee.findFirst({
      where: {
        role: 'CASHIER',
        isCurrentlyOnShift: true,
      },
    });
    employeeId = employee.id;
  }

  const orderData = {
    customerId,
    employeeId,
    createdAt: generateDates().createdAt,
  };

  const { id } = await prisma.order.create({
    data: orderData,
  });

  const numberOfProductsToSkip = generateRandomNumber(1, NUMBER_OF_ITEMS_IN_DB);
  const numberOfProductsToTake = generateRandomNumber(1, 18);
  // get an array of random length of products to add to the order
  const products = await prisma.product.findMany({
    skip: numberOfProductsToSkip,
    take: numberOfProductsToTake,
  });

  console.log(
    `The length of the products array is for order ${id}: `,
    products.length,
  );

  // create products for every product in the products array
  products.forEach(async (product) => {
    await prisma.orderProduct.create({
      data: {
        orderId: id,
        productId: product.sku,
      },
    });
  });

  console.log('Finished making order');
  console.log('#'.repeat(50));
};

const makeManyOrders = async (
  customerId: number,
  numberOfOrdersToMake: number,
) => {
  for (let i = 0; i < numberOfOrdersToMake; i++) {
    const cashierOnShift = await getCashierOnShift();
    const cashierId = cashierOnShift.id;
    makeAnOrder(customerId, cashierId);
  }
};

const makeManyOrdersForManyCustomers = async () => {
  const customers = await allCustomers();
  customers.forEach(async (customer) => {
    const numberOfOrdersToMake = generateRandomNumber(1, 10);
    await makeManyOrders(customer.id, numberOfOrdersToMake);
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
  // generateCustomers(0);
  //   generateEmployees(0, 'MANAGER');
  //   generateEmployees(0, 'SUPERVISOR');
  //   generateEmployees(0);
  //   generateProducts(0);
  makeManyOrdersForManyCustomers();
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
