import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Zap, 
  Send, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  Code,
  Eye,
  EyeOff
} from 'lucide-react';
import { useApiConfig, useAIConfig } from '@/hooks/use-api-config';
import { useToast } from '@/hooks/use-toast';

export default function ApiUsageDemo() {
  const { makeApiCall, endpoints } = useApiConfig();
  const { openaiKey, anthropicKey, geminiKey } = useAIConfig();
  const { toast } = useToast();
  
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [inputMessage, setInputMessage] = useState('Halo, bagaimana cara kerja API ini?');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const aiEndpoints = endpoints.filter(e => e.category === 'ai' && e.isActive);

  const handleApiCall = async () => {
    if (!selectedEndpoint || !inputMessage.trim()) {
      toast({
        title: "Error",
        description: "Pilih endpoint dan masukkan pesan",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setResponse('');

    try {
      let requestData;
      
      // Prepare request data based on endpoint
      if (selectedEndpoint.includes('OpenAI')) {
        requestData = {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: inputMessage }
          ],
          max_tokens: 150,
          temperature: 0.7
        };
      } else if (selectedEndpoint.includes('Claude')) {
        requestData = {
          model: 'claude-3-sonnet-20240229',
          max_tokens: 150,
          messages: [
            { role: 'user', content: inputMessage }
          ]
        };
      } else if (selectedEndpoint.includes('Gemini')) {
        requestData = {
          contents: [
            {
              parts: [
                { text: inputMessage }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 150,
            temperature: 0.7
          }
        };
      }

      const result = await makeApiCall(selectedEndpoint, requestData);
      
      // Parse response based on endpoint
      let responseText = '';
      if (selectedEndpoint.includes('OpenAI')) {
        responseText = result.choices?.[0]?.message?.content || 'No response';
      } else if (selectedEndpoint.includes('Claude')) {
        responseText = result.content?.[0]?.text || 'No response';
      } else if (selectedEndpoint.includes('Gemini')) {
        responseText = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      } else {
        responseText = JSON.stringify(result, null, 2);
      }

      setResponse(responseText);
      setShowResponse(true);
      
      toast({
        title: "Berhasil!",
        description: "API call berhasil dieksekusi"
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResponse(`Error: ${errorMessage}`);
      setShowResponse(true);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getApiKeyStatus = (endpointName: string) => {
    if (endpointName.includes('OpenAI')) {
      return openaiKey ? 'configured' : 'missing';
    } else if (endpointName.includes('Claude')) {
      return anthropicKey ? 'configured' : 'missing';
    } else if (endpointName.includes('Gemini')) {
      return geminiKey ? 'configured' : 'missing';
    }
    return 'unknown';
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-semibold">Demo Penggunaan API</h3>
          </div>
          <p className="text-gray-600">
            Contoh penggunaan sistem manajemen API untuk integrasi dengan layanan AI
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Input</h4>
            
            <div className="space-y-2">
              <Label htmlFor="endpoint-select">Pilih AI Endpoint</Label>
              <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih endpoint AI..." />
                </SelectTrigger>
                <SelectContent>
                  {aiEndpoints.map((endpoint) => (
                    <SelectItem key={endpoint.id} value={endpoint.name}>
                      <div className="flex items-center gap-2">
                        <span>{endpoint.name}</span>
                        {getApiKeyStatus(endpoint.name) === 'configured' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedEndpoint && (
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">
                    {getApiKeyStatus(selectedEndpoint) === 'configured' ? 'API Key OK' : 'API Key Missing'}
                  </Badge>
                  {getApiKeyStatus(selectedEndpoint) === 'missing' && (
                    <span className="text-red-600 text-xs">
                      Konfigurasi API key di tab Settings
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message-input">Pesan</Label>
              <Textarea
                id="message-input"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Masukkan pesan untuk AI..."
                rows={4}
              />
            </div>

            <Button
              onClick={handleApiCall}
              disabled={isLoading || !selectedEndpoint || getApiKeyStatus(selectedEndpoint) === 'missing'}
              className="w-full gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Kirim ke AI
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Response Section */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Response</h4>
              {response && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowResponse(!showResponse)}
                  className="gap-2"
                >
                  {showResponse ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showResponse ? 'Sembunyikan' : 'Tampilkan'}
                </Button>
              )}
            </div>

            {!response && !isLoading && (
              <div className="text-center py-8 text-gray-500">
                <Code className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Response akan muncul di sini</p>
              </div>
            )}

            {isLoading && (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin text-blue-600" />
                <p className="text-gray-600">Menunggu response dari API...</p>
              </div>
            )}

            {response && showResponse && (
              <div className="space-y-2">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <pre className="text-sm whitespace-pre-wrap font-mono">
                    {response}
                  </pre>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(response)}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setResponse('')}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* API Status Overview */}
      <Card className="p-6">
        <div className="space-y-4">
          <h4 className="font-semibold">Status API Keys</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">OpenAI</span>
              {openaiKey ? (
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Configured
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-700">
                  <XCircle className="w-3 h-3 mr-1" />
                  Missing
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Anthropic</span>
              {anthropicKey ? (
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Configured
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-700">
                  <XCircle className="w-3 h-3 mr-1" />
                  Missing
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Gemini</span>
              {geminiKey ? (
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Configured
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-700">
                  <XCircle className="w-3 h-3 mr-1" />
                  Missing
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}