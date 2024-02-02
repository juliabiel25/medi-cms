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
  ownerPosition: '',
  locationMap: undefined
}

export const basicInfoStore = atom<BasicInfo>(initialBasicInfo)

export const hoursStore = atom<Hours[]>([])

export const initialDoctor: Doctor = {
  educationInformation: '',
  email: '',
  facebookAccount: '',
  fieldOfInterest: '',
  imagePath: {
    altName: '',
    name: '',
    url: ''
  },
  linkedInAccount: '',
  name: '',
  phoneNumber: '',
  specialty: '',
  surname: '',
  services: [],
  id: 0
}

export const doctorsStore = atom<Doctor[]>([])
export const doctorStore = atom<Doctor>(initialDoctor)

export const initialNews: INews = {
  date: '',
  imageRef: undefined,
  text: '',
  title: '',
  id: 0,
  authorRef: {
    description: '',
    name: '',
    surname: '',
    position: ''
  },
  categories: []
}

export const newsStore = atom<INews[]>([])
export const oneNewsStore = atom<INews>(initialNews)

export const departmentsStore = atom<Department[]>([])