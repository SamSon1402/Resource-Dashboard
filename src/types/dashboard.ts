// src/types/dashboard.ts

export interface ProjectData {
    project: string;
    utilization: number;
    budget: number;
    staff: number;
    equipment: number;
    efficiency: number;
    completion: number;
    risk: number;
    status: string;
  }
  
  export interface HistoricalData {
    date: string;
    efficiency: number;
    utilization: number;
    risk: number;
  }
  
  export interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }
  
  export interface ChartClickData {
    activePayload?: Array<{
      payload: ProjectData;
    }>;
  }