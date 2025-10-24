-- Add UI/UX category and sample projects
INSERT INTO categories (name, description, color) VALUES
('UI/UX', 'User Interface and User Experience Design', '#FF6B6B')
ON CONFLICT (name) DO NOTHING;

-- Add sample UI/UX projects
INSERT INTO projects (
  title, 
  description, 
  full_description,
  category, 
  image, 
  tech_stack, 
  demo_url, 
  github_url,
  features,
  challenges,
  results,
  featured,
  status
) VALUES 
(
  'Mobile Banking App UI/UX',
  'Complete UI/UX design for a modern mobile banking application with focus on security and user experience',
  'Designed a comprehensive mobile banking application interface that prioritizes user security while maintaining an intuitive and modern user experience. The design includes biometric authentication, transaction history, budget tracking, and investment portfolio management.

Key Design Principles:
- Security-first approach with clear visual indicators
- Minimalist design to reduce cognitive load
- Accessibility compliance for all users
- Consistent design system across all screens

The project involved extensive user research, persona development, wireframing, prototyping, and usability testing to ensure the final design meets both user needs and business requirements.',
  'UI/UX',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
  ARRAY['Figma', 'Adobe XD', 'Principle', 'InVision', 'Sketch'],
  'https://www.figma.com/proto/banking-app-demo',
  'https://github.com/example/banking-ui-design',
  ARRAY[
    'Biometric authentication flow',
    'Transaction history with smart categorization',
    'Budget tracking and spending insights',
    'Investment portfolio dashboard',
    'Quick transfer and payment options',
    'Dark mode support',
    'Accessibility features for visually impaired users',
    'Multi-language support'
  ],
  'The main challenge was balancing security requirements with user-friendly design. Banking apps need multiple security layers, but too many steps can frustrate users. We solved this by implementing smart authentication that adapts based on transaction risk levels and user behavior patterns.

Another challenge was designing for diverse user demographics, from tech-savvy millennials to older users who prefer simpler interfaces. We created a progressive disclosure system that shows advanced features only when needed.',
  'The design received excellent feedback during user testing, with 95% task completion rate and 4.8/5 user satisfaction score. The client reported 40% increase in user engagement and 25% reduction in support tickets after implementing the new design.

The design system we created is now being used across all the bank''s digital products, ensuring consistency and reducing development time for new features.',
  1,
  'active'
),
(
  'E-commerce Dashboard Design',
  'Modern dashboard design for e-commerce platform with advanced analytics and inventory management',
  'Created a comprehensive dashboard design for an e-commerce platform that helps store owners manage their business efficiently. The design focuses on data visualization, inventory management, and sales analytics.

Design Features:
- Real-time sales analytics with interactive charts
- Inventory management with low-stock alerts
- Customer behavior insights and segmentation
- Order management and fulfillment tracking
- Revenue forecasting and trend analysis
- Mobile-responsive design for on-the-go management

The design process included stakeholder interviews, competitive analysis, user journey mapping, and iterative prototyping based on user feedback.',
  'UI/UX',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  ARRAY['Figma', 'Adobe Illustrator', 'Principle', 'Zeplin', 'Miro'],
  'https://www.figma.com/proto/ecommerce-dashboard',
  'https://github.com/example/ecommerce-dashboard-ui',
  ARRAY[
    'Real-time analytics dashboard',
    'Inventory management system',
    'Customer segmentation tools',
    'Order tracking and management',
    'Revenue forecasting charts',
    'Mobile-responsive design',
    'Dark/light theme toggle',
    'Customizable widget layout'
  ],
  'The biggest challenge was presenting complex data in a digestible format without overwhelming users. E-commerce owners need to monitor multiple metrics simultaneously, but too much information can lead to analysis paralysis.

We solved this by creating a hierarchical information architecture with progressive disclosure, allowing users to drill down into specific metrics when needed. We also implemented smart defaults and personalized dashboards based on user roles.',
  'The dashboard design improved user task completion by 60% and reduced the time needed to find key information by 45%. Store owners reported better decision-making capabilities and increased confidence in managing their online business.

The design has been implemented by over 500 e-commerce stores and continues to receive positive feedback for its clarity and functionality.',
  1,
  'active'
),
(
  'Healthcare App UI Design',
  'Patient-centered mobile app design for healthcare management and telemedicine',
  'Designed a comprehensive healthcare mobile application that connects patients with healthcare providers through telemedicine features, appointment scheduling, and health record management.

Key Design Goals:
- Reduce anxiety through calming visual design
- Ensure accessibility for users with disabilities
- Simplify complex medical information
- Build trust through professional and clean interface
- Support emergency use cases with quick access features

The design process involved extensive research with healthcare professionals and patients to understand pain points in current healthcare systems.',
  'UI/UX',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
  ARRAY['Figma', 'Adobe XD', 'Principle', 'Maze', 'Optimal Workshop'],
  'https://www.figma.com/proto/healthcare-app',
  'https://github.com/example/healthcare-ui',
  ARRAY[
    'Telemedicine video consultation',
    'Appointment scheduling system',
    'Digital health records',
    'Medication reminders',
    'Symptom checker and health tips',
    'Emergency contact features',
    'Insurance and billing management',
    'Multi-language support'
  ],
  'Healthcare UI design requires extreme attention to accessibility and clarity, as users may be in stressful situations or have varying levels of digital literacy. We had to ensure the app works for elderly users, people with visual impairments, and those experiencing medical emergencies.

Another challenge was complying with healthcare regulations (HIPAA) while maintaining a user-friendly experience. We worked closely with legal and security teams to ensure all design decisions met compliance requirements.',
  'User testing showed 92% success rate for critical tasks like booking appointments and accessing medical records. Healthcare providers reported 30% reduction in administrative overhead and improved patient satisfaction scores.

The design has been recognized by healthcare design awards and is currently being used by over 10,000 patients across multiple healthcare networks.',
  0,
  'active'
),
(
  'SaaS Platform Redesign',
  'Complete redesign of a B2B SaaS platform focusing on user onboarding and feature discovery',
  'Led the complete redesign of a complex B2B SaaS platform used by project management teams. The original platform had poor user adoption and high churn rates due to confusing navigation and overwhelming feature set.

Redesign Objectives:
- Improve user onboarding experience
- Simplify navigation and information architecture
- Enhance feature discoverability
- Create a scalable design system
- Reduce cognitive load for new users

The project involved comprehensive user research, including interviews with existing customers, analysis of user behavior data, and competitive benchmarking.',
  'UI/UX',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  ARRAY['Figma', 'Sketch', 'InVision', 'Hotjar', 'Mixpanel'],
  'https://www.figma.com/proto/saas-redesign',
  'https://github.com/example/saas-ui-redesign',
  ARRAY[
    'Guided onboarding flow',
    'Progressive feature introduction',
    'Contextual help and tooltips',
    'Customizable dashboard',
    'Advanced search and filtering',
    'Collaboration tools integration',
    'Mobile companion app',
    'Comprehensive design system'
  ],
  'The main challenge was redesigning a feature-rich platform without removing functionality that power users relied on. We had to balance simplicity for new users with advanced capabilities for experienced users.

We solved this through progressive disclosure and role-based interfaces. New users see a simplified version with guided tours, while experienced users can access advanced features through customizable interfaces.',
  'The redesign resulted in 75% improvement in user onboarding completion rates and 50% reduction in customer churn. Time-to-value for new users decreased from 2 weeks to 3 days.

Customer satisfaction scores increased from 3.2/5 to 4.6/5, and the platform now serves as a case study for successful SaaS redesigns in the industry.',
  1,
  'active'
);

-- Update existing projects to include UI/UX elements where appropriate
UPDATE projects 
SET category = 'UI/UX' 
WHERE title ILIKE '%design%' OR title ILIKE '%ui%' OR title ILIKE '%ux%' OR description ILIKE '%design%';

-- Add some sample categories if they don't exist
INSERT INTO categories (name, description, color) VALUES
('Web Development', 'Full-stack web applications and websites', '#3B82F6'),
('Mobile Development', 'iOS and Android mobile applications', '#10B981'),
('AI/ML', 'Artificial Intelligence and Machine Learning projects', '#8B5CF6'),
('Data Science', 'Data analysis and visualization projects', '#F59E0B'),
('DevOps', 'Infrastructure and deployment automation', '#EF4444'),
('Blockchain', 'Cryptocurrency and blockchain applications', '#06B6D4')
ON CONFLICT (name) DO NOTHING;