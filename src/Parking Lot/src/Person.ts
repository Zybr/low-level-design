export default class Person {
  private name?: string;
  private country?: string;
  private state?: string;
  private city?: string;
  private address?: string;
  private zipCode?: string;

  getName(): string {
    return this.name;
  }

  setName(value: string): this {
    this.name = value;
    return this;
  }

  getCountry(): string {
    return this.country;
  }

  setCountry(value: string): this {
    this.country = value;
    return this;
  }

  getState(): string {
    return this.state;
  }

  setState(value: string): this {
    this.state = value;
    return this;
  }

  getCity(): string {
    return this.city;
  }

  setCity(value: string): this {
    this.city = value;
    return this;
  }

  getAddress(): string {
    return this.address;
  }

  setAddress(value: string): this {
    this.address = value;
    return this;
  }

  getZipCode(): string {
    return this.zipCode;
  }

  setZipCode(value: string): this {
    this.zipCode = value;
    return this;
  }
}
