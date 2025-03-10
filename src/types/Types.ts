import { Job } from "@/components/common/jobListing/AllJobs";
import { Url } from "url";


// event
export type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type formChangeEvent=React.FormEvent<HTMLFormElement>
export type ChangeEventType = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export interface EducationType {  
  college: string;  
  startYear: string;  
  endYear: string;  
}  
 export interface JobLocationType {
  country: string;
  countryName: string;
  state: string;
  stateName: string;
  city: string;
}

export interface RegisterType {
    email: string
    password:string
    firstName:string
    lastName:string
    location:{
    country: string;
    countryName: string;
    state: string;
    stateName: string;
    city: string;
  }
  gender:string

  education:EducationType[]
  jobTitles:string[],
  jobLocations:JobLocationType[]
}
export interface Ieducation {
  qualification: string;
  startYear: string;
  endYear: string;
  college: string;
  Subject: string;

}[]

export interface IlocationType {
  country: string;
  countryName: string;
  state: string;
  stateName: string;
  city: string;
}

export interface JobLocationType {
  country: string;
  countryName: string;
  state: string;
  stateName: string;
  city: string;
}
export interface Connection {

  connectionID: {
    _id: string;
    profileImage: string;
    firstName: string;
    jobTitle: string[];
    connecting:Connection[]
  };
  status:boolean
  
  createdAt:string;
  _id:string

}
export interface User{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  type: string;
  name: string;
  logo: string;
  following: User[];

  gender: string;

  location?: IlocationType;

  profileImage?: string;
  banner?: string;
  skills?: string[];
  jobTitle?: string[];
  jobLocation?: JobLocationType[];
  education: Ieducation[]

  experience: {
    jobRole: string;
    companyName: string;
    startYear: string;
    endYear: string;
  }[];
  projects?: {
    title: string;
    description: string;
    link?: string | Url | undefined;
  }[];

  connecting: Connection[]
  about?: string;
  createdAt:string;
  updatedAt:string;
  resumePDF?: {
    fileUrl: string;
    fileName: string;
    uploadedAt: Date | null;
    isDeleted: boolean;
  }[];
  resumeVideo?: {
    fileUrl: string;
    fileName: string;
    uploadedAt: Date | null;
    isDeleted: boolean;
  }[];
  role: "user" | "premium";
  subscriptionEndDate: Date | null;
  subscriptionStartDate: Date | null;
  coverLetter?: string;
  isBlocked?: boolean;
  _id: string;
}

export interface Company {
  _id: string;
  name: string;
  logo?: string;
  about?: string;
  email: string;
  contact?: number;
  password: string;
  cpassword:string;
  followers?:User[]
  banner?: string;
  foundedAt: Date;
  employees?: {
    employee: string;  
    position: string; 
  }[];
  role?: "company" | "premium";
  type?:string
  IndustryType?: string;
  founder:string
 
  applications:applicationData[]
  address: {
    pincode: string;
    landmark: string;
    city: string;
    state?: string;
    country?: string;
  };
  socialMedia?:{
    facebook:string
    instagram:string
    linkedin:string
    twitter:string
  }
  workHours?:{
    start:string,
    end:string
  }
  services?:string[]
  subscriptionEndDate?: Date | null;
  subscriptionStartDate?: Date | null;
  isBlocked?: boolean;
  isDeleted?: boolean;
  headquarters?: string; 
  createdAt: string;
    updatedAt: string;
}


export interface applicationData {
    companyId: string;
    coverLetter: string;
    createdAt: string;
    introVideoName: string;
    introVideoUrl: string;
    jobId: Job;
    resumeName: string;
    resumeurl: string;
    offerLetter:string;
    status: string;
    updatedAt: string;
    userId: User;
  }

  
export interface DeleteAccountProps {
  user: User | Company | null
  showPick: boolean
  setShowPick: (value: boolean) => void
  selectedReasons: number[]
  handleClickReason: (index: number, value: string) => void
  onClose: () => void
  onDelete: () => void
  reasons: string[]

}

export interface Subscription {
  clientSecret: string;
  features: string[];
  plan: string;
  price: number;
  paymentStatus: string;
  startDate: string;
  endDate: string;
  userId: string;
  sessionId: string;
  companyId:string
  active:boolean;
}

export interface Rating {
  _id: string;
  review: string;
  starsRating: number;
  userId: {
    firstName: string;
    lastName: string;
    profileImage?: string; 
    jobTitle?: string; 
  };
}
