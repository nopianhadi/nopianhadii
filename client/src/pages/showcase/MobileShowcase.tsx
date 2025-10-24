import React, { useState } from "react"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import { MobileContainer, MobileSection, MobileGrid, MobileStack } from "@/components/mobile/mobile-layout"
import { MobileCard, MobileCardHeader, MobileCardContent, MobileCardTitle, MobileCardDescription } from "@/components/mobile/mobile-card"
import { MobileButton, FloatingActionButton } from "@/components/mobile/mobile-button"
import { MobileHeading, MobileText, MobileBadge } from "@/components/mobile/mobile-typography"
import { MobileInput, MobileSearchInput, MobileTextarea } from "@/components/mobile/mobile-input"
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent, MobileBottomTabs, MobileBottomTab } from "@/components/mobile/mobile-tabs"
import { MobileModal, MobileModalHeader, MobileModalBody, MobileModalFooter, MobileBottomSheet } from "@/components/mobile/mobile-modal"
import { MobileLoading, MobileSkeleton, MobileCardSkeleton } from "@/components/mobile/mobile-loading"
import { MobileToastProvider, useToastHelpers } from "@/components/mobile/mobile-toast"
import { MobileAppBar, MobileListItem, MobileActionSheet, MobileCarousel, MobileProgressBar } from "@/components/mobile/mobile-advanced"
import { PWAInstallPrompt, NetworkStatus, ShareButton, VibrationButton } from "@/components/mobile/mobile-pwa"
import { SwipeHandler, PullToRefresh, LongPressHandler } from "@/components/mobile/mobile-gestures"
import { useIsMobile, useScreenSize } from "@/hooks/use-mobile"
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Palette, 
  Zap, 
  Shield,
  Home,
  Search,
  Heart,
  User,
  Settings,
  Plus,
  Star,
  MessageCircle,
  Share,
  Download
} from "lucide-react"

const MobileShowcaseContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("components")
  const [showModal, setShowModal] = useState(false)
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [progress, setProgress] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  
  const toast = useToastHelpers()
  const isMobile = useIsMobile()
  const { width, height } = useScreenSize()

  const handleLoadingDemo = () => {
    setLoading(true)
    setProgress(0)
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setLoading(false)
          toast.success("Loading completed!", "Data has been loaded successfully")
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setRefreshing(false)
    toast.success("Refreshed!", "Content has been updated")
  }

  const handleSwipe = (direction: string) => {
    toast.info(`Swiped ${direction}`, "Gesture detected successfully")
  }

  const handleLongPress = () => {
    toast.info("Long press detected", "Hold gesture recognized")
  }

  const components = [
    {
      title: "Mobile Cards",
      description: "Responsive card components with various styles",
      icon: <Smartphone className="w-5 h-5" />,
      variant: "elevated" as const
    },
    {
      title: "Interactive Buttons", 
      description: "Touch-optimized buttons with haptic feedback",
      icon: <Zap className="w-5 h-5" />,
      variant: "glass" as const
    },
    {
      title: "Secure Forms",
      description: "Mobile-first form components with validation",
      icon: <Shield className="w-5 h-5" />,
      variant: "default" as const
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <MobileSection spacing="lg" background="accent">
        <MobileContainer>
          <div className="text-center space-y-6">
            <MobileBadge variant="outline" size="lg" className="bg-primary/10 text-primary border-primary/20">
              🚀 Mobile UI Components
            </MobileBadge>
            
            <MobileHeading level={1} size="3xl" gradient className="text-mobile-3xl">
              Modern Mobile UI/UX
            </MobileHeading>
            
            <MobileText size="lg" color="muted" align="center" className="max-w-2xl mx-auto text-mobile-base leading-relaxed">
              Komponen UI yang dioptimalkan untuk pengalaman mobile terbaik dengan desain modern dan performa tinggi
            </MobileText>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <MobileButton 
                size="lg" 
                variant="gradient"
                className="btn-mobile-touch"
                onClick={() => setShowModal(true)}
              >
                <div className="icon-mobile-sm">
                  <Plus />
                </div>
                <span className="text-mobile-sm font-medium">Lihat Demo</span>
              </MobileButton>
              
              <MobileButton 
                size="lg" 
                variant="outline"
                className="btn-mobile-touch"
                onClick={() => setShowBottomSheet(true)}
              >
                <div className="icon-mobile-sm">
                  <Download />
                </div>
                <span className="text-mobile-sm font-medium">Download</span>
              </MobileButton>
            </div>
          </div>
        </MobileContainer>
      </MobileSection>

      {/* Main Content */}
      <MobileSection spacing="lg">
        <MobileContainer>
          <MobileTabs defaultValue="components" value={activeTab} onValueChange={setActiveTab}>
            <MobileTabsList className="mb-8">
              <MobileTabsTrigger value="components">Components</MobileTabsTrigger>
              <MobileTabsTrigger value="forms">Forms</MobileTabsTrigger>
              <MobileTabsTrigger value="navigation">Navigation</MobileTabsTrigger>
              <MobileTabsTrigger value="advanced">Advanced</MobileTabsTrigger>
              <MobileTabsTrigger value="pwa">PWA</MobileTabsTrigger>
            </MobileTabsList>

            <MobileTabsContent value="components">
              <MobileStack spacing="lg">
                <div>
                  <MobileHeading level={2} size="xl" className="mb-4">
                    UI Components
                  </MobileHeading>
                  <MobileText color="muted" className="mb-6">
                    Koleksi komponen yang responsif dan mudah digunakan
                  </MobileText>
                </div>

                <MobileGrid cols={3} gap="sm">
                  {components.map((component, index) => (
                    <MobileCard
                      key={index}
                      variant={component.variant}
                      interactive
                      className="group card-mobile-comfortable"
                    >
                      <MobileCardHeader>
                        <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                          <div className="p-1.5 sm:p-2 bg-primary/10 rounded-md sm:rounded-lg text-primary group-hover:scale-110 transition-transform">
                            <div className="icon-mobile-sm">
                              {component.icon}
                            </div>
                          </div>
                          <MobileBadge variant="secondary" size="sm">
                            New
                          </MobileBadge>
                        </div>
                        <MobileCardTitle className="text-mobile-sm font-semibold">
                          {component.title}
                        </MobileCardTitle>
                        <MobileCardDescription className="text-mobile-xs">
                          {component.description}
                        </MobileCardDescription>
                      </MobileCardHeader>
                      <MobileCardContent>
                        <MobileButton 
                          size="sm" 
                          width="full"
                          className="btn-mobile-touch text-mobile-xs"
                          onClick={() => toast.info("Component clicked", component.title)}
                        >
                          Explore
                        </MobileButton>
                      </MobileCardContent>
                    </MobileCard>
                  ))}
                </MobileGrid>

                {/* Loading Demo */}
                <MobileCard variant="elevated">
                  <MobileCardHeader>
                    <MobileCardTitle>Loading States</MobileCardTitle>
                    <MobileCardDescription>
                      Berbagai state loading untuk UX yang lebih baik
                    </MobileCardDescription>
                  </MobileCardHeader>
                  <MobileCardContent>
                    <div className="space-y-4">
                      {loading ? (
                        <MobileCardSkeleton />
                      ) : (
                        <div className="space-y-3">
                          <MobileText>Content loaded successfully!</MobileText>
                          <div className="flex gap-2">
                            <MobileLoading size="sm" variant="spinner" />
                            <MobileLoading size="sm" variant="dots" />
                            <MobileLoading size="sm" variant="pulse" />
                            <MobileLoading size="sm" variant="bars" />
                          </div>
                        </div>
                      )}
                      <MobileButton 
                        onClick={handleLoadingDemo}
                        disabled={loading}
                        loading={loading}
                        width="full"
                      >
                        {loading ? "Loading..." : "Start Loading Demo"}
                      </MobileButton>
                    </div>
                  </MobileCardContent>
                </MobileCard>
              </MobileStack>
            </MobileTabsContent>

            <MobileTabsContent value="forms">
              <MobileStack spacing="md">
                <MobileHeading level={2} size="xl">
                  Form Components
                </MobileHeading>
                
                <MobileCard variant="elevated">
                  <MobileCardHeader>
                    <MobileCardTitle>Mobile-Optimized Forms</MobileCardTitle>
                    <MobileCardDescription>
                      Form yang dioptimalkan untuk input mobile
                    </MobileCardDescription>
                  </MobileCardHeader>
                  <MobileCardContent>
                    <MobileStack spacing="md">
                      <MobileSearchInput
                        placeholder="Search anything..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onClear={() => setSearchValue("")}
                      />
                      
                      <MobileInput
                        label="Email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                      
                      <MobileInput
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        helperText="Minimum 8 characters"
                      />
                      
                      <MobileTextarea
                        label="Message"
                        placeholder="Write your message..."
                        rows={4}
                      />
                      
                      <div className="flex gap-3">
                        <MobileButton variant="outline" width="full">
                          Cancel
                        </MobileButton>
                        <MobileButton width="full">
                          Submit
                        </MobileButton>
                      </div>
                    </MobileStack>
                  </MobileCardContent>
                </MobileCard>
              </MobileStack>
            </MobileTabsContent>

            <MobileTabsContent value="navigation">
              <MobileStack spacing="md">
                <MobileHeading level={2} size="xl">
                  Navigation Components
                </MobileHeading>
                
                <MobileCard variant="elevated">
                  <MobileCardHeader>
                    <MobileCardTitle>Bottom Navigation Preview</MobileCardTitle>
                    <MobileCardDescription>
                      Tab navigation yang umum digunakan di mobile apps
                    </MobileCardDescription>
                  </MobileCardHeader>
                  <MobileCardContent>
                    <div className="relative bg-muted/30 rounded-lg p-4 min-h-[200px] flex items-end">
                      <div className="w-full bg-background border border-border rounded-lg p-2">
                        <div className="flex items-center justify-around">
                          <div className="flex flex-col items-center gap-1 px-3 py-2 text-primary">
                            <Home className="w-5 h-5" />
                            <span className="text-xs font-medium">Home</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground">
                            <Search className="w-5 h-5" />
                            <span className="text-xs">Search</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground relative">
                            <Heart className="w-5 h-5" />
                            <span className="text-xs">Favorites</span>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                              3
                            </div>
                          </div>
                          <div className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground">
                            <User className="w-5 h-5" />
                            <span className="text-xs">Profile</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MobileCardContent>
                </MobileCard>
              </MobileStack>
            </MobileTabsContent>

            <MobileTabsContent value="advanced">
              <MobileStack spacing="md">
                <MobileHeading level={2} size="xl">
                  Advanced Components
                </MobileHeading>
                
                {/* App Bar Demo */}
                <MobileCard variant="elevated">
                  <MobileCardHeader>
                    <MobileCardTitle>Mobile App Bar</MobileCardTitle>
                    <MobileCardDescription>
                      Native-like app bar dengan navigation
                    </MobileCardDescription>
                  </MobileCardHeader>
                  <MobileCardContent>
                    <div className="border border-border rounded-lg overflow-hidden">
                      <MobileAppBar
                        title="Demo App"
                        onBack={() => toast.info("Back pressed")}
                        rightAction={
                          <button
                            onClick={() => setShowActionSheet(true)}
                            className="p-2 hover:bg-accent rounded-lg transition-colors"
                          >
                            <Settings className="w-5 h-5" />
                          </button>
                        }
                      />
                      <div className="p-4 bg-muted/30">
                        <p className="text-sm text-muted-foreground">App content area</p>
                      </div>
                    </div>
                  </MobileCardContent>
                </MobileCard>

                {/* List Items Demo */}
                <MobileCard variant="elevated">
                  <MobileCardHeader>
                    <MobileCardTitle>Mobile List Items</MobileCardTitle>
                    <MobileCardDescription>
                      Touch-optimized list dengan berbagai layout
                    </MobileCardDescription>
                  </MobileCardHeader>
                  <MobileCardContent>
                    <div className="border border-border rounded-lg overflow-hidden">
                      <MobileListItem
                        leftIcon={<User className="w-5 h-5 text-primary" />}
                        subtitle="john@example.com"
                        onClick={() => toast.info("Profile clicked")}
                      >
                        John Doe
                      </MobileListItem>
                      <MobileListItem
                        leftIcon={<MessageCircle className="w-5 h-5 text-green-600" />}
                        badge={5}
                        onClick={() => toast.info("Messages clicked")}
                      >
                        Messages
                      </MobileListItem>
                      <MobileListItem
                        leftIcon={<Settings className="w-5 h-5 text-muted-foreground" />}
                        rightIcon={null}
                        onClick={() => toast.info("Settings clicked")}
                      >
                        Settings
                      </MobileListItem>
                    </div>
                  </MobileCardContent>
                </MobileCard>

                {/* Progress Bar Demo */}
                <MobileCard variant="elevated">
                  <MobileCardHeader>
                    <MobileCardTitle>Progress Indicators</MobileCardTitle>
                    <MobileCardDescription>
                      Progress bar dengan animasi smooth
                    </MobileCardDescription>
                  </MobileCardHeader>
                  <MobileCardContent>
                    <MobileStack spacing="md">
                      <MobileProgressBar value={progress} showLabel />
                      <MobileButton 
                        onClick={handleLoadingDemo}
                        disabled={loading}
                        width="full"
                      >
                        {loading ? "Loading..." : "Start Progress Demo"}
                      </MobileButton>
                    </MobileStack>
                  </MobileCardContent>
                </MobileCard>

                {/* Gestures Demo */}
                <MobileCard variant="elevated">
                  <MobileCardHeader>
                    <MobileCardTitle>Touch Gestures</MobileCardTitle>
                    <MobileCardDescription>
                      Swipe, long press, dan gesture lainnya
                    </MobileCardDescription>
                  </MobileCardHeader>
                  <MobileCardContent>
                    <MobileStack spacing="md">
                      <SwipeHandler
                        onSwipeLeft={() => handleSwipe("left")}
                        onSwipeRight={() => handleSwipe("right")}
                        onSwipeUp={() => handleSwipe("up")}
                        onSwipeDown={() => handleSwipe("down")}
                        className="p-6 bg-accent/30 rounded-lg border-2 border-dashed border-accent text-center"
                      >
                        <p className="text-sm font-medium">Swipe in any direction</p>
                        <p className="text-xs text-muted-foreground mt-1">Try swiping left, right, up, or down</p>
                      </SwipeHandler>
                      
                      <LongPressHandler
                        onLongPress={handleLongPress}
                        className="p-4 bg-primary/10 rounded-lg text-center"
                      >
                        <p className="text-sm font-medium text-primary">Long press me</p>
                        <p className="text-xs text-muted-foreground mt-1">Hold for 500ms</p>
                      </LongPressHandler>
                    </MobileStack>
                  </MobileCardContent>
                </MobileCard>
              </MobileStack>
            </MobileTabsContent>

            <MobileTabsContent value="pwa">
              <MobileStack spacing="md">
                <MobileHeading level={2} size="xl">
                  PWA Features
                </MobileHeading>
                
                <MobileText color="muted" className="mb-4">
                  Progressive Web App features untuk pengalaman native-like
                </MobileText>

                {/* Device Info */}
                <MobileCard variant="elevated">
                  <MobileCardHeader>
                    <MobileCardTitle>Device Information</MobileCardTitle>
                    <MobileCardDescription>
                      Informasi perangkat dan browser capabilities
                    </MobileCardDescription>
                  </MobileCardHeader>
                  <MobileCardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Screen Size:</span>
                        <p className="text-muted-foreground">{width} × {height}</p>
                      </div>
                      <div>
                        <span className="font-medium">Device Type:</span>
                        <p className="text-muted-foreground">
                          {isMobile ? "Mobile" : "Desktop"}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Touch Support:</span>
                        <p className="text-muted-foreground">
                          {'ontouchstart' in window ? "Yes" : "No"}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Online Status:</span>
                        <p className="text-muted-foreground">
                          {navigator.onLine ? "Online" : "Offline"}
                        </p>
                      </div>
                    </div>
                  </MobileCardContent>
                </MobileCard>

                {/* PWA Actions */}
                <MobileCard variant="elevated">
                  <MobileCardHeader>
                    <MobileCardTitle>PWA Actions</MobileCardTitle>
                    <MobileCardDescription>
                      Share, vibration, dan fitur native lainnya
                    </MobileCardDescription>
                  </MobileCardHeader>
                  <MobileCardContent>
                    <MobileGrid cols={2} gap="md">
                      <ShareButton
                        title="Mobile UI Showcase"
                        text="Check out this amazing mobile UI components!"
                        className="w-full justify-center"
                      >
                        Share App
                      </ShareButton>
                      
                      <VibrationButton
                        pattern={[100, 50, 100]}
                        className="w-full"
                        onClick={() => toast.info("Vibration triggered")}
                      >
                        Vibrate
                      </VibrationButton>
                    </MobileGrid>
                  </MobileCardContent>
                </MobileCard>

                {/* Pull to Refresh Demo */}
                <MobileCard variant="elevated">
                  <MobileCardHeader>
                    <MobileCardTitle>Pull to Refresh</MobileCardTitle>
                    <MobileCardDescription>
                      Native-like pull to refresh gesture
                    </MobileCardDescription>
                  </MobileCardHeader>
                  <MobileCardContent>
                    <PullToRefresh onRefresh={handleRefresh}>
                      <div className="p-4 bg-muted/30 rounded-lg text-center min-h-[200px] flex items-center justify-center">
                        <div>
                          <p className="font-medium">Pull down to refresh</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {refreshing ? "Refreshing..." : "Try pulling down on this area"}
                          </p>
                        </div>
                      </div>
                    </PullToRefresh>
                  </MobileCardContent>
                </MobileCard>
              </MobileStack>
            </MobileTabsContent>
          </MobileTabs>
        </MobileContainer>
      </MobileSection>

      {/* Floating Action Button */}
      <FloatingActionButton
        position="bottom-right"
        size="lg"
        onClick={() => toast.success("FAB clicked!", "Floating Action Button works perfectly")}
      >
        <Plus className="w-6 h-6" />
      </FloatingActionButton>

      {/* Modal Demo */}
      <MobileModal
        open={showModal}
        onClose={() => setShowModal(false)}
        size="md"
      >
        <MobileModalHeader>
          <MobileHeading level={3} size="lg">
            Modal Demo
          </MobileHeading>
          <MobileText color="muted">
            Ini adalah contoh modal yang responsif untuk mobile
          </MobileText>
        </MobileModalHeader>
        <MobileModalBody>
          <MobileStack spacing="md">
            <MobileText>
              Modal ini menggunakan backdrop blur dan animasi yang smooth untuk pengalaman yang lebih baik di mobile.
            </MobileText>
            <div className="flex gap-2">
              <MobileBadge variant="success">Responsive</MobileBadge>
              <MobileBadge variant="outline">Accessible</MobileBadge>
              <MobileBadge variant="secondary">Modern</MobileBadge>
            </div>
          </MobileStack>
        </MobileModalBody>
        <MobileModalFooter>
          <MobileButton variant="outline" onClick={() => setShowModal(false)}>
            Cancel
          </MobileButton>
          <MobileButton onClick={() => {
            setShowModal(false)
            toast.success("Action completed!")
          }}>
            Confirm
          </MobileButton>
        </MobileModalFooter>
      </MobileModal>

      {/* Bottom Sheet Demo */}
      <MobileBottomSheet
        open={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
      >
        <MobileStack spacing="md">
          <div className="text-center">
            <MobileHeading level={3} size="lg">
              Download Options
            </MobileHeading>
            <MobileText color="muted">
              Choose your preferred download format
            </MobileText>
          </div>
          
          <div className="space-y-3">
            <MobileButton width="full" variant="outline" className="justify-start">
              <Download className="w-5 h-5" />
              Download as ZIP
            </MobileButton>
            <MobileButton width="full" variant="outline" className="justify-start">
              <Share className="w-5 h-5" />
              Share Link
            </MobileButton>
            <MobileButton width="full" variant="outline" className="justify-start">
              <Star className="w-5 h-5" />
              Add to Favorites
            </MobileButton>
          </div>
          
          <MobileButton 
            width="full" 
            onClick={() => {
              setShowBottomSheet(false)
              toast.info("Download started", "Your download will begin shortly")
            }}
          >
            Start Download
          </MobileButton>
        </MobileStack>
      </MobileBottomSheet>

      {/* Action Sheet Demo */}
      <MobileActionSheet
        open={showActionSheet}
        onClose={() => setShowActionSheet(false)}
        title="Actions"
      >
        <div className="space-y-1">
          <MobileListItem
            leftIcon={<Share className="w-5 h-5 text-blue-600" />}
            rightIcon={null}
            onClick={() => {
              setShowActionSheet(false)
              toast.info("Share action")
            }}
          >
            Share
          </MobileListItem>
          <MobileListItem
            leftIcon={<Download className="w-5 h-5 text-green-600" />}
            rightIcon={null}
            onClick={() => {
              setShowActionSheet(false)
              toast.info("Download action")
            }}
          >
            Download
          </MobileListItem>
          <MobileListItem
            leftIcon={<Star className="w-5 h-5 text-yellow-600" />}
            rightIcon={null}
            onClick={() => {
              setShowActionSheet(false)
              toast.info("Favorite action")
            }}
          >
            Add to Favorites
          </MobileListItem>
        </div>
      </MobileActionSheet>

      {/* PWA Components */}
      <NetworkStatus />
      <PWAInstallPrompt />
      
      <Footer />
    </div>
  )
}

const MobileShowcase: React.FC = () => {
  return (
    <MobileToastProvider>
      <MobileShowcaseContent />
    </MobileToastProvider>
  )
}

export default MobileShowcase