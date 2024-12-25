// src/components/ui/ResourceDashboard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Line, ComposedChart, Area, AreaChart
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Play, Pause } from 'lucide-react';
import { ProjectData, HistoricalData, TooltipProps, ChartClickData } from '@/types/dashboard';

const ResourceDashboard = () => {
  const [resourceData, setResourceData] = useState<ProjectData[]>([
    { 
      project: 'Project A', 
      utilization: 80, 
      budget: 100000, 
      staff: 15, 
      equipment: 8,
      efficiency: 85,
      completion: 70,
      risk: 25,
      status: 'active'
    },
    { 
      project: 'Project B', 
      utilization: 60, 
      budget: 75000, 
      staff: 12, 
      equipment: 6,
      efficiency: 75,
      completion: 45,
      risk: 35,
      status: 'active'
    },
    { 
      project: 'Project C', 
      utilization: 40, 
      budget: 50000, 
      staff: 8, 
      equipment: 4,
      efficiency: 65,
      completion: 30,
      risk: 45,
      status: 'active'
    },
    { 
      project: 'Project D', 
      utilization: 70, 
      budget: 85000, 
      staff: 10, 
      equipment: 7,
      efficiency: 80,
      completion: 60,
      risk: 30,
      status: 'active'
    }
  ]);

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed] = useState(1000);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);

  useEffect(() => {
    const initialHistory: HistoricalData[] = Array(30).fill(0).map((_, i) => ({
      date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      efficiency: 65 + Math.sin(i / 3) * 15 + Math.random() * 5,
      utilization: 70 + Math.cos(i / 4) * 20 + Math.random() * 5,
      risk: 30 + Math.sin(i / 2) * 10 + Math.random() * 5
    }));
    setHistoricalData(initialHistory);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isSimulating) {
      interval = setInterval(() => {
        setResourceData(prevData => prevData.map(project => ({
          ...project,
          utilization: Math.max(0, Math.min(100, project.utilization + (Math.random() - 0.5) * 10)),
          efficiency: Math.max(0, Math.min(100, project.efficiency + (Math.random() - 0.5) * 8)),
          completion: Math.min(100, project.completion + Math.random() * 2),
          risk: Math.max(0, Math.min(100, project.risk + (Math.random() - 0.5) * 5))
        })));

        setHistoricalData(prevHistory => {
          if (!prevHistory.length) return prevHistory;
          const lastEntry = prevHistory[prevHistory.length - 1];
          const newData = [...prevHistory.slice(1), {
            date: new Date().toLocaleDateString(),
            efficiency: lastEntry.efficiency + (Math.random() - 0.5) * 5,
            utilization: lastEntry.utilization + (Math.random() - 0.5) * 5,
            risk: lastEntry.risk + (Math.random() - 0.5) * 3
          }];
          return newData;
        });

        if (Math.random() > 0.8) {
          const newAlert = `Alert: Unusual ${Math.random() > 0.5 ? 'utilization' : 'efficiency'} pattern detected in ${
            resourceData[Math.floor(Math.random() * resourceData.length)].project
          }`;
          setAlerts(prev => [...prev.slice(-4), newAlert]);
        }
      }, simulationSpeed);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isSimulating, simulationSpeed, resourceData]);

  const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {Math.round(entry.value)}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleChartClick = (data: ChartClickData): void => {
    if (data && data.activePayload?.[0]?.payload) {
      setSelectedProject(data.activePayload[0].payload);
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Resource Optimization Dashboard</span>
            <div className="flex gap-2">
              <Button 
                onClick={() => setIsSimulating(!isSimulating)} 
                variant={isSimulating ? "destructive" : "default"}
              >
                {isSimulating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
              </Button>
              <Button 
                onClick={() => {
                  const csvContent = "data:text/csv;charset=utf-8," + 
                    Object.keys(resourceData[0]).join(",") + "\n" +
                    resourceData.map(row => Object.values(row).join(",")).join("\n");
                  const link = document.createElement("a");
                  link.setAttribute("href", encodeURI(csvContent));
                  link.setAttribute("download", "resource_data.csv");
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }} 
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.length > 0 && (
            <div className="mb-4">
              {alerts.map((alert, index) => (
                <Alert key={index} className="mb-2">
                  <AlertDescription>{alert}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Resource Metrics</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart 
                  data={resourceData}
                  onClick={handleChartClick}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="project" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="utilization" fill="#3498db" name="Utilization %" />
                  <Bar yAxisId="left" dataKey="efficiency" fill="#2ecc71" name="Efficiency %" />
                  <Line yAxisId="right" type="monotone" dataKey="risk" stroke="#e74c3c" name="Risk %" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Live Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#2ecc71" 
                    fill="#2ecc71" 
                    fillOpacity={0.6} 
                    name="Efficiency %"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="utilization" 
                    stroke="#3498db" 
                    fill="#3498db" 
                    fillOpacity={0.6} 
                    name="Utilization %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resourceData.map((project) => (
              <Card 
                key={project.project}
                className={`cursor-pointer transition-all ${
                  selectedProject?.project === project.project ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>{project.project}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
                    }`}>
                      {project.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Budget:</span>
                      <span>€{Math.round(project.budget).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Utilization:</span>
                      <span className="text-blue-600">{Math.round(project.utilization)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Efficiency:</span>
                      <span className="text-green-600">{Math.round(project.efficiency)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completion:</span>
                      <span className="text-purple-600">{Math.round(project.completion)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level:</span>
                      <span className={project.risk > 50 ? 'text-red-600' : 'text-orange-600'}>
                        {Math.round(project.risk)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceDashboard;