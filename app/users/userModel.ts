export class Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}

export class UserModel {
    id: string;
    name: string;
    phone: string;
    email: string;
    address = new Address();
} 