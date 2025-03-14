
// import { Url } from "url";


// event
export type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type formChangeEvent=React.FormEvent<HTMLFormElement>
export type ChangeEventType = React.ChangeEvent<HTMLInputElement | HTMLSelectElement|HTMLTextAreaElement>;
export type MouseEventType=React.MouseEvent<HTMLButtonElement>

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
  subject: string;
  _id:string;

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
    _id:string;
  }[];
  projects?: {
    title: string;
    description: string;
    // link?: string | Url | undefined;
    link?: string 
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


 export interface PersonaldetailsProps {
  loading: (isLoading: boolean) => void;
}
export interface ImageType {
  profileImage: string | File | undefined;
  banner: string | File | undefined;
}
export interface FilesState {
  resume: File | null;
  introductionVideo: File | null;
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
  employees: {
    _id:string;
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
  services:string[]
  subscriptionEndDate?: Date | null;
  subscriptionStartDate?: Date | null;
  isBlocked?: boolean;
  isDeleted?: boolean;
  headquarters?: string; 
  createdAt: string;
    updatedAt: string;
}

//  export interface Job {
//     _id: string;
//     title: string;
//     location: string;
//     company: string;
//     salary: { rate: string; min: number; max: number };
//   }
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

//subscription
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


export interface Plan {
  id: number;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
  bgColor: string;
}

export interface Rating {
  _id: string;
  review: string;
  starsRating: number;
  name:string;
  email:string
  userId: {
    firstName: string;
    lastName: string;
    profileImage?: string; 
    jobTitle?: string; 
    createdAt:string
  };
  status:boolean;
  createdAt:string;

}




//community


export interface MessageType{
  _id:string;
  sender:string;
  receiver:string;
  seen:boolean;
  isDeleted:boolean;
  message:string;
  timestamp:Date;

}

export interface MemberType{
  _id:string;
  memberId:{
      _id:string;
      firstName:string;
      lastName:string;
      profileImage:string;
      logo:string;
      name:string
  }
  memberModel:string;
}
export interface CommunityMessage{
  _id:string;
  communityId:string;
  sender:{
      _id:string;
      profileImage:string;
      logo:string;
      firstName:string;
      lastName:string;
      name:string;
  }
  senderModel:string;
  message:string;
  isDelete:boolean;
  type:string;
  timestamp:Date
}
export interface Community {
_id: string;
name: string;
description: string;
profile: string;
members: MemberType[];
createdBy:{
  _id:string;
  name:string
};
isDeleted:boolean;
createdAt:string;
updatedAt:string;

}


//post

export interface IReport {
  _id: string; 
  reportedBy:User;
  reason:string;
  isDeleted:boolean;  
  createdAt:Date;
  updatedAt:Date;
  postId:IPost
  userId:User
  
  }
  
  export interface IReply {
    _id: string;
    user: User|Company | null;
    reply: string;
    repliedAt?: Date;
    isDeleted: boolean;
    updatedAt:Date
   
  }
  
  export interface IComment {
    _id: string;
    user: User | Company  | null;
    comment: string;
    replies: IReply[];  
    isDeleted: boolean;
    createdAt:Date;
    updatedAt:Date
  
  }

   export interface CommentsProps {
    postId: string;
    comments: IComment[];
  }
  export interface PostPreviewProps {
    post: IPost;
  }
  export interface ISavePost{
    _id:string
    description:string
    images?:string[]
    video?:string
    postId:string
  }
  
  export interface IPost {
    _id: string;
    description: string;
    images:string [];
    video:string;
    owner: User |Company|string|null
    likedBy: User[];
    reports:  IReport[];
    comments?:  IComment[] ;
    isDeleted?: boolean;
    createdAt: string;
    updatedAt?: string;
  }
  export interface UpdatePostProps {
    post: IPost;
    setIsUpdateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

  export interface propspsts{
    loadMorePosts:()=>void,
    loading:boolean
  }
  export interface SavePost{
  _id:string;
  images:string[];
  video:string;
  description:string
  postId:{
     _id:string
     images:string[];
     video:string;
     description:string

  }
  userId:{
    _id:string
    firstName:string;
    profileImage:string

  }
  timestamp:Date
}

export interface ReportPostModalType{
  postId:string;
  onClose:()=>void
}

//notification
export interface Notifications {
  id: number;
  type: string;
  user: {
    name: string;
    avatar?: string;
    initials?: string;
    color?: string;
  };
  action: string;
  target?: string;
  time: string;
  category?: string;
  unread: boolean;
  requiresAction?: boolean;
  file?: {
    name: string;
    size: string;
  };
  followUp?: string;
  secretKey?: string;
}



//admin


export interface SkillType{
  _id:string
  name:string
  status:boolean
}

export interface TitleType{
  _id:string
  name:string
  status:boolean
}

export interface Admin {
  email:string
  firstName:string
  lastName:string
  phoneNumber:string
  profileImage:string
  bio:string
 
}

export interface DailyRevenueType {
  day: string;
  revenue: number;
  
}

export interface ItemDashboard{
  item:DailyRevenueType
}


//job
export interface Salary {
  min: number;
  max: number;
  rate: string;
}
export interface Job {
  _id: string;
  title: string;
  company: Company;
  location: string;
  jobType: string;
  experienceLevel: string;
  industry: string;
  description: string;
  requirements: string[];
  jobResponsibilities: string[];
  applicationDeadline: string;
  benefits: string[];
  contactEmail: string;
  contactPhone: string;
  likes: string[];
  salary: Salary
  comments: string[];
  reports: string[];
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Address {
  pincode: string;
  city: string;
  state: string;
  country: string;
}


export interface FilterOption {
  id: string;
  label: string;
  
}
export interface InputType {
  title: string;
  experienceLevel: string;
  industry: string;
  jobType: string;
}
export interface JobFiltersSidebarProps {
  setInput: React.Dispatch<React.SetStateAction<InputType>>
}


export interface JobPosting {
  _id: string;
  title: string;
  description: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  industry: string;
  salary: Salary 
  requirements: string[];
  jobResponsibilities: string[];
  benefits: string[];
  applicationDeadline: string;
  contactEmail: string;
  contactPhone: string;
  
  company:Company
  createdAt: string;
  updatedAt: string;
  status: string;
  isDeleted: boolean;
  __v: number;
  postedBy?: {
    name: string;
  };
};


export interface SavedType{
  jobId:Job
  timestamp:string
  userId:User
  _id:string
  salary:Salary


  postId:{
    _id:string;
    description:string;
    owner:User|Company|null
    createdAt: string;
    images?: string[];
    video?: string;
    likedBy?: any[];
    comments?: any[];
  }
}