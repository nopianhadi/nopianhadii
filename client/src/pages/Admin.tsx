import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Users,
  BarChart3,
  Settings,
  FolderOpen,
  Search,
  Download,
  Upload,
  Eye,
  EyeOff,
  Filter,
  MoreHorizontal,
  TrendingUp,
  Activity,
  Database,
  Star,
  Calendar,
  Code,
  Globe,
  LogOut,
  Quote,
  Building2,
  Key,
  Save,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  insertProjectSchema,
  insertUserSchema,
  insertCategorySchema,
  insertSettingSchema,
  type Project,
  type InsertProject,
  type User,
  type InsertUser,
  type Category,
  type InsertCategory,
  type Setting,
  type InsertSetting,
  type Analytics,
  // Team & Testimonials
  insertTeamMemberSchema,
  insertTestimonialSchema,
  type TeamMember,
  type InsertTeamMember,
  type Testimonial,
  type InsertTestimonial,
  type Partner
} from "@shared/schema";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import PartnerFormDialog from "@/components/PartnerFormDialog";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("projects");
  const { logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSetting, setEditingSetting] = useState<Setting | null>(null);
  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateSettingOpen, setIsCreateSettingOpen] = useState(false);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isCreateTestimonialOpen, setIsCreateTestimonialOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    openai: "",
    anthropic: "",
    gemini: ""
  });
  const [isSavingApiKey, setIsSavingApiKey] = useState(false);

  // Projects Management
  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Settings Mutations
  const createSettingMutation = useMutation({
    mutationFn: async (data: InsertSetting) => {
      const formData = {
        ...data,
        value: typeof data.value === 'string' ? (() => { try { return JSON.parse(data.value as any); } catch { return data.value; } })() : data.value,
      } as InsertSetting;

      const { data: result, error } = await supabase
        .from('settings')
        .insert([formData])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({ title: "Pengaturan berhasil dibuat!" });
      setIsCreateSettingOpen(false);
      setEditingSetting(null);
      settingForm.reset();
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertSetting> }) => {
      const formData = {
        ...data,
        value: typeof data.value === 'string' ? (() => { try { return JSON.parse(data.value as any); } catch { return data.value; } })() : data.value,
      } as Partial<InsertSetting>;

      const { data: result, error } = await supabase
        .from('settings')
        .update(formData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({ title: "Pengaturan berhasil diperbarui!" });
      setEditingSetting(null);
      settingForm.reset();
    },
  });

  const deleteSettingMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('settings')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({ title: "Pengaturan berhasil dihapus!" });
    },
  });

  // Users Management
  const { data: users, isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('username');

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Categories Management
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Settings Management
  const { data: settings, isLoading: settingsLoading } = useQuery<Setting[]>({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('key');

      if (error) throw new Error(error.message);
      
      // Load API keys from settings
      if (data) {
        const openaiKey = data.find(s => s.key === 'openai_api_key');
        const anthropicKey = data.find(s => s.key === 'anthropic_api_key');
        const geminiKey = data.find(s => s.key === 'gemini_api_key');
        
        setApiKeys({
          openai: openaiKey?.value as string || "",
          anthropic: anthropicKey?.value as string || "",
          gemini: geminiKey?.value as string || ""
        });
      }
      
      return data || [];
    },
  });

  // Analytics Data
  const { data: analytics, isLoading: analyticsLoading } = useQuery<Analytics[]>({
    queryKey: ["analytics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Team Members
  const { data: teamMembers, isLoading: teamLoading } = useQuery<TeamMember[]>({
    queryKey: ["team_members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Testimonials
  const { data: testimonials, isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Partners
  const { data: partners, isLoading: partnersLoading } = useQuery<Partner[]>({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('display_order');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Project Form
  const projectForm = useForm<InsertProject>({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      image: "",
      demoUrl: "",
      githubUrl: "",
      downloadUrl: "",
      techStack: [],
      featured: 0,
      status: "active",
    },
  });

  // User Form
  const userForm = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Category Form
  const categoryForm = useForm<InsertCategory>({
    resolver: zodResolver(insertCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3B82F6",
    },
  });

  // Setting Form
  const settingForm = useForm<InsertSetting>({
    resolver: zodResolver(insertSettingSchema),
    defaultValues: {
      key: "",
      value: {},
      description: "",
    },
  });

  // Team Form
  const teamForm = useForm<InsertTeamMember>({
    resolver: zodResolver(insertTeamMemberSchema),
    defaultValues: {
      name: "",
      role: "",
      bio: "",
      image: "",
      expertise: [],
      linkedinUrl: "",
      githubUrl: "",
      email: "",
      displayOrder: 0,
      status: "active",
    },
  });

  // Testimonial Form
  const testimonialForm = useForm<InsertTestimonial>({
    resolver: zodResolver(insertTestimonialSchema),
    defaultValues: {
      name: "",
      role: "",
      company: "",
      image: "",
      rating: 5,
      text: "",
      project: "",
      displayOrder: 0,
      status: "active",
    },
  });

  // Mutations
  const createProjectMutation = useMutation({
    mutationFn: async (data: InsertProject) => {
      const formData = {
        ...data,
        techStack: typeof data.techStack === 'string'
          ? (data.techStack as string).split(',').map(t => t.trim())
          : data.techStack,
      };

      const { data: result, error } = await supabase
        .from('projects')
        .insert([formData])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: "Proyek berhasil dibuat!" });
      setIsCreateOpen(false);
      projectForm.reset();
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertProject> }) => {
      const formData = {
        ...data,
        techStack: typeof data.techStack === 'string'
          ? (data.techStack as string).split(',').map(t => t.trim())
          : data.techStack,
      };

      const { data: result, error } = await supabase
        .from('projects')
        .update(formData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: "Proyek berhasil diperbarui!" });
      setEditingProject(null);
      projectForm.reset();
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: "Proyek berhasil dihapus!" });
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async (data: InsertUser) => {
      const { data: result, error } = await supabase
        .from('users')
        .insert([data])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({ title: "User berhasil dibuat!" });
      userForm.reset();
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({ title: "User berhasil dihapus!" });
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (data: InsertCategory) => {
      const { data: result, error } = await supabase
        .from('categories')
        .insert([data])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Kategori berhasil dibuat!" });
      categoryForm.reset();
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertCategory> }) => {
      const { data: result, error } = await supabase
        .from('categories')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Kategori berhasil diperbarui!" });
      setEditingCategory(null);
      categoryForm.reset();
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Kategori berhasil dihapus!" });
    },
  });

  const bulkUpdateProjectsMutation = useMutation({
    mutationFn: async ({ ids, updates }: { ids: string[]; updates: Partial<InsertProject> }) => {
      const { error } = await supabase
        .from('projects')
        .update(updates)
        .in('id', ids);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: `Berhasil memperbarui ${selectedProjects.length} proyek!` });
      setSelectedProjects([]);
    },
  });

  // Handlers
  const handleProjectSubmit = (data: InsertProject) => {
    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject.id, data });
    } else {
      createProjectMutation.mutate(data);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    projectForm.reset({
      ...project,
      techStack: project.techStack as any,
    });
  };

  const handleUserSubmit = (data: InsertUser) => {
    createUserMutation.mutate(data);
  };

  const handleCategorySubmit = (data: InsertCategory) => {
    if (editingCategory) {
      updateCategoryMutation.mutate({ id: editingCategory.id, data });
    } else {
      createCategoryMutation.mutate(data);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    categoryForm.reset(category);
  };

  const handleSettingSubmit = (data: InsertSetting) => {
    if (editingSetting) {
      updateSettingMutation.mutate({ id: editingSetting.id, data });
    } else {
      createSettingMutation.mutate(data);
    }
  };

  const handleEditSetting = (setting: Setting) => {
    setEditingSetting(setting);
    settingForm.reset({
      key: setting.key,
      value: setting.value ? JSON.stringify(setting.value, null, 2) as any : ("" as any),
      description: setting.description || "",
    } as any);
    setIsCreateSettingOpen(true);
  };

  // Team Handlers
  const handleTeamSubmit = (data: InsertTeamMember) => {
    if (editingTeam) {
      updateTeamMutation.mutate({ id: editingTeam.id, data });
    } else {
      createTeamMutation.mutate(data);
    }
  };

  const handleEditTeam = (member: TeamMember) => {
    setEditingTeam(member);
    teamForm.reset({
      ...member,
      expertise: member.expertise as any,
    });
    setIsCreateTeamOpen(true);
  };

  // Testimonial Handlers
  const handleTestimonialSubmit = (data: InsertTestimonial) => {
    if (editingTestimonial) {
      updateTestimonialMutation.mutate({ id: editingTestimonial.id, data });
    } else {
      createTestimonialMutation.mutate(data);
    }
  };

  const handleEditTestimonial = (item: Testimonial) => {
    setEditingTestimonial(item);
    testimonialForm.reset(item as any);
    setIsCreateTestimonialOpen(true);
  };

  const handleBulkFeature = (featured: number) => {
    if (selectedProjects.length === 0) return;
    bulkUpdateProjectsMutation.mutate({
      ids: selectedProjects,
      updates: { featured }
    });
  };

  const handleBulkDelete = () => {
    if (selectedProjects.length === 0) return;
    if (confirm(`Hapus ${selectedProjects.length} proyek yang dipilih?`)) {
      selectedProjects.forEach(id => deleteProjectMutation.mutate(id));
      setSelectedProjects([]);
    }
  };

  // Filter and search projects
  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Analytics calculations
  const totalProjects = projects?.length || 0;
  const featuredProjects = projects?.filter(p => p.featured === 1).length || 0;
  const totalUsers = users?.length || 0;
  const recentProjects = projects?.filter(p =>
    new Date(p.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length || 0;

  // Logout handler
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setLocation("/");
      }
    });
  };

  // API Key Management
  const handleSaveApiKeys = async () => {
    setIsSavingApiKey(true);
    try {
      const apiKeySettings = [
        { key: 'openai_api_key', value: apiKeys.openai, description: 'OpenAI API Key untuk integrasi AI' },
        { key: 'anthropic_api_key', value: apiKeys.anthropic, description: 'Anthropic Claude API Key' },
        { key: 'gemini_api_key', value: apiKeys.gemini, description: 'Google Gemini API Key' }
      ];

      for (const setting of apiKeySettings) {
        const existing = settings?.find(s => s.key === setting.key);
        
        if (existing) {
          // Update existing
          await supabase
            .from('settings')
            .update({ value: setting.value, description: setting.description })
            .eq('id', existing.id);
        } else {
          // Insert new
          await supabase
            .from('settings')
            .insert([setting]);
        }
      }

      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({ 
        title: "API Keys berhasil disimpan!",
        description: "Konfigurasi AI telah diperbarui."
      });
    } catch (error) {
      toast({ 
        title: "Gagal menyimpan API Keys",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive"
      });
    } finally {
      setIsSavingApiKey(false);
    }
  };

  // Team Mutations
  const createTeamMutation = useMutation({
    mutationFn: async (data: InsertTeamMember) => {
      const formatted = {
        ...data,
        expertise: Array.isArray(data.expertise)
          ? data.expertise
          : String(data.expertise || '')
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean),
      } as InsertTeamMember;
      const { data: result, error } = await supabase
        .from('team_members')
        .insert([formatted])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      toast({ title: "Anggota tim berhasil disimpan!" });
      setIsCreateTeamOpen(false);
      setEditingTeam(null);
      teamForm.reset();
    },
  });

  const updateTeamMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertTeamMember> }) => {
      const formatted = {
        ...data,
        expertise: Array.isArray(data.expertise)
          ? data.expertise
          : typeof data.expertise === 'string'
          ? data.expertise.split(',').map((t) => t.trim())
          : data.expertise,
      } as Partial<InsertTeamMember>;
      const { data: result, error } = await supabase
        .from('team_members')
        .update(formatted)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      toast({ title: "Anggota tim diperbarui!" });
      setEditingTeam(null);
      teamForm.reset();
    },
  });

  const deleteTeamMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      toast({ title: "Anggota tim dihapus!" });
    },
  });

  // Testimonial Mutations
  const createTestimonialMutation = useMutation({
    mutationFn: async (data: InsertTestimonial) => {
      const { data: result, error } = await supabase
        .from('testimonials')
        .insert([data])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({ title: "Testimoni berhasil disimpan!" });
      setIsCreateTestimonialOpen(false);
      setEditingTestimonial(null);
      testimonialForm.reset();
    },
  });

  const updateTestimonialMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertTestimonial> }) => {
      const { data: result, error } = await supabase
        .from('testimonials')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({ title: "Testimoni diperbarui!" });
      setEditingTestimonial(null);
      testimonialForm.reset();
    },
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({ title: "Testimoni dihapus!" });
    },
  });

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm animate-slide-up sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary-50 px-3 py-2 rounded-xl">
                <Database className="w-5 h-5 text-primary-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild className="border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300">
                <a href="/" className="gap-2">
                  <Globe className="w-4 h-4" />
                  Beranda
                </a>
              </Button>
              <Button 
                onClick={handleLogout}
                className="gap-2 bg-primary-600 hover:bg-primary-700 text-white"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { title: "Total Proyek", value: totalProjects, icon: FolderOpen, color: "blue" },
            { title: "Proyek Unggulan", value: featuredProjects, icon: Star, color: "yellow" },
            { title: "Total Users", value: totalUsers, icon: Users, color: "green" },
            { title: "Proyek Minggu Ini", value: recentProjects, icon: Calendar, color: "purple" },
          ].map((stat, index) => (
            <Card key={index} className="bg-white border border-gray-100 rounded-xl hover:border-primary-200 hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8 pb-8">
          <div className="sticky top-[72px] z-40 bg-white pb-4 -mx-3 px-3 sm:-mx-4 sm:px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
            <TabsList className="bg-gray-50 border border-gray-200 rounded-xl w-full p-1 flex lg:grid lg:grid-cols-8 gap-1 overflow-x-auto scrollbar-hide">
              <TabsTrigger value="projects" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm transition-all duration-200">
                <FolderOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Proyek</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm transition-all duration-200">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="categories" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm transition-all duration-200">
                <Code className="w-4 h-4" />
                <span className="hidden sm:inline">Kategori</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm transition-all duration-200">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Tim</span>
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm transition-all duration-200">
                <Quote className="w-4 h-4" />
                <span className="hidden sm:inline">Testimoni</span>
              </TabsTrigger>
              <TabsTrigger value="partners" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm transition-all duration-200">
                <Building2 className="w-4 h-4" />
                <span className="hidden sm:inline">Partners</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm transition-all duration-200">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm transition-all duration-200">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Pengaturan</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6 animate-fade-in mt-6 md:mt-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari proyek..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-gray-200 pl-10"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[180px] border-gray-200">
                    <SelectValue placeholder="Filter kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                {selectedProjects.length > 0 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkFeature(1)}
                      className="border-primary-200 text-primary-600 hover:bg-primary-50"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Unggulkan ({selectedProjects.length})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkFeature(0)}
                      className="border-primary-200 text-primary-600 hover:bg-primary-50"
                    >
                      <EyeOff className="w-4 h-4 mr-2" />
                      Batal Unggulkan
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleBulkDelete}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Hapus ({selectedProjects.length})
                    </Button>
                  </>
                )}

                <Dialog open={isCreateOpen || !!editingProject} onOpenChange={(open) => {
                  setIsCreateOpen(open);
                  if (!open) {
                    setEditingProject(null);
                    projectForm.reset();
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all duration-300">
                      <Plus className="w-4 h-4" />
                      Tambah Proyek
                    </Button>
                  </DialogTrigger>
                  <DialogContent aria-describedby={undefined} className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        {editingProject ? "Edit Proyek" : "Buat Proyek Baru"}
                      </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={projectForm.handleSubmit(handleProjectSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Judul Proyek</Label>
                            <Input
                              id="title"
                              {...projectForm.register("title")}
                              placeholder="Dashboard Analitik Keuangan"
                              className="border-gray-200"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="category">Kategori</Label>
                            <Select onValueChange={(value) => projectForm.setValue("category", value)}>
                              <SelectTrigger className="border-gray-200">
                                <SelectValue placeholder="Pilih kategori" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories?.map((category) => (
                                  <SelectItem key={category.id} value={category.name}>
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: category.color }}
                                      />
                                      {category.name}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="image">URL Gambar</Label>
                            <Input
                              id="image"
                              {...projectForm.register("image")}
                              placeholder="https://..."
                              className="border-gray-200"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="demoUrl">URL Demo</Label>
                            <Input
                              id="demoUrl"
                              {...projectForm.register("demoUrl")}
                              placeholder="https://..."
                              className="border-gray-200"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="githubUrl">URL GitHub</Label>
                            <Input
                              id="githubUrl"
                              {...projectForm.register("githubUrl")}
                              placeholder="https://github.com/..."
                              className="border-gray-200"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="downloadUrl">URL Download App</Label>
                            <Input
                              id="downloadUrl"
                              {...projectForm.register("downloadUrl")}
                              placeholder="https://download.app/..."
                              className="border-gray-200"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi</Label>
                            <Textarea
                              id="description"
                              {...projectForm.register("description")}
                              placeholder="Jelaskan proyek Anda..."
                              rows={4}
                              className="border-gray-200"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="techStack">Tech Stack (pisahkan dengan koma)</Label>
                            <Input
                              id="techStack"
                              {...projectForm.register("techStack" as any)}
                              placeholder="React, Next.js, OpenAI, Supabase"
                              className="border-gray-200"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="featured">Unggulan</Label>
                              <Select onValueChange={(value) => projectForm.setValue("featured", parseInt(value))}>
                                <SelectTrigger className="border-gray-200">
                                  <SelectValue placeholder="Tidak" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0">Tidak</SelectItem>
                                  <SelectItem value="1">Ya</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="status">Status</Label>
                              <Select onValueChange={(value) => projectForm.setValue("status", value)}>
                                <SelectTrigger className="border-gray-200">
                                  <SelectValue placeholder="Active" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">Inactive</SelectItem>
                                  <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="submit"
                          disabled={createProjectMutation.isPending || updateProjectMutation.isPending}
                          className="bg-primary-600 hover:bg-primary-700 text-white"
                        >
                          {editingProject ? "Perbarui Proyek" : "Buat Proyek"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsCreateOpen(false);
                            setEditingProject(null);
                            projectForm.reset();
                          }}
                          className="border-gray-200 hover:border-primary-300 hover:bg-primary-50"
                        >
                          Batal
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {projectsLoading ? (
              <div className="text-center py-12">Memuat proyek...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                {filteredProjects?.map((project, index) => (
                  <Card
                    key={project.id}
                    className="bg-white border border-gray-100 rounded-xl overflow-hidden animate-fade-in hover:border-primary-200 hover:shadow-lg transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        {project.featured === 1 && (
                          <Badge className="bg-yellow-500 text-white animate-glow">Featured</Badge>
                        )}
                        <Badge className={`bg-${project.status === 'active' ? 'green' : project.status === 'inactive' ? 'yellow' : 'gray'}-500 text-white`}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Checkbox
                          checked={selectedProjects.includes(project.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedProjects([...selectedProjects, project.id]);
                            } else {
                              setSelectedProjects(selectedProjects.filter(id => id !== project.id));
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-lg font-bold">{project.title}</h4>
                          <Badge variant="secondary" className="border-gray-200">{project.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.techStack && project.techStack.slice(0, 3).map((tech: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs border-gray-200">
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack && project.techStack.length > 3 && (
                          <Badge variant="outline" className="text-xs border-gray-200">
                            +{project.techStack.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2 border-primary-200 text-primary-600 hover:bg-primary-50"
                          onClick={() => handleEditProject(project)}
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        {project.demoUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-2 border-primary-200 text-primary-600 hover:bg-primary-50"
                            asChild
                          >
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3" />
                              Demo
                            </a>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => {
                            if (confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
                              deleteProjectMutation.mutate(project.id);
                            }
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Manajemen Tim</h3>
              <Dialog open={isCreateTeamOpen || !!editingTeam} onOpenChange={(open) => {
                setIsCreateTeamOpen(open);
                if (!open) {
                  setEditingTeam(null);
                  teamForm.reset();
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary-600 hover:bg-primary-700 text-white">
                    <Plus className="w-4 h-4" />
                    Tambah Anggota
                  </Button>
                </DialogTrigger>
                <DialogContent aria-describedby={undefined} className="max-w-3xl bg-white">
                  <DialogHeader>
                    <DialogTitle>{editingTeam ? "Edit Anggota" : "Anggota Baru"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={teamForm.handleSubmit(handleTeamSubmit)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tm-name">Nama</Label>
                        <Input id="tm-name" {...teamForm.register("name")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tm-role">Role</Label>
                        <Input id="tm-role" {...teamForm.register("role")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tm-image">Foto URL</Label>
                        <Input id="tm-image" {...teamForm.register("image")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tm-email">Email</Label>
                        <Input id="tm-email" {...teamForm.register("email")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="tm-bio">Bio</Label>
                        <Textarea id="tm-bio" rows={3} {...teamForm.register("bio")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="tm-expertise">Keahlian (pisahkan dengan koma)</Label>
                        <Input id="tm-expertise" {...teamForm.register("expertise" as any)} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tm-order">Urutan</Label>
                        <Input id="tm-order" type="number" {...teamForm.register("displayOrder", { valueAsNumber: true })} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tm-status">Status</Label>
                        <Select onValueChange={(v) => teamForm.setValue("status", v)}>
                          <SelectTrigger className="border-gray-200">
                            <SelectValue placeholder="active" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">active</SelectItem>
                            <SelectItem value="inactive">inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">{editingTeam ? "Perbarui" : "Simpan"}</Button>
                      <Button type="button" variant="outline" className="border-gray-200 hover:border-primary-300 hover:bg-primary-50" onClick={() => { setIsCreateTeamOpen(false); setEditingTeam(null); teamForm.reset(); }}>Batal</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {teamLoading ? (
              <div className="text-center py-8">Memuat tim...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers?.map((m) => (
                  <Card key={m.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-primary-200 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">{m.name}</div>
                        <div className="text-sm text-muted-foreground">{m.role}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="border-primary-200 text-primary-600 hover:bg-primary-50" onClick={() => handleEditTeam(m)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="icon" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => deleteTeamMutation.mutate(m.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Manajemen Testimoni</h3>
              <Dialog open={isCreateTestimonialOpen || !!editingTestimonial} onOpenChange={(open) => {
                setIsCreateTestimonialOpen(open);
                if (!open) {
                  setEditingTestimonial(null);
                  testimonialForm.reset();
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary-600 hover:bg-primary-700 text-white">
                    <Plus className="w-4 h-4" />
                    Tambah Testimoni
                  </Button>
                </DialogTrigger>
                <DialogContent aria-describedby={undefined} className="max-w-3xl bg-white">
                  <DialogHeader>
                    <DialogTitle>{editingTestimonial ? "Edit Testimoni" : "Testimoni Baru"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={testimonialForm.handleSubmit(handleTestimonialSubmit)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ts-name">Nama</Label>
                        <Input id="ts-name" {...testimonialForm.register("name")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ts-role">Role</Label>
                        <Input id="ts-role" {...testimonialForm.register("role")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ts-company">Perusahaan</Label>
                        <Input id="ts-company" {...testimonialForm.register("company")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ts-image">Foto URL</Label>
                        <Input id="ts-image" {...testimonialForm.register("image")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ts-rating">Rating (1-5)</Label>
                        <Input id="ts-rating" type="number" min={1} max={5} {...testimonialForm.register("rating", { valueAsNumber: true })} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ts-project">Proyek</Label>
                        <Input id="ts-project" {...testimonialForm.register("project")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="ts-text">Testimoni</Label>
                        <Textarea id="ts-text" rows={3} {...testimonialForm.register("text")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ts-order">Urutan</Label>
                        <Input id="ts-order" type="number" {...testimonialForm.register("displayOrder", { valueAsNumber: true })} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ts-status">Status</Label>
                        <Select onValueChange={(v) => testimonialForm.setValue("status", v)}>
                          <SelectTrigger className="border-gray-200">
                            <SelectValue placeholder="active" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">active</SelectItem>
                            <SelectItem value="inactive">inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">{editingTestimonial ? "Perbarui" : "Simpan"}</Button>
                      <Button type="button" variant="outline" className="border-gray-200 hover:border-primary-300 hover:bg-primary-50" onClick={() => { setIsCreateTestimonialOpen(false); setEditingTestimonial(null); testimonialForm.reset(); }}>Batal</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {testimonialsLoading ? (
              <div className="text-center py-8">Memuat testimoni...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials?.map((t) => (
                  <Card key={t.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-primary-200 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">{t.name} • {t.company}</div>
                        <div className="text-sm text-muted-foreground">{t.role} • Rating: {t.rating}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="border-primary-200 text-primary-600 hover:bg-primary-50" onClick={() => handleEditTestimonial(t)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="icon" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => deleteTestimonialMutation.mutate(t.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Partners Tab */}
          <TabsContent value="partners" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Manajemen Partner & Klien</h3>
              <PartnerFormDialog onSuccess={() => queryClient.invalidateQueries({ queryKey: ["partners"] })} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {partnersLoading ? (
                <div className="col-span-full text-center py-8">Memuat partners...</div>
              ) : (
                partners?.map((partner) => (
                  <Card key={partner.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-primary-200 hover:shadow-lg transition-all">
                    <div className="space-y-3">
                      <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-w-full max-h-full object-contain p-2"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{partner.name}</h4>
                        {partner.website && (
                          <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            Website
                          </a>
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          Order: {partner.displayOrder} • {partner.status}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <PartnerFormDialog 
                          partner={partner} 
                          onSuccess={() => queryClient.invalidateQueries({ queryKey: ["partners"] })} 
                        />
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={async () => {
                            if (confirm(`Hapus partner "${partner.name}"?`)) {
                              const { error } = await supabase
                                .from("partners")
                                .delete()
                                .eq("id", partner.id);
                              
                              if (error) {
                                toast({
                                  title: "Error",
                                  description: error.message,
                                  variant: "destructive",
                                });
                              } else {
                                toast({
                                  title: "Berhasil",
                                  description: "Partner berhasil dihapus",
                                });
                                queryClient.invalidateQueries({ queryKey: ["partners"] });
                              }
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Kelola Users</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all duration-300">
                    <Plus className="w-4 h-4" />
                    Tambah User
                  </Button>
                </DialogTrigger>
                <DialogContent aria-describedby={undefined} className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Buat User Baru</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={userForm.handleSubmit(handleUserSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        {...userForm.register("username")}
                        placeholder="admin"
                        className="border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        {...userForm.register("password")}
                        placeholder="••••••••"
                        className="border-gray-200"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">
                        Buat User
                      </Button>
                      <Button type="button" variant="outline" className="border-gray-200 hover:border-primary-300 hover:bg-primary-50">
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {usersLoading ? (
              <div className="text-center py-12">Memuat users...</div>
            ) : (
              <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4">
                {users?.map((user) => (
                  <Card key={user.id} className="bg-white border border-gray-100 rounded-xl hover:border-primary-200 hover:shadow-lg transition-all animate-fade-in">
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary-50 p-3 rounded-full">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{user.username}</h4>
                            <p className="text-sm text-muted-foreground">User ID: {user.id}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            if (confirm("Hapus user ini?")) {
                              deleteUserMutation.mutate(user.id);
                            }
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Kelola Kategori</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all duration-300">
                    <Plus className="w-4 h-4" />
                    Tambah Kategori
                  </Button>
                </DialogTrigger>
                <DialogContent aria-describedby={undefined} className="bg-white">
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? "Edit Kategori" : "Buat Kategori Baru"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={categoryForm.handleSubmit(handleCategorySubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Kategori</Label>
                      <Input
                        id="name"
                        {...categoryForm.register("name")}
                        placeholder="Web Development"
                        className="border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Deskripsi</Label>
                      <Textarea
                        id="description"
                        {...categoryForm.register("description")}
                        placeholder="Deskripsi kategori..."
                        className="border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="color">Warna</Label>
                      <Input
                        id="color"
                        type="color"
                        {...categoryForm.register("color")}
                        className="border-gray-200"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">
                        {editingCategory ? "Perbarui" : "Buat"} Kategori
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingCategory(null);
                          categoryForm.reset();
                        }}
                        className="border-gray-200 hover:border-primary-300 hover:bg-primary-50"
                      >
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {categoriesLoading ? (
              <div className="text-center py-12">Memuat kategori...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                {categories?.map((category) => (
                  <Card key={category.id} className="bg-white border border-gray-100 rounded-xl hover:border-primary-200 hover:shadow-lg transition-all animate-fade-in">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <h4 className="font-semibold">{category.name}</h4>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCategory(category)}
                          className="border-primary-200 text-primary-600 hover:bg-primary-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {category.description || "Tidak ada deskripsi"}
                      </p>
                      <Button
                        size="sm"
                        onClick={() => {
                          if (confirm("Hapus kategori ini?")) {
                            deleteCategoryMutation.mutate(category.id);
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              <Card className="bg-white border border-gray-100 rounded-xl animate-fade-in">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary-50 p-3 rounded-full">
                      <TrendingUp className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Events</p>
                      <p className="text-2xl font-bold">{analytics?.length || 0}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-white border border-gray-100 rounded-xl animate-fade-in">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-50 p-3 rounded-full">
                      <Activity className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Projects</p>
                      <p className="text-2xl font-bold">{projects?.filter(p => p.status === 'active').length || 0}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-white border border-gray-100 rounded-xl animate-fade-in">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-50 p-3 rounded-full">
                      <Eye className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Featured Projects</p>
                      <p className="text-2xl font-bold">{featuredProjects}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="glass-card animate-fade-in">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {analytics?.slice(0, 10).map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-3 glass rounded-lg">
                      <div className="glass-blue p-2 rounded-full">
                        <Activity className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{event.event}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Pengaturan</h3>
              <Dialog open={isCreateSettingOpen || !!editingSetting} onOpenChange={(open) => {
                setIsCreateSettingOpen(open);
                if (!open) {
                  setEditingSetting(null);
                  settingForm.reset();
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all duration-300">
                    <Plus className="w-4 h-4" />
                    Tambah Pengaturan
                  </Button>
                </DialogTrigger>
                <DialogContent aria-describedby={undefined} className="bg-white max-w-xl">
                  <DialogHeader>
                    <DialogTitle>{editingSetting ? "Edit Pengaturan" : "Buat Pengaturan Baru"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={settingForm.handleSubmit(handleSettingSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="setting_key">Key</Label>
                      <Input id="setting_key" disabled={!!editingSetting} {...settingForm.register("key")} placeholder="site_title" className="border-gray-200" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="setting_value">Value (JSON)</Label>
                      <Textarea id="setting_value" {...settingForm.register("value" as any)} placeholder='{"title":"My Site"}' rows={4} className="border-gray-200" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="setting_description">Deskripsi</Label>
                      <Textarea id="setting_description" {...settingForm.register("description")} placeholder="Deskripsi pengaturan" rows={2} className="border-gray-200" />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">
                        {editingSetting ? "Perbarui" : "Buat"}
                      </Button>
                      <Button type="button" variant="outline" className="border-gray-200 hover:border-primary-300 hover:bg-primary-50" onClick={() => { setIsCreateSettingOpen(false); setEditingSetting(null); settingForm.reset(); }}>
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* API Keys Management */}
            <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white animate-fade-in">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Key className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Konfigurasi API Keys AI</h3>
                    <p className="text-sm text-gray-600">Kelola API keys untuk integrasi layanan AI</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* OpenAI API Key */}
                  <div className="space-y-2">
                    <Label htmlFor="openai_key" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      OpenAI API Key
                    </Label>
                    <div className="relative">
                      <Input
                        id="openai_key"
                        type={showApiKey ? "text" : "password"}
                        value={apiKeys.openai}
                        onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
                        placeholder="sk-..."
                        className="border-gray-300 pr-10 font-mono text-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">Untuk ChatGPT, GPT-4, dan model OpenAI lainnya</p>
                  </div>

                  {/* Anthropic API Key */}
                  <div className="space-y-2">
                    <Label htmlFor="anthropic_key" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      Anthropic Claude API Key
                    </Label>
                    <div className="relative">
                      <Input
                        id="anthropic_key"
                        type={showApiKey ? "text" : "password"}
                        value={apiKeys.anthropic}
                        onChange={(e) => setApiKeys({ ...apiKeys, anthropic: e.target.value })}
                        placeholder="sk-ant-..."
                        className="border-gray-300 pr-10 font-mono text-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">Untuk Claude AI dan model Anthropic</p>
                  </div>

                  {/* Gemini API Key */}
                  <div className="space-y-2">
                    <Label htmlFor="gemini_key" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Google Gemini API Key
                    </Label>
                    <div className="relative">
                      <Input
                        id="gemini_key"
                        type={showApiKey ? "text" : "password"}
                        value={apiKeys.gemini}
                        onChange={(e) => setApiKeys({ ...apiKeys, gemini: e.target.value })}
                        placeholder="AIza..."
                        className="border-gray-300 pr-10 font-mono text-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">Untuk Google Gemini Pro dan model Google AI</p>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <Button
                      onClick={handleSaveApiKeys}
                      disabled={isSavingApiKey}
                      className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isSavingApiKey ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Simpan API Keys
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setApiKeys({ openai: "", anthropic: "", gemini: "" });
                        setShowApiKey(false);
                      }}
                      className="gap-2 border-gray-300"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reset
                    </Button>
                  </div>

                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-semibold mb-1">Keamanan API Key</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Jangan bagikan API key Anda kepada siapa pun</li>
                          <li>API key disimpan dengan enkripsi di database</li>
                          <li>Rotasi API key secara berkala untuk keamanan maksimal</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-card animate-fade-in">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">System Settings</h3>
                <div className="space-y-4">
                  {settings?.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-4 glass rounded-lg">
                      <div>
                        <p className="font-medium">{setting.key}</p>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-sm bg-muted px-2 py-1 rounded max-w-[320px] truncate">
                          {JSON.stringify(setting.value)}
                        </p>
                        <Button variant="outline" size="sm" className="border-primary-200 text-primary-600 hover:bg-primary-50" onClick={() => handleEditSetting(setting)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => { if (confirm("Hapus pengaturan ini?")) { deleteSettingMutation.mutate(setting.id); } }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
