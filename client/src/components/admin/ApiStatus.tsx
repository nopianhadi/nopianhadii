import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  RefreshCw, 
  AlertTriangle,
  Activity,
  Zap,
  Database,
  Cloud,
  Globe
} from 'lucide-react';
import { useApiConfig } from '@/hooks/use-api-config';
import { useToast } from '@/hooks/use-toast';

interface ApiStatus {
  name: string;
  status: 'online' | 'offline' | 'testing' | 'error';
  responseTime?: number;
  lastChecked?: Date;
  error?: string;
}

export default function ApiStatus() {
  const { endpoints, makeApiCall } = useApiConfig();
  const { toast } = useToast();
  const [apiStatuses, setApiStatuses] = useState<Record<string, ApiStatus>>({});
  const [isTestingAll, setIsTestingAll] = useState(false);

  const testEndpoint = async (endpointName: string) => {
    setApiStatuses(prev => ({
      ...prev,
      [endpointName]: { ...prev[endpointName], status: 'testing' }
    }));

    const startTime = Date.now();
    
    try {
      // For GET endpoints, just test the connection
      // For POST endpoints, use a minimal test payload
      const endpoint = endpoints.find(e => e.name === endpointName);
      if (!endpoint) throw new Error('Endpoint not found');

      let testData = undefined;
      if (endpoint.method === 'POST') {
        // Minimal test data based on endpoint category
        if (endpoint.category === 'ai') {
          testData = { 
            model: 'gpt-3.5-turbo', 
            messages: [{ role: 'user', content: 'test' }],
            max_tokens: 1
          };
        }
      }

      await makeApiCall(endpointName, testData);
      
      const responseTime = Date.now() - startTime;
      
      setApiStatuses(prev => ({
        ...prev,
        [endpointName]: {
          name: endpointName,
          status: 'online',
          responseTime,
          lastChecked: new Date(),
          error: undefined
        }
      }));

      toast({
        title: "Test berhasil!",
        description: `${endpointName} merespons dalam ${responseTime}ms`
      });
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      setApiStatuses(prev => ({
        ...prev,
        [endpointName]: {
          name: endpointName,
          status: 'error',
          responseTime,
          lastChecked: new Date(),
          error: errorMessage
        }
      }));

      toast({
        title: "Test gagal!",
        description: `${endpointName}: ${errorMessage}`,
        variant: "destructive"
      });
    }
  };

  const testAllEndpoints = async () => {
    setIsTestingAll(true);
    
    const testPromises = endpoints
      .filter(endpoint => endpoint.isActive)
      .map(endpoint => testEndpoint(endpoint.name));
    
    await Promise.allSettled(testPromises);
    setIsTestingAll(false);
  };

  const getStatusIcon = (status: ApiStatus['status']) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'offline':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'testing':
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: ApiStatus['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'offline':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'testing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'error':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ai':
        return <Zap className="w-4 h-4" />;
      case 'payment':
        return <Database className="w-4 h-4" />;
      case 'storage':
        return <Cloud className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getOverallHealth = () => {
    const statuses = Object.values(apiStatuses);
    if (statuses.length === 0) return { percentage: 0, status: 'unknown' };
    
    const onlineCount = statuses.filter(s => s.status === 'online').length;
    const percentage = (onlineCount / statuses.length) * 100;
    
    if (percentage === 100) return { percentage, status: 'excellent' };
    if (percentage >= 80) return { percentage, status: 'good' };
    if (percentage >= 60) return { percentage, status: 'fair' };
    return { percentage, status: 'poor' };
  };

  const health = getOverallHealth();

  // Auto-test endpoints on component mount
  useEffect(() => {
    if (endpoints.length > 0) {
      // Initialize status for all endpoints
      const initialStatuses: Record<string, ApiStatus> = {};
      endpoints.forEach(endpoint => {
        initialStatuses[endpoint.name] = {
          name: endpoint.name,
          status: 'offline'
        };
      });
      setApiStatuses(initialStatuses);
    }
  }, [endpoints]);

  return (
    <div className="space-y-6">
      {/* Overall Health */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold">Status API System</h3>
            <p className="text-gray-600">Monitor kesehatan endpoint API</p>
          </div>
          <Button
            onClick={testAllEndpoints}
            disabled={isTestingAll}
            className="gap-2"
          >
            {isTestingAll ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Activity className="w-4 h-4" />
            )}
            Test Semua
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Kesehatan Sistem</span>
                <span className="text-sm text-gray-600">{Math.round(health.percentage)}%</span>
              </div>
              <Progress value={health.percentage} className="h-2" />
            </div>
            <Badge className={
              health.status === 'excellent' ? 'bg-green-100 text-green-700' :
              health.status === 'good' ? 'bg-blue-100 text-blue-700' :
              health.status === 'fair' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }>
              {health.status === 'excellent' ? 'Sangat Baik' :
               health.status === 'good' ? 'Baik' :
               health.status === 'fair' ? 'Cukup' : 'Buruk'}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(apiStatuses).filter(s => s.status === 'online').length}
              </div>
              <div className="text-sm text-green-600">Online</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {Object.values(apiStatuses).filter(s => s.status === 'error' || s.status === 'offline').length}
              </div>
              <div className="text-sm text-red-600">Offline</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Object.values(apiStatuses).filter(s => s.status === 'testing').length}
              </div>
              <div className="text-sm text-blue-600">Testing</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                {endpoints.filter(e => e.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Individual Endpoint Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {endpoints
          .filter(endpoint => endpoint.isActive)
          .map(endpoint => {
            const status = apiStatuses[endpoint.name];
            return (
              <Card key={endpoint.id} className="p-4 hover:shadow-lg transition-all">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(endpoint.category)}
                        <h4 className="font-semibold text-sm">{endpoint.name}</h4>
                      </div>
                      <p className="text-xs text-gray-600 truncate">{endpoint.url}</p>
                    </div>
                    {getStatusIcon(status?.status || 'offline')}
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(status?.status || 'offline')}>
                      {status?.status === 'online' ? 'Online' :
                       status?.status === 'testing' ? 'Testing' :
                       status?.status === 'error' ? 'Error' : 'Offline'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {endpoint.method}
                    </Badge>
                  </div>

                  {status?.responseTime && (
                    <div className="text-xs text-gray-600">
                      Response: {status.responseTime}ms
                    </div>
                  )}

                  {status?.lastChecked && (
                    <div className="text-xs text-gray-500">
                      Last checked: {status.lastChecked.toLocaleTimeString()}
                    </div>
                  )}

                  {status?.error && (
                    <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                      {status.error}
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testEndpoint(endpoint.name)}
                    disabled={status?.status === 'testing'}
                    className="w-full gap-2"
                  >
                    {status?.status === 'testing' ? (
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    ) : (
                      <Activity className="w-3 h-3" />
                    )}
                    Test
                  </Button>
                </div>
              </Card>
            );
          })}
      </div>

      {endpoints.filter(e => e.isActive).length === 0 && (
        <Card className="p-8 text-center">
          <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Belum Ada Endpoint Aktif
          </h3>
          <p className="text-gray-500">
            Tambahkan endpoint API untuk mulai monitoring
          </p>
        </Card>
      )}
    </div>
  );
}