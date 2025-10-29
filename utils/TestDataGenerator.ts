export interface UserData {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
  title: 'Mr' | 'Mrs';
  day: string;
  month: string;
  year: string;
}

export class TestDataGenerator {
  static generateUniqueUser(): UserData {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 1000);
    
    return {
      name: `TestUser${timestamp}${randomSuffix}`,
      email: `testuser${timestamp}${randomSuffix}@example.com`,
      password: 'TestPassword123!',
      firstName: 'John',
      lastName: 'Doe',
      company: 'Test Automation Company',
      address1: '123 Test Street',
      address2: 'Suite 456',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipcode: '90210',
      mobileNumber: '+1234567890',
      title: 'Mr',
      day: '15',
      month: 'January',
      year: '1990'
    };
  }

  static generateRandomUser(): UserData {
    const timestamp = Date.now();
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    const companies = ['Tech Corp', 'Digital Solutions', 'Innovation Labs', 'Future Systems', 'Smart Technologies'];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'];
    const states = ['California', 'Texas', 'Florida', 'New York', 'Pennsylvania', 'Illinois'];
    
    const firstName = names[Math.floor(Math.random() * names.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    
    return {
      name: `${firstName}${timestamp}`,
      email: `${firstName.toLowerCase()}${timestamp}@example.com`,
      password: 'SecurePass123!',
      firstName,
      lastName,
      company,
      address1: `${Math.floor(Math.random() * 9999)} Test Avenue`,
      address2: `Apt ${Math.floor(Math.random() * 99) + 1}`,
      country: 'United States',
      state,
      city,
      zipcode: Math.floor(Math.random() * 90000 + 10000).toString(),
      mobileNumber: `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
      title: Math.random() > 0.5 ? 'Mr' : 'Mrs',
      day: (Math.floor(Math.random() * 28) + 1).toString(),
      month: ['January', 'February', 'March', 'April', 'May', 'June', 
              'July', 'August', 'September', 'October', 'November', 'December']
              [Math.floor(Math.random() * 12)],
      year: (1950 + Math.floor(Math.random() * 50)).toString()
    };
  }

  static getValidEmailFormats(): string[] {
    const timestamp = Date.now();
    return [
      `user${timestamp}@example.com`,
      `test.user${timestamp}@domain.org`,
      `user+tag${timestamp}@example.net`,
      `user_name${timestamp}@example.co.uk`,
      `123user${timestamp}@example.info`
    ];
  }

  static getInvalidEmailFormats(): string[] {
    const timestamp = Date.now();
    return [
      `invalid-email${timestamp}`,
      `@example.com`,
      `user${timestamp}@`,
      `user${timestamp}@.com`,
      `user${timestamp}.example.com`,
      `user ${timestamp}@example.com`
    ];
  }
}