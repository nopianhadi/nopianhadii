# Mobile UI Components Documentation

## Overview

Koleksi komponen UI yang dioptimalkan untuk pengalaman mobile terbaik dengan desain modern, performa tinggi, dan aksesibilitas yang baik.

## 🚀 Fitur Utama

### ✅ Mobile-First Design
- Responsive design yang mengutamakan mobile experience
- Touch-friendly interactions dengan minimum 44px tap targets
- Optimized untuk berbagai ukuran layar mobile

### ✅ Modern UI/UX
- Google AI Studio inspired design system
- Smooth animations dan micro-interactions
- Glass morphism dan gradient effects
- Haptic feedback simulation

### ✅ Performance Optimized
- Lightweight components dengan bundle size minimal
- Lazy loading untuk komponen besar
- Optimized animations menggunakan CSS transforms
- Efficient re-rendering dengan React best practices

### ✅ Accessibility First
- WCAG 2.1 compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast support

## 📱 Komponen Tersedia

### Layout Components

#### MobileContainer
```tsx
import { MobileContainer } from "@/components/ui/mobile-layout"

<MobileContainer size="lg" padding="md">
  {/* Content */}
</MobileContainer>
```

**Props:**
- `size`: "sm" | "md" | "lg" | "xl" | "full"
- `padding`: "none" | "sm" | "md" | "lg"

#### MobileSection
```tsx
import { MobileSection } from "@/components/ui/mobile-layout"

<MobileSection spacing="lg" background="accent">
  {/* Content */}
</MobileSection>
```

**Props:**
- `spacing`: "none" | "sm" | "md" | "lg" | "xl"
- `background`: "default" | "muted" | "accent"

#### MobileGrid
```tsx
import { MobileGrid } from "@/components/ui/mobile-layout"

<MobileGrid cols={3} gap="md" responsive>
  {/* Grid items */}
</MobileGrid>
```

**Props:**
- `cols`: 1 | 2 | 3 | 4
- `gap`: "sm" | "md" | "lg"
- `responsive`: boolean

### Card Components

#### MobileCard
```tsx
import { MobileCard } from "@/components/ui/mobile-card"

<MobileCard variant="elevated" interactive>
  <MobileCardHeader>
    <MobileCardTitle>Card Title</MobileCardTitle>
    <MobileCardDescription>Card description</MobileCardDescription>
  </MobileCardHeader>
  <MobileCardContent>
    {/* Card content */}
  </MobileCardContent>
</MobileCard>
```

**Variants:**
- `default`: Basic card dengan border
- `elevated`: Card dengan shadow yang lebih prominent
- `glass`: Glass morphism effect
- `compact`: Padding yang lebih kecil

### Button Components

#### MobileButton
```tsx
import { MobileButton } from "@/components/ui/mobile-button"

<MobileButton 
  variant="gradient" 
  size="lg" 
  width="full"
  loading={isLoading}
  leftIcon={<Icon />}
>
  Button Text
</MobileButton>
```

**Variants:**
- `default`: Primary button
- `secondary`: Secondary styling
- `outline`: Outline button
- `ghost`: Transparent button
- `destructive`: Danger button
- `success`: Success button
- `gradient`: Gradient background

**Sizes:**
- `sm`: Small button (32px height)
- `default`: Default button (40px height)
- `lg`: Large button (48px height)
- `xl`: Extra large button (56px height)

#### FloatingActionButton
```tsx
import { FloatingActionButton } from "@/components/ui/mobile-button"

<FloatingActionButton 
  position="bottom-right"
  size="lg"
  onClick={handleClick}
>
  <PlusIcon />
</FloatingActionButton>
```

### Typography Components

#### MobileHeading
```tsx
import { MobileHeading } from "@/components/ui/mobile-typography"

<MobileHeading 
  level={1} 
  size="3xl" 
  gradient
  weight="semibold"
>
  Heading Text
</MobileHeading>
```

#### MobileText
```tsx
import { MobileText } from "@/components/ui/mobile-typography"

<MobileText 
  size="lg" 
  color="muted" 
  align="center"
  truncate
>
  Text content
</MobileText>
```

#### MobileBadge
```tsx
import { MobileBadge } from "@/components/ui/mobile-typography"

<MobileBadge variant="success" size="md" rounded>
  Badge Text
</MobileBadge>
```

### Form Components

