import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Globe,
  Key,
  Settings,
  Activity,
  Zap,
  Database,
  Cloud,
  Shield,
  TestTube,
  Copy,
  ExternalLink
} from "lucide-react";
import ApiStatus from "./ApiStatus";
import ApiUsageDemo from "../examples/ApiUsageDemo";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers: Record<string, string>;
  description: string;
  category: string;
  isActive: boolean;
  requiresAuth: boolean;
  apiKey?: string;
  rateLimit?: number;
  timeout?: number;
  retryAttempts?: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiConfiguration {
  id: string;
  key: string;
  value: any;
  description: string;
  category: 'ai' | 'payment' | 'storage' | 'notification' | 'analytics' | 'other';
  isSecret: boolean;
  isActive: boolean;
  environment: 'development' | 'staging' | 'production';
  createdAt: string;
  updatedAt: string;
}

export default function ApiManagement() {
  const [activeTab, setActiveTab] = useState("endpoints");
  const [showSecrets, setShowSecrets] = useState(false);
  const [isCreateEndpointOpen, setIsCreateEndpointOpen] = useState(false);
  const [isCreateConfigOpen, setIsCreateConfigOpen] = useState(false);
  const [editingEndpoint, setEditingEndpoint] = useState<ApiEndpoint | null>(null);
  const [editingConfig, setEditingConfig] = useState<ApiConfiguration | null>(null);
  const [testingEndpoint, setTestingEndpoint] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<any>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Form states
  const [endpointForm, setEndpointForm] = useState<{
    name: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers: string;
    description: string;
    category: string;
    isActive: boolean;
    requiresAuth: boolean;
    apiKey: string;
    rateLimit: number;
    timeout: number;
    retryAttempts: number;
  }>({
    name: "",
    url: "",
    method: "GET",
    headers: "{}",
    description: "",
    category: "",
    isActive: true,
    requiresAuth: false,
    apiKey: "",
    rateLimit: 100,
    timeout: 30000,
    retryAttempts: 3
  });

  const [configForm, setConfigForm] = useState<{
    key: string;
    value: string;
    description: string;
    category: 'ai' | 'payment' | 'storage' | 'notification' | 'analytics' | 'other';
    isSecret: boolean;
    isActive: boolean;
    environment: 'development' | 'staging' | 'production';
  }>({
    key: "",
    value: "",
    description: "",
    category: "other",
    isSecret: false,
    isActive: true,
    environment: "production"
  });

  // Fetch API endpoints
  const { data: endpoints, isLoading: endpointsLoading } = useQuery<ApiEndpoint[]>({
    queryKey: ["api_endpoints"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('api_endpoints')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Fetch API configurations
  const { data: configurations, isLoading: configurationsLoading } = useQuery<ApiConfiguration[]>({
    queryKey: ["api_configurations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('api_configurations')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Create endpoint mutation
  const createEndpointMutation = useMutation({
    mutationFn: async (data: Omit<ApiEndpoint, 'id' | 'createdAt' | 'updatedAt'>) => {
      const { data: result, error } = await supabase
        .from('api_endpoints')
        .insert([{
          ...data,
          headers: typeof data.headers === 'string' ? JSON.parse(data.headers) : data.headers
        }])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api_endpoints"] });
      toast({ title: "API Endpoint berhasil dibuat!" });
      setIsCreateEndpointOpen(false);
      resetEndpointForm();
    },
  });

  // Update endpoint mutation
  const updateEndpointMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ApiEndpoint> }) => {
      const { data: result, error } = await supabase
        .from('api_endpoints')
        .update({
          ...data,
          headers: typeof data.headers === 'string' ? JSON.parse(data.headers) : data.headers,
          updatedAt: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api_endpoints"] });
      toast({ title: "API Endpoint berhasil diperbarui!" });
      setEditingEndpoint(null);
      resetEndpointForm();
    },
  });

  // Delete endpoint mutation
  const deleteEndpointMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('api_endpoints')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api_endpoints"] });
      toast({ title: "API Endpoint berhasil dihapus!" });
    },
  });

  // Create configuration mutation
  const createConfigMutation = useMutation({
    mutationFn: async (data: Omit<ApiConfiguration, 'id' | 'createdAt' | 'updatedAt'>) => {
      const { data: result, error } = await supabase
        .from('api_configurations')
        .insert([{
          ...data,
          value: typeof data.value === 'string' ? 
            (() => { try { return JSON.parse(data.value); } catch { return data.value; } })() : 
            data.value
        }])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api_configurations"] });
      toast({ title: "Konfigurasi API berhasil dibuat!" });
      setIsCreateConfigOpen(false);
      resetConfigForm();
    },
  });

  // Update configuration mutation
  const updateConfigMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ApiConfiguration> }) => {
      const { data: result, error } = await supabase
        .from('api_configurations')
        .update({
          ...data,
          value: typeof data.value === 'string' ? 
            (() => { try { return JSON.parse(data.value); } catch { return data.value; } })() : 
            data.value,
          updatedAt: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api_configurations"] });
      toast({ title: "Konfigurasi API berhasil diperbarui!" });
      setEditingConfig(null);
      resetConfigForm();
    },
  });

  // Delete configuration mutation
  const deleteConfigMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('api_configurations')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api_configurations"] });
      toast({ title: "Konfigurasi API berhasil dihapus!" });
    },
  });

  // Test endpoint function
  const testEndpoint = async (endpoint: ApiEndpoint) => {
    setTestingEndpoint(endpoint.id);
    try {
      const headers: Record<string, string> = { ...endpoint.headers };
      if (endpoint.requiresAuth && endpoint.apiKey) {
        headers['Authorization'] = `Bearer ${endpoint.apiKey}`;
      }

      const response = await fetch(endpoint.url, {
        method: endpoint.method,
        headers,
        signal: AbortSignal.timeout(endpoint.timeout || 30000)
      });

      const result = {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: await response.text()
      };

      setTestResult(result);
      toast({ 
        title: response.ok ? "Test berhasil!" : "Test gagal!",
        description: `Status: ${response.status} ${response.statusText}`,
        variant: response.ok ? "default" : "destructive"
      });
    } catch (error) {
      const errorResult = {
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      };
      setTestResult(errorResult);
      toast({ 
        title: "Test gagal!",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    } finally {
      setTestingEndpoint(null);
    }
  };

  // Helper functions
  const resetEndpointForm = () => {
    setEndpointForm({
      name: "",
      url: "",
      method: "GET",
      headers: "{}",
      description: "",
      category: "",
      isActive: true,
      requiresAuth: false,
      apiKey: "",
      rateLimit: 100,
      timeout: 30000,
      retryAttempts: 3
    });
  };

  const resetConfigForm = () => {
    setConfigForm({
      key: "",
      value: "",
      description: "",
      category: "other",
      isSecret: false,
      isActive: true,
      environment: "production"
    });
  };

  const handleEditEndpoint = (endpoint: ApiEndpoint) => {
    setEditingEndpoint(endpoint);
    setEndpointForm({
      name: endpoint.name,
      url: endpoint.url,
      method: endpoint.method,
      headers: JSON.stringify(endpoint.headers, null, 2),
      description: endpoint.description,
      category: endpoint.category,
      isActive: endpoint.isActive,
      requiresAuth: endpoint.requiresAuth,
      apiKey: endpoint.apiKey || "",
      rateLimit: endpoint.rateLimit || 100,
      timeout: endpoint.timeout || 30000,
      retryAttempts: endpoint.retryAttempts || 3
    });
    setIsCreateEndpointOpen(true);
  };

  const handleEditConfig = (config: ApiConfiguration) => {
    setEditingConfig(config);
    setConfigForm({
      key: config.key,
      value: typeof config.value === 'object' ? JSON.stringify(config.value, null, 2) : String(config.value),
      description: config.description,
      category: config.category,
      isSecret: config.isSecret,
      isActive: config.isActive,
      environment: config.environment
    });
    setIsCreateConfigOpen(true);
  };

  const handleSubmitEndpoint = () => {
    try {
      const data = {
        ...endpointForm,
        headers: JSON.parse(endpointForm.headers)
      };

      if (editingEndpoint) {
        updateEndpointMutation.mutate({ id: editingEndpoint.id, data });
      } else {
        createEndpointMutation.mutate(data);
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Format headers tidak valid. Gunakan format JSON yang benar.",
        variant: "destructive"
      });
    }
  };

  const handleSubmitConfig = () => {
    const data = {
      ...configForm
    };

    if (editingConfig) {
      updateConfigMutation.mutate({ id: editingConfig.id, data });
    } else {
      createConfigMutation.mutate(data);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Disalin ke clipboard!" });
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ai': return <Zap className="w-4 h-4" />;
      case 'payment': return <Database className="w-4 h-4" />;
      case 'storage': return <Cloud className="w-4 h-4" />;
      case 'notification': return <Activity className="w-4 h-4" />;
      case 'analytics': return <Activity className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ai': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'payment': return 'bg-green-100 text-green-700 border-green-200';
      case 'storage': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'notification': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'analytics': return 'bg-pink-100 text-pink-700 border-pink-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manajemen API</h2>
          <p className="text-gray-600">Kelola endpoint API dan konfigurasi sistem</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowSecrets(!showSecrets)}
            className="gap-2"
          >
            {showSecrets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showSecrets ? "Sembunyikan" : "Tampilkan"} Secrets
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="endpoints" className="gap-2">
            <Globe className="w-4 h-4" />
            Endpoints
          </TabsTrigger>
          <TabsTrigger value="configurations" className="gap-2">
            <Settings className="w-4 h-4" />
            Config
          </TabsTrigger>
          <TabsTrigger value="status" className="gap-2">
            <Activity className="w-4 h-4" />
            Status
          </TabsTrigger>
          <TabsTrigger value="demo" className="gap-2">
            <TestTube className="w-4 h-4" />
            Demo
          </TabsTrigger>
        </TabsList>

        {/* API Endpoints Tab */}
        <TabsContent value="endpoints" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">API Endpoints</h3>
            <Dialog open={isCreateEndpointOpen} onOpenChange={setIsCreateEndpointOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-primary-600 hover:bg-primary-700 text-white">
                  <Plus className="w-4 h-4" />
                  Tambah Endpoint
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingEndpoint ? "Edit API Endpoint" : "Tambah API Endpoint Baru"}
                  </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="endpoint-name">Nama Endpoint</Label>
                      <Input
                        id="endpoint-name"
                        value={endpointForm.name}
                        onChange={(e) => setEndpointForm({ ...endpointForm, name: e.target.value })}
                        placeholder="OpenAI Chat Completion"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endpoint-url">URL</Label>
                      <Input
                        id="endpoint-url"
                        value={endpointForm.url}
                        onChange={(e) => setEndpointForm({ ...endpointForm, url: e.target.value })}
                        placeholder="https://api.openai.com/v1/chat/completions"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="endpoint-method">Method</Label>
                        <Select 
                          value={endpointForm.method} 
                          onValueChange={(value: any) => setEndpointForm({ ...endpointForm, method: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                            <SelectItem value="PATCH">PATCH</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endpoint-category">Kategori</Label>
                        <Input
                          id="endpoint-category"
                          value={endpointForm.category}
                          onChange={(e) => setEndpointForm({ ...endpointForm, category: e.target.value })}
                          placeholder="AI, Payment, Storage"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endpoint-description">Deskripsi</Label>
                      <Textarea
                        id="endpoint-description"
                        value={endpointForm.description}
                        onChange={(e) => setEndpointForm({ ...endpointForm, description: e.target.value })}
                        placeholder="Deskripsi fungsi endpoint ini"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="endpoint-headers">Headers (JSON)</Label>
                      <Textarea
                        id="endpoint-headers"
                        value={endpointForm.headers}
                        onChange={(e) => setEndpointForm({ ...endpointForm, headers: e.target.value })}
                        placeholder='{"Content-Type": "application/json"}'
                        rows={4}
                        className="font-mono text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endpoint-apikey">API Key (opsional)</Label>
                      <Input
                        id="endpoint-apikey"
                        type={showSecrets ? "text" : "password"}
                        value={endpointForm.apiKey}
                        onChange={(e) => setEndpointForm({ ...endpointForm, apiKey: e.target.value })}
                        placeholder="sk-..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="endpoint-timeout">Timeout (ms)</Label>
                        <Input
                          id="endpoint-timeout"
                          type="number"
                          value={endpointForm.timeout}
                          onChange={(e) => setEndpointForm({ ...endpointForm, timeout: parseInt(e.target.value) })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endpoint-retry">Retry Attempts</Label>
                        <Input
                          id="endpoint-retry"
                          type="number"
                          value={endpointForm.retryAttempts}
                          onChange={(e) => setEndpointForm({ ...endpointForm, retryAttempts: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="endpoint-active"
                          checked={endpointForm.isActive}
                          onCheckedChange={(checked) => setEndpointForm({ ...endpointForm, isActive: checked })}
                        />
                        <Label htmlFor="endpoint-active">Aktif</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="endpoint-auth"
                          checked={endpointForm.requiresAuth}
                          onCheckedChange={(checked) => setEndpointForm({ ...endpointForm, requiresAuth: checked })}
                        />
                        <Label htmlFor="endpoint-auth">Memerlukan Autentikasi</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSubmitEndpoint} className="bg-primary-600 hover:bg-primary-700 text-white">
                    {editingEndpoint ? "Perbarui" : "Simpan"} Endpoint
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreateEndpointOpen(false);
                      setEditingEndpoint(null);
                      resetEndpointForm();
                    }}
                  >
                    Batal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {endpointsLoading ? (
            <div className="text-center py-8">Memuat endpoints...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {endpoints?.map((endpoint) => (
                <Card key={endpoint.id} className="p-6 hover:shadow-lg transition-all">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-lg">{endpoint.name}</h4>
                          <Badge className={getCategoryColor(endpoint.category)}>
                            {getCategoryIcon(endpoint.category)}
                            {endpoint.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{endpoint.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {endpoint.isActive ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono">
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded flex-1 truncate">
                          {endpoint.url}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(endpoint.url)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      {endpoint.requiresAuth && (
                        <div className="flex items-center gap-2 text-sm text-amber-600">
                          <Shield className="w-4 h-4" />
                          Memerlukan autentikasi
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => testEndpoint(endpoint)}
                        disabled={testingEndpoint === endpoint.id}
                        className="gap-2"
                      >
                        {testingEndpoint === endpoint.id ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <TestTube className="w-4 h-4" />
                        )}
                        Test
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditEndpoint(endpoint)}
                        className="gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Endpoint</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus endpoint "{endpoint.name}"? 
                              Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteEndpointMutation.mutate(endpoint.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Test Result Modal */}
          {testResult && (
            <Dialog open={!!testResult} onOpenChange={() => setTestResult(null)}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Hasil Test API</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        {/* API Configurations Tab */}
        <TabsContent value="configurations" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Konfigurasi API</h3>
            <Dialog open={isCreateConfigOpen} onOpenChange={setIsCreateConfigOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-primary-600 hover:bg-primary-700 text-white">
                  <Plus className="w-4 h-4" />
                  Tambah Konfigurasi
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingConfig ? "Edit Konfigurasi" : "Tambah Konfigurasi Baru"}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="config-key">Key</Label>
                      <Input
                        id="config-key"
                        value={configForm.key}
                        onChange={(e) => setConfigForm({ ...configForm, key: e.target.value })}
                        placeholder="openai_api_key"
                        disabled={!!editingConfig}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="config-category">Kategori</Label>
                      <Select 
                        value={configForm.category} 
                        onValueChange={(value: any) => setConfigForm({ ...configForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ai">AI</SelectItem>
                          <SelectItem value="payment">Payment</SelectItem>
                          <SelectItem value="storage">Storage</SelectItem>
                          <SelectItem value="notification">Notification</SelectItem>
                          <SelectItem value="analytics">Analytics</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="config-value">Value</Label>
                    <Textarea
                      id="config-value"
                      value={configForm.value}
                      onChange={(e) => setConfigForm({ ...configForm, value: e.target.value })}
                      placeholder={configForm.isSecret ? "sk-..." : '{"key": "value"}'}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="config-description">Deskripsi</Label>
                    <Textarea
                      id="config-description"
                      value={configForm.description}
                      onChange={(e) => setConfigForm({ ...configForm, description: e.target.value })}
                      placeholder="Deskripsi konfigurasi ini"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="config-environment">Environment</Label>
                      <Select 
                        value={configForm.environment} 
                        onValueChange={(value: any) => setConfigForm({ ...configForm, environment: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="staging">Staging</SelectItem>
                          <SelectItem value="production">Production</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4 pt-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="config-secret"
                          checked={configForm.isSecret}
                          onCheckedChange={(checked) => setConfigForm({ ...configForm, isSecret: checked })}
                        />
                        <Label htmlFor="config-secret">Secret</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="config-active"
                          checked={configForm.isActive}
                          onCheckedChange={(checked) => setConfigForm({ ...configForm, isActive: checked })}
                        />
                        <Label htmlFor="config-active">Aktif</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSubmitConfig} className="bg-primary-600 hover:bg-primary-700 text-white">
                    {editingConfig ? "Perbarui" : "Simpan"} Konfigurasi
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreateConfigOpen(false);
                      setEditingConfig(null);
                      resetConfigForm();
                    }}
                  >
                    Batal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {configurationsLoading ? (
            <div className="text-center py-8">Memuat konfigurasi...</div>
          ) : (
            <div className="space-y-4">
              {['ai', 'payment', 'storage', 'notification', 'analytics', 'other'].map((category) => {
                const categoryConfigs = configurations?.filter(config => config.category === category);
                if (!categoryConfigs?.length) return null;

                return (
                  <Card key={category} className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        {getCategoryIcon(category)}
                        <h4 className="font-semibold text-lg capitalize">{category}</h4>
                        <Badge variant="outline">{categoryConfigs.length}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categoryConfigs.map((config) => (
                          <div key={config.id} className="p-4 border rounded-lg space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                    {config.key}
                                  </code>
                                  {config.isSecret && <Key className="w-4 h-4 text-amber-500" />}
                                  {config.isActive ? (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-500" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">{config.description}</p>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditConfig(config)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="text-red-600">
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Hapus Konfigurasi</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Apakah Anda yakin ingin menghapus konfigurasi "{config.key}"?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Batal</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => deleteConfigMutation.mutate(config.id)}
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Hapus
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>

                            <div className="text-sm">
                              <Badge variant="outline" className="text-xs">
                                {config.environment}
                              </Badge>
                            </div>

                            {!config.isSecret || showSecrets ? (
                              <div className="text-sm font-mono bg-gray-50 p-2 rounded border">
                                {typeof config.value === 'object' 
                                  ? JSON.stringify(config.value, null, 2)
                                  : String(config.value)
                                }
                              </div>
                            ) : (
                              <div className="text-sm text-gray-500 italic">
                                ••••••••••••••••
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* API Status Tab */}
        <TabsContent value="status" className="space-y-6">
          <ApiStatus />
        </TabsContent>

        {/* API Demo Tab */}
        <TabsContent value="demo" className="space-y-6">
          <ApiUsageDemo />
        </TabsContent>
      </Tabs>
    </div>
  );
}