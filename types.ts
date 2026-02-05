
export enum ViewMode {
  SOLICITUDES = 'SOLICITUDES',
  GENERAL = 'GENERAL'
}

export enum AppScreen {
  SELECTION = 'SELECTION',
  ADJUSTMENT = 'ADJUSTMENT'
}

export interface Solicitud {
  solicitud: number;
  subsidiaria: string;
  solicita: string;
  fecha: string;
}

export interface Presupuesto {
  id: string;
  nombre: string;
  departamento: string;
}

export interface ProblemCombination {
  razon: string;
  departmentId: string;
  departmentName: string;
  locationId: string;
  locationName: string;
  accountId: string;
  accountName: string;
  montoSolicitadoMXN: number;
  montoDisponibleMXN: number;
  diferenciaMXN: number;
  budgetId: string | null;
}

export interface RequestData {
  userId: number;
  userName: string;
  subsidiary: string;
  budgetId: string;
  combinacionesProblema: ProblemCombination[];
  transactionId: number;
  transactionType: string;
  requestType: string;
  fechaSolicitud: string;
}

export interface AccountEntry {
  accountId: string;
  accountName: string;
  initialAmount: number;
  remainingAmount: number;
}

export interface LocationEntry {
  locationId: string;
  locationName: string;
  accounts: AccountEntry[];
}

export interface DepartmentEntry {
  departmentId: string;
  departmentName: string;
  locations: LocationEntry[];
}