#### MobileInput
```tsx
import { MobileInput } from "@/components/ui/mobile-input"

<MobileInput
  label="Email"
  type="email"
  placeholder="Enter email"
  error={errors.email}
  leftIcon={<EmailIcon />}
  clearable
  onClear={() => setValue("")}
/>
```

#### MobileSearchInput
```tsx
import { MobileSearchInput } from "@/components/ui/mobile-input"

<MobileSearchInput
  placeholder="Search..."
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  onSearch={handleSearch}
  onClear={() => setSearchValue("")}
/>
```

#### MobileTextarea
```tsx
import { MobileTextarea } from "@/components/ui/mobile-input"

<MobileTextarea
  label="Message"
  placeholder="Enter message"
  rows={4}
  resize={false}
/>
```

### Navigation Components

#### MobileTabs
```tsx
import { 
  MobileTabs, 
  MobileTabsList, 
  MobileTabsTrigger, 
  MobileTabsContent 
} from "@/components/ui/mobile-tabs"

<MobileTabs defaultValue="tab1">
  <MobileTabsList>
    <MobileTabsTrigger value="tab1">Tab 1</MobileTabsTrigger>
    <MobileTabsTrigger value="tab2">Tab 2</MobileTabsTrigger>
  </MobileTabsList>
  <MobileTabsContent value="tab1">
    Content 1
  </MobileTabsContent>
  <MobileTabsContent value="tab2">
    Content 2
  </MobileTabsContent>
</MobileTabs>
```

#### MobileBottomTabs
```tsx
import { 
  MobileBottomTabs, 
  MobileBottomTab 
} from "@/components/ui/mobile-tabs"

<MobileBottomTabs>
  <MobileBottomTab 
    value="home" 
    icon={<HomeIcon />} 
    label="Home"
    badge={3}
  />
  <MobileBottomTab 
    value="search" 
    icon={<SearchIcon />} 
    label="Search"
  />
</MobileBottomTabs>
```

### Modal Components

#### MobileModal
```tsx
import { 
  MobileModal, 
  MobileModalHeader, 
  MobileModalBody, 
  MobileModalFooter 
} from "@/components/ui/mobile-modal"

<MobileModal 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  size="md"
  position="center"
  backdrop="blur"
>
  <MobileModalHeader>
    <h3>Modal Title</h3>
  </MobileModalHeader>
  <MobileModalBody>
    Modal content
  </MobileModalBody>
  <MobileModalFooter>
    <MobileButton onClick={() => setIsOpen(false)}>
      Close
    </MobileButton>
  </MobileModalFooter>
</MobileModal>
```

#### MobileBottomSheet
```tsx
import { MobileBottomSheet } from "@/components/ui/mobile-modal"

<MobileBottomSheet 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
>
  <div className="p-6">
    Bottom sheet content
  </div>
</MobileBottomSheet>
```

### Loading Components

#### MobileLoading
```tsx
import { MobileLoading } from "@/components/ui/mobile-loading"

<MobileLoading 
  size="lg" 
  variant="spinner" 
  text="Loading..."
/>
```

**Variants:**
- `spinner`: Rotating spinner
- `dots`: Animated dots
- `pulse`: Pulsing circle
- `bars`: Animated bars

#### MobileSkeleton
```tsx
import { MobileSkeleton } from "@/components/ui/mobile-loading"

<MobileSkeleton 
  variant="text" 
  lines={3} 
  width="100%" 
  height="20px"
/>
```

#### MobileLoadingOverlay
```tsx
import { MobileLoadingOverlay } from "@/components/ui/mobile-loading"

<MobileLoadingOverlay 
  visible={isLoading} 
  text="Please wait..."
/>
```

### Toast Notifications

#### Setup ToastProvider
```tsx
import { ToastProvider } from "@/components/ui/mobile-toast"

function App() {
  return (
    <ToastProvider maxToasts={5}>
      {/* Your app */}
    </ToastProvider>
  )
}
```

