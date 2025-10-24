-- Create API Endpoints table
CREATE TABLE IF NOT EXISTS api_endpoints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    method VARCHAR(10) NOT NULL DEFAULT 'GET',
    headers JSONB DEFAULT '{}',
    description TEXT,
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    requires_auth BOOLEAN DEFAULT false,
    api_key TEXT,
    rate_limit INTEGER DEFAULT 100,
    timeout INTEGER DEFAULT 30000,
    retry_attempts INTEGER DEFAULT 3,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create API Configurations table
CREATE TABLE IF NOT EXISTS api_configurations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB,
    description TEXT,
    category VARCHAR(50) DEFAULT 'other',
    is_secret BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    environment VARCHAR(20) DEFAULT 'production',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_api_endpoints_category ON api_endpoints(category);
CREATE INDEX IF NOT EXISTS idx_api_endpoints_active ON api_endpoints(is_active);
CREATE INDEX IF NOT EXISTS idx_api_configurations_category ON api_configurations(category);
CREATE INDEX IF NOT EXISTS idx_api_configurations_environment ON api_configurations(environment);
CREATE INDEX IF NOT EXISTS idx_api_configurations_key ON api_configurations(key);

-- Insert some default API configurations
INSERT INTO api_configurations (key, value, description, category, is_secret, environment) VALUES
('openai_api_key', '""', 'OpenAI API Key untuk integrasi ChatGPT dan GPT models', 'ai', true, 'production'),
('anthropic_api_key', '""', 'Anthropic Claude API Key untuk integrasi Claude AI', 'ai', true, 'production'),
('gemini_api_key', '""', 'Google Gemini API Key untuk integrasi Gemini AI', 'ai', true, 'production'),
('stripe_public_key', '""', 'Stripe Public Key untuk payment processing', 'payment', false, 'production'),
('stripe_secret_key', '""', 'Stripe Secret Key untuk payment processing', 'payment', true, 'production'),
('supabase_url', '"https://your-project.supabase.co"', 'Supabase Project URL', 'storage', false, 'production'),
('supabase_anon_key', '""', 'Supabase Anonymous Key', 'storage', true, 'production'),
('email_service_key', '""', 'Email service API key untuk notifikasi', 'notification', true, 'production'),
('google_analytics_id', '""', 'Google Analytics Tracking ID', 'analytics', false, 'production'),
('app_name', '"Portfolio Web"', 'Nama aplikasi', 'other', false, 'production'),
('app_version', '"1.0.0"', 'Versi aplikasi saat ini', 'other', false, 'production'),
('maintenance_mode', 'false', 'Mode maintenance aplikasi', 'other', false, 'production')
ON CONFLICT (key) DO NOTHING;

-- Insert some default API endpoints
INSERT INTO api_endpoints (name, url, method, headers, description, category, requires_auth) VALUES
('OpenAI Chat Completion', 'https://api.openai.com/v1/chat/completions', 'POST', '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_API_KEY"}', 'Endpoint untuk chat completion menggunakan OpenAI GPT models', 'ai', true),
('OpenAI Image Generation', 'https://api.openai.com/v1/images/generations', 'POST', '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_API_KEY"}', 'Endpoint untuk generate gambar menggunakan DALL-E', 'ai', true),
('Anthropic Claude Messages', 'https://api.anthropic.com/v1/messages', 'POST', '{"Content-Type": "application/json", "x-api-key": "YOUR_API_KEY", "anthropic-version": "2023-06-01"}', 'Endpoint untuk chat dengan Claude AI', 'ai', true),
('Google Gemini Generate', 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', 'POST', '{"Content-Type": "application/json"}', 'Endpoint untuk generate content dengan Gemini Pro', 'ai', true),
('Stripe Create Payment Intent', 'https://api.stripe.com/v1/payment_intents', 'POST', '{"Content-Type": "application/x-www-form-urlencoded", "Authorization": "Bearer YOUR_SECRET_KEY"}', 'Endpoint untuk membuat payment intent di Stripe', 'payment', true),
('SendGrid Send Email', 'https://api.sendgrid.com/v3/mail/send', 'POST', '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_API_KEY"}', 'Endpoint untuk mengirim email via SendGrid', 'notification', true),
('Supabase Storage Upload', 'https://your-project.supabase.co/storage/v1/object/bucket-name', 'POST', '{"Authorization": "Bearer YOUR_TOKEN"}', 'Endpoint untuk upload file ke Supabase Storage', 'storage', true),
('Google Analytics Reporting', 'https://analyticsreporting.googleapis.com/v4/reports:batchGet', 'POST', '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ACCESS_TOKEN"}', 'Endpoint untuk mengambil data analytics dari Google Analytics', 'analytics', true)
ON CONFLICT DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_api_endpoints_updated_at 
    BEFORE UPDATE ON api_endpoints 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_api_configurations_updated_at 
    BEFORE UPDATE ON api_configurations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add RLS (Row Level Security) policies if needed
ALTER TABLE api_endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_configurations ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (adjust as needed)
CREATE POLICY "Allow authenticated users to manage api_endpoints" ON api_endpoints
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage api_configurations" ON api_configurations
    FOR ALL USING (auth.role() = 'authenticated');

-- Grant permissions to authenticated users
GRANT ALL ON api_endpoints TO authenticated;
GRANT ALL ON api_configurations TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;