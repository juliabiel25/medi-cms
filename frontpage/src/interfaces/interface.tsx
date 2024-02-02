export interface Author {
  description: string;
  name: string;
  surname: string;
  position: string;
}

export interface BasicInfo {
  addressRef: any;
  city: string;
  country: string;
  email: string;
  facebookAccount: string;
  footerText: string;
  instagramAccount: string;
  name: string;
  phoneNumber: string;
  twitterAccount: string;
  description: string;
  owner: string;
  ownerPosition: string;
  locationMap: any
}

export interface Hours {
  basicInfoRef: any;
  closeDate: string;
  dayOfTheWeek: number;
  openDate: string;
}

export interface Doctor {
  id: number;
  educationInformation: string;
  email: string;
  facebookAccount: string;
  fieldOfInterest: string;
  imagePath: Image;
  linkedInAccount: string;
  name: string;
  phoneNumber: string;
  specialty: string;
  surname: string;
  services: Service[];
}

export interface Service {
  departmentRef: any;
  description: string;
  doctorRef: any;
  name: string;
}

export interface Image {
  altName: string;
  name: string;
  url: string;
}

export interface INews {
  id: number;
  authorRef: Author;
  categories: string[];
  date: string;
  imageRef: any;
  text: string;
  title: string;
}

export interface Department {
  address: any;
  addressRef: any;
  name: string;
}