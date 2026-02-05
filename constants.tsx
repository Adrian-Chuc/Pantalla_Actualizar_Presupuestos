
import { Solicitud, Presupuesto, RequestData, DepartmentEntry } from './types';

export const COLORS = {
  GOLD: '#fac532',
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  DARK_GRAY: '#1A1A1A',
  SUCCESS: '#22c55e',
  DANGER: '#ef4444',
  WARNING: '#f59e0b'
};

export const MOCK_SOLICITUDES: Solicitud[] = [
  { solicitud: 1, subsidiaria: 'DATH 1', solicita: 'Juan Ojeda', fecha: '04/02/2026' },
  { solicitud: 2, subsidiaria: 'NORT 2', solicita: 'Maria Garcia', fecha: '05/02/2026' },
  { solicitud: 3, subsidiaria: 'SUR 4', solicita: 'Carlos Ruiz', fecha: '06/02/2026' },
];

export const MOCK_PRESUPUESTOS: Presupuesto[] = [
  { id: '3', nombre: 'Presupuesto Operativo Q1', departamento: '11000-DIRECCION GENERAL' },
  { id: '4', nombre: 'Presupuesto Operativo Q2', departamento: '22000-OPERACIONES' },
  { id: 'PR-002', nombre: 'Mantenimiento General 2026', departamento: 'Mantenimiento' },
];

export const MOCK_REQUEST_DATA: RequestData = {
  "userId": 1516,
  "userName": "JESUS CHUC",
  "subsidiary": "4",
  "budgetId": "3",
  "combinacionesProblema": [
    {
      "razon": "INSUFFICIENT_BUDGET",
      "departmentId": "1",
      "departmentName": "11000-DIRECCION GENERAL",
      "locationId": "1",
      "locationName": "1000 CORPORATIVO",
      "accountId": "810",
      "accountName": "60201-000-001 GASTOS OPERATIVOS : SERVICIOS : AGUA",
      "montoSolicitadoMXN": 300,
      "montoDisponibleMXN": 50,
      "diferenciaMXN": 250,
      "budgetId": "3"
    },
    {
      "razon": "NO_BUDGET_LINE",
      "departmentId": "1",
      "departmentName": "11000-DIRECCION GENERAL",
      "locationId": "1",
      "locationName": "1000 CORPORATIVO",
      "accountId": "58",
      "accountName": "6000 Expenses : Office Supplies",
      "montoSolicitadoMXN": 500,
      "montoDisponibleMXN": 0,
      "diferenciaMXN": 500,
      "budgetId": null
    }
  ],
  "transactionId": 6994,
  "transactionType": "expensereport",
  "requestType": "MIXED_ISSUES",
  "fechaSolicitud": "2026-02-05T21:13:10.556Z"
};

export const MOCK_BUDGET_HIERARCHY: DepartmentEntry[] = [
  {
    departmentId: "1",
    departmentName: "11000-DIRECCION GENERAL",
    locations: [
      {
        locationId: "1",
        locationName: "1000 CORPORATIVO",
        accounts: [
          { accountId: "810", accountName: "60201-000-001 GASTOS OPERATIVOS : SERVICIOS : AGUA", initialAmount: 1000, remainingAmount: 50 },
          { accountId: "58", accountName: "6000 Expenses : Office Supplies", initialAmount: 500, remainingAmount: 0 },
          { accountId: "101", accountName: "50100 Marketing Digital", initialAmount: 5000, remainingAmount: 4200 },
          { accountId: "102", accountName: "50200 Viajes y Viáticos", initialAmount: 3000, remainingAmount: 2500 }
        ]
      },
      {
        locationId: "2",
        locationName: "1100 OFICINAS NORTE",
        accounts: [
          { accountId: "201", accountName: "60202 Electricidad", initialAmount: 2000, remainingAmount: 1500 },
          { accountId: "202", accountName: "60500 Renta Local", initialAmount: 15000, remainingAmount: 5000 }
        ]
      }
    ]
  },
  {
    departmentId: "2",
    departmentName: "22000-OPERACIONES",
    locations: [
      {
        locationId: "3",
        locationName: "2000 PLANTA LOGISTICA",
        accounts: [
          { accountId: "301", accountName: "70100 Mantenimiento Maquinaria", initialAmount: 10000, remainingAmount: 8500 },
          { accountId: "302", accountName: "70200 Seguridad Privada", initialAmount: 4000, remainingAmount: 4000 }
        ]
      },
      {
        locationId: "4",
        locationName: "2100 CEDIS SUR",
        accounts: [
          { accountId: "401", accountName: "70300 Combustible Transporte", initialAmount: 12000, remainingAmount: 2000 },
          { accountId: "402", accountName: "70400 Empaques y Embalaje", initialAmount: 5000, remainingAmount: 4500 }
        ]
      }
    ]
  }
];
