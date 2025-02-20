export interface Devs {
  _id: string;
  user: {
    avatar: string;
    name: string;
  };
  status: string;
  company?: string; 
  location?: string;
  skills: string[];
}
