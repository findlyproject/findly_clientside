import { Job } from "@/components/common/jobListing/AllJobs";
import { UserProfile } from "@/lib/store/features/userSlice";

// event
export type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface Company {
  name: string;
  logo?: string;
  about?: string;
  email: string;
  contact?: number;
  password: string;
  cpassword:string;
  followers?:UserProfile[];
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
}

export interface applicationData {
    companyId: string;
    coverLetter: string;
    createdAt: string;
    introVideoNam: string;
    introVideoUrl: string;
    jobId: Job;
    resumeName: string;
    resumeurl: string;
    offerLetter:string;
    status: string;
    updatedAt: string;
    userId: UserProfile;
  }

  