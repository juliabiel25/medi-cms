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
}

export interface Hours {
  basicInfoRef: any;
  closeDate: string;
  dayOfTheWeek: number;
  openDate: string;
}

export interface Doctor {
  educationInformation: string;
  email: string;
  facebookAccount: string;
  fieldOfInterest: string;
  imagePath: string;
  imageRef: any;
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

export interface INews {
  authorRef: any;
  categories: number;
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