#### Using Toast
```tsx
import { useToastHelpers } from "@/components/ui/mobile-toast"

function Component() {
  const toast = useToastHelpers()
  
  const handleSuccess = () => {
    toast.success("Success!", "Operation completed successfully")
  }
  
  const handleError = () => {
    toast.error("Error!", "Something went wrong")
  }
  
  return (
    <div>
      <MobileButton onClick={handleSuccess}>
        Show Success
      </MobileButton>
      <MobileButton onClick={handleError}>
        Show Error
      </MobileButton>
    </div>
  )
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Google Blue yang muted untuk profesionalitas
- **Secondary**: Abu-abu yang subtle untuk elemen pendukung
- **Accent**: Warna highlight untuk call-to-action
- **Success**: Hijau untuk feedback positif
- **Warning**: Kuning untuk peringatan
- **Destructive**: Merah untuk error dan danger actions

### Typography
- **Font Family**: Google Sans sebagai primary, Inter sebagai fallback
- **Font Weights**: 300 (Light), 400 (Normal), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Line Heights**: Optimized untuk readability di mobile
- **Letter Spacing**: Subtle negative spacing untuk modern look

### Spacing System
- **Base Unit**: 4px (0.25rem)
- **Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **Mobile Optimized**: Lebih compact spacing untuk mobile screens

### Border Radius
- **Small**: 6px untuk elemen kecil
- **Medium**: 8px untuk buttons dan inputs
- **Large**: 12px untuk cards
- **Extra Large**: 16px+ untuk hero elements

## 📱 Mobile Optimizations

### Touch Interactions
- Minimum 44px tap targets sesuai Apple HIG dan Material Design
- Haptic feedback simulation dengan scale transforms
- Touch-friendly spacing antar elemen

### Performance
- CSS transforms untuk animations (hardware accelerated)
- Debounced scroll events
- Lazy loading untuk komponen besar
- Optimized re-renders dengan React.memo dan useMemo

### Accessibility
- Semantic HTML elements
- ARIA labels dan roles
- Keyboard navigation support
- Screen reader announcements
- High contrast mode support

### Responsive Design
- Mobile-first approach
- Fluid typography dengan clamp()
- Flexible grid systems
- Adaptive component sizing

## 🚀 Getting Started

### Installation
Komponen sudah tersedia di project ini. Import sesuai kebutuhan:

```tsx
import { MobileButton } from "@/components/ui/mobile-button"
import { MobileCard } from "@/components/ui/mobile-card"
// ... other components
```

### Basic Usage
```tsx
import { 
  MobileContainer, 
  MobileSection, 
  MobileGrid 
} from "@/components/ui/mobile-layout"
import { MobileCard, MobileCardContent } from "@/components/ui/mobile-card"
import { MobileButton } from "@/components/ui/mobile-button"
import { MobileHeading, MobileText } from "@/components/ui/mobile-typography"

function MyComponent() {
  return (
    <MobileSection spacing="lg">
      <MobileContainer>
        <MobileHeading level={1} size="3xl" gradient>
          Welcome to Mobile UI
        </MobileHeading>
        
        <MobileText size="lg" color="muted" className="mb-8">
          Modern mobile components for better UX
        </MobileText>
        
        <MobileGrid cols={2} gap="md">
          <MobileCard variant="elevated" interactive>
            <MobileCardContent>
              <MobileButton width="full">
                Get Started
              </MobileButton>
            </MobileCardContent>
          </MobileCard>
        </MobileGrid>
      </MobileContainer>
    </MobileSection>
  )
}
```

## 🔧 Customization

### CSS Variables
Komponen menggunakan CSS custom properties yang bisa di-override:

```css
:root {
  --primary: 220 85% 58%;
  --secondary: 220 8% 97%;
  --accent: 220 85% 98%;
  --radius: 0.5rem;
  /* ... other variables */
}
```

### Tailwind Configuration
Extend Tailwind config untuk customization lebih lanjut:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        // ... other colors
      },
      borderRadius: {
        lg: "var(--radius)",
        // ... other radius
      }
    }
  }
}
```

## 📖 Examples

Lihat implementasi lengkap di:
- `/mobile-showcase` - Demo semua komponen
- `client/src/pages/MobileShowcase.tsx` - Source code example
- `client/src/components/ui/mobile-*` - Individual component files

## 🤝 Contributing

Untuk menambah atau memodifikasi komponen:

1. Buat komponen baru di `client/src/components/ui/`
2. Follow naming convention: `mobile-[component-name].tsx`
3. Implement TypeScript interfaces untuk props
4. Add proper accessibility attributes
5. Test di berbagai ukuran layar mobile
6. Update dokumentasi ini

## 📄 License

MIT License - Feel free to use in your projects!

---

**Status: ✅ READY FOR PRODUCTION**

Semua komponen telah ditest dan siap digunakan untuk development aplikasi mobile yang modern dan responsif.