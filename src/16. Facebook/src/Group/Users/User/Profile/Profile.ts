import Work from "./Work";
import Education from "./Education";
import Address from "./Address";

export default class Profile {
  private readonly works: Work[] = [];
  private readonly educations: Education[] = [];
  private readonly addresses: Address[] = []

  public getWorks(): Work[] {
    return this.works;
  }

  public addWork(work: Work) {
    return this.works.push(work);
  }

  public getEducations(): Education[] {
    return this.educations;
  }

  public addEducation(education: Education) {
    return this.educations.push(education);
  }

  public getAddresses(): Address[] {
    return this.addresses;
  }

  public addAddress(address: Address) {
    return this.addresses.push(address);
  }
}
