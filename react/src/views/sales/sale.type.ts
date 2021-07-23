export type SaleProgramData = {
  id: number;
  name: string;
  description: string;
}

export type DashboardProps = {
  program?: SaleProgramData,
  page: string
}

export type RegistrationProps = {
  program?: SaleProgramData,
  page: string
}