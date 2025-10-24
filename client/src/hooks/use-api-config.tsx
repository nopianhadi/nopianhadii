import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

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

interface ApiConfigContextType {
  configurations: ApiConfiguration[];
  endpoints: ApiEndpoint[];
  getConfig: (key: string) => any;
  getEndpoint: (name: string) => ApiEndpoint | undefined;
  makeApiCall: (endpointName: string, data?: any, options?: RequestInit) => Promise<any>;
  isLoading: boolean;
  error: Error | null;
}

const ApiConfigContext = createContext<ApiConfigContextType | undefined>(undefined);

export function ApiConfigProvider({ children }: { children: ReactNode }) {
  const [configurations, setConfigurations] = useState<ApiConfiguration[]>([]);
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);

  // Fetch configurations
  const { data: configData, isLoading: configLoading, error: configError } = useQuery<ApiConfiguration[]>({
    queryKey: ['api_configurations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('api_configurations')
        .select('*')
        .eq('is_active', true)
        .order('category');

      if (error) throw new Error(error.message);
      return data || [];
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  // Fetch endpoints
  const { data: endpointData, isLoading: endpointLoading, error: endpointError } = useQuery<ApiEndpoint[]>({
    queryKey: ['api_endpoints'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('api_endpoints')
        .select('*')
        .eq('is_active', true)
        .order('category');

      if (error) throw new Error(error.message);
      return data || [];
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  useEffect(() => {
    if (configData) {
      setConfigurations(configData);
    }
  }, [configData]);

  useEffect(() => {
    if (endpointData) {
      setEndpoints(endpointData);
    }
  }, [endpointData]);

  const getConfig = (key: string): any => {
    const config = configurations.find(c => c.key === key && c.isActive);
    return config?.value;
  };

  const getEndpoint = (name: string): ApiEndpoint | undefined => {
    return endpoints.find(e => e.name === name && e.isActive);
  };

  const makeApiCall = async (endpointName: string, data?: any, options?: RequestInit): Promise<any> => {
    const endpoint = getEndpoint(endpointName);
    if (!endpoint) {
      throw new Error(`Endpoint '${endpointName}' tidak ditemukan atau tidak aktif`);
    }

    // Prepare headers
    const headers: Record<string, string> = { ...endpoint.headers };
    
    // Add API key if required
    if (endpoint.requiresAuth && endpoint.apiKey) {
      // Replace placeholder with actual API key from configurations
      const apiKeyConfig = configurations.find(c => c.key.includes('api_key') && c.category === endpoint.category);
      if (apiKeyConfig) {
        // Replace placeholder in headers
        Object.keys(headers).forEach(key => {
          if (headers[key].includes('YOUR_API_KEY')) {
            headers[key] = headers[key].replace('YOUR_API_KEY', apiKeyConfig.value);
          }
        });
      }
    }

    // Prepare request options
    const requestOptions: RequestInit = {
      method: endpoint.method,
      headers: {
        ...headers,
        ...options?.headers,
      },
      signal: AbortSignal.timeout(endpoint.timeout || 30000),
      ...options,
    };

    // Add body for POST/PUT/PATCH requests
    if (data && ['POST', 'PUT', 'PATCH'].includes(endpoint.method)) {
      if (headers['Content-Type']?.includes('application/json')) {
        requestOptions.body = JSON.stringify(data);
      } else if (headers['Content-Type']?.includes('application/x-www-form-urlencoded')) {
        requestOptions.body = new URLSearchParams(data).toString();
      } else {
        requestOptions.body = data;
      }
    }

    // Make the API call with retry logic
    let lastError: Error;
    const maxRetries = endpoint.retryAttempts || 3;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(endpoint.url, requestOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Try to parse as JSON, fallback to text
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          return await response.json();
        } else {
          return await response.text();
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        // Don't retry on the last attempt
        if (attempt === maxRetries) {
          break;
        }

        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    throw lastError!;
  };

  const contextValue: ApiConfigContextType = {
    configurations,
    endpoints,
    getConfig,
    getEndpoint,
    makeApiCall,
    isLoading: configLoading || endpointLoading,
    error: configError || endpointError || null,
  };

  return (
    <ApiConfigContext.Provider value={contextValue}>
      {children}
    </ApiConfigContext.Provider>
  );
}

export function useApiConfig() {
  const context = useContext(ApiConfigContext);
  if (context === undefined) {
    throw new Error('useApiConfig must be used within an ApiConfigProvider');
  }
  return context;
}

// Utility hooks for specific use cases
export function useAIConfig() {
  const { getConfig } = useApiConfig();
  
  return {
    openaiKey: getConfig('openai_api_key'),
    anthropicKey: getConfig('anthropic_api_key'),
    geminiKey: getConfig('gemini_api_key'),
  };
}

export function usePaymentConfig() {
  const { getConfig } = useApiConfig();
  
  return {
    stripePublicKey: getConfig('stripe_public_key'),
    stripeSecretKey: getConfig('stripe_secret_key'),
  };
}

export function useStorageConfig() {
  const { getConfig } = useApiConfig();
  
  return {
    supabaseUrl: getConfig('supabase_url'),
    supabaseAnonKey: getConfig('supabase_anon_key'),
  };
}

export function useAppConfig() {
  const { getConfig } = useApiConfig();
  
  return {
    appName: getConfig('app_name'),
    appVersion: getConfig('app_version'),
    maintenanceMode: getConfig('maintenance_mode'),
  };
}