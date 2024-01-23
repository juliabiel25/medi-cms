import { atom } from 'jotai'
import { BasicInfo, Department, Doctor, Hours, INews } from '../interfaces/interface'

const initialBasicInfo: BasicInfo = {
  addressRef: undefined,
  city: '',
  country: '',
  email: '',
  facebookAccount: '',
  footerText: '',
  instagramAccount: '',
  name: '',
  phoneNumber: '',
  twitterAccount: '',
  description: '',
  owner: '',
  ownerPosition: ''
}

export const basicInfoStore = atom<BasicInfo>(initialBasicInfo)

export const hoursStore = atom<Hours[]>([])

const initialDoctor: Doctor = {
  educationInformation: '',
  email: '',
  facebookAccount: '',
  fieldOfInterest: '',
  imagePath: '',
  imageRef: undefined,
  linkedInAccount: '',
  name: '',
  phoneNumber: '',
  specialty: '',
  surname: '',
  services: []
}

export const doctorsStore = atom<Doctor[]>([])
export const doctorStore = atom<Doctor>(initialDoctor)

const initialNews: INews = {
  authorRef: undefined,
  categories: 0,
  date: '',
  imageRef: undefined,
  text: '',
  title: ''
}

export const newsStore = atom<INews[]>([])
export const oneNewsStore = atom<INews>(initialNews)

export const departmentsStore = atom<Department[]>([])