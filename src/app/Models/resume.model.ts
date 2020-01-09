export interface ResumeModel {
  name: string
  dob: Date
  address: string
  contact: number
  email: string
  skills: Skill[],
  education: EduModel[]
  certification: CertModel[]
  expeirence: ExpModel[],
  projects: ProjectModel[]
}
export interface Skill {
  name: string
}
export interface EduModel {
  clgName: string
  yearOfPassout: number
  stream: string
}
export interface CertModel {
  instituteName: string
  stream: string
}
export interface ExpModel {
  companyName: string
  yearOfExp: number
  position: string
}
export interface ProjectModel {
  projectName: string
  description: string
  usedSkill: string
}


