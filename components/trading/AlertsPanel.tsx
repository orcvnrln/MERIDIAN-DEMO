"use client";

import { Bell, Plus, Search, Filter, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Alert {
  id: string;
  title: string;
  symbol: string;
  timeframe: string;
  status: 'triggered' | 'active' | 'stopped';
  type: string;
}

const mockAlerts: Alert[] = [
  { id: '1', title: 'DJI (DJI) Crossing 44,100.00 on AAPL', symbol: 'AAPL', timeframe: '1D', status: 'triggered', type: 'Stopped → Triggered' },
  { id: '2', title: 'NDQ (TVC) Crossing Down SPX (SP) on AAPL', symbol: 'AAPL', timeframe: '1D', status: 'active', type: 'Active · NDQ High' },
  { id: '3', title: 'AAPL Crossing Down 900.00', symbol: 'AAPL', timeframe: '1D', status: 'active', type: 'Active' },
];

const AlertsPanel = () => {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <Tabs defaultValue="alerts" className="h-full flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border">
          <TabsList className="bg-secondary h-8">
            <TabsTrigger value="alerts" className="text-xs h-7 px-3">Alerts</TabsTrigger>
            <TabsTrigger value="history" className="text-xs h-7 px-3">History</TabsTrigger>
            <TabsTrigger value="system" className="text-xs h-7 px-3">System</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Plus className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="alerts" className="flex-1 m-0 overflow-auto">
          <div className="divide-y divide-border">
            {mockAlerts.map((alert) => (
              <AlertRow key={alert.id} alert={alert} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="flex-1 m-0 p-4">
          <p className="text-sm text-muted-foreground text-center">No history available</p>
        </TabsContent>
        
        <TabsContent value="system" className="flex-1 m-0 p-4">
          <p className="text-sm text-muted-foreground text-center">System notifications</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AlertRow = ({ alert }: { alert: Alert }) => {
  const getStatusColor = (status: Alert['status']) => {
    switch (status) {
      case 'triggered': return 'text-down';
      case 'active': return 'text-up';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="px-4 py-3 hover:bg-secondary/50 transition-colors group">
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center mt-0.5">
          <Bell className="w-3 h-3 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{alert.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-secondary px-1.5 py-0.5 rounded">{alert.symbol}, {alert.timeframe}</span>
            <span className={`text-xs ${getStatusColor(alert.status)}`}>{alert.type}</span>
            <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;
