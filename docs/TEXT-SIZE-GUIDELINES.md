# Panduan Ukuran Text dan Elemen - Konsistensi UI

## Overview
Dokumen ini menjelaskan sistem ukuran text dan elemen yang konsisten untuk semua halaman website.

## Sistem Ukuran Text

### 1. Hero Sections
```tsx
// Judul utama hero
className="text-hero-title"
// Subtitle hero
className="text-hero-subtitle"
```

### 2. Section Headers
```tsx
// Judul section
className="text-section-title"
// Subtitle section
className="text-section-subtitle"
```

### 3. Card Components
```tsx
// Judul card
className="text-card-title"
// Deskripsi card
className="text-card-description"
```

### 4. Responsive Text Utilities
```tsx
// Extra small text
className="text-responsive-xs"    // text-xs sm:text-sm

// Small text
className="text-responsive-sm"    // text-sm sm:text-base

// Base text
className="text-responsive-base"  // text-base sm:text-lg

// Large text
className="text-responsive-lg"    // text-lg sm:text-xl md:text-2xl

// Extra large text
className="text-responsive-xl"    // text-xl sm:text-2xl md:text-3xl

// 2X large text
className="text-responsive-2xl"   // text-2xl sm:text-3xl md:text-4xl

// 3X large text
className="text-responsive-3xl"   // text-3xl sm:text-4xl md:text-5xl

// 4X large text
className="text-responsive-4xl"   // text-4xl sm:text-5xl md:text-6xl
```

## Sistem Ukuran Button

### Button Sizes
```tsx
// Small button
<Button size="sm">Text</Button>     // min-h-8 px-3 py-1.5 text-responsive-xs

// Default button
<Button size="default">Text</Button> // min-h-10 px-4 py-2 text-responsive-sm

// Large button
<Button size="lg">Text</Button>     // min-h-12 px-6 py-3 text-responsive-base

// Extra large button
<Button size="xl">Text</Button>     // min-h-14 px-8 py-4 text-responsive-lg

// Icon button
<Button size="icon">Icon</Button>   // h-10 w-10
```

## Sistem Spacing

### Responsive Padding
```tsx
className="p-responsive-xs"    // p-2 sm:p-3 md:p-4
className="p-responsive-sm"    // p-3 sm:p-4 md:p-6
className="p-responsive-md"    // p-4 sm:p-6 md:p-8
className="p-responsive-lg"    // p-6 sm:p-8 md:p-10
className="p-responsive-xl"    // p-8 sm:p-10 md:p-12
```

### Responsive Margin
```tsx
className="m-responsive-xs"    // m-2 sm:m-3 md:m-4
className="m-responsive-sm"    // m-3 sm:m-4 md:m-6
className="m-responsive-md"    // m-4 sm:m-6 md:m-8
className="m-responsive-lg"    // m-6 sm:m-8 md:m-10
```

### Responsive Gap
```tsx
className="gap-mobile-xs"      // gap-2 sm:gap-3 md:gap-4
className="gap-mobile-sm"      // gap-3 sm:gap-4 md:gap-6
className="gap-mobile-md"      // gap-4 sm:gap-6 md:gap-8
className="gap-mobile-lg"      // gap-6 sm:gap-8 md:gap-10
```

## Sistem Icon

### Icon Sizes
```tsx
// Extra small icons
className="w-4 h-4 sm:w-5 sm:h-5"

// Small icons
className="w-5 h-5 sm:w-6 sm:h-6"

// Medium icons
className="w-6 h-6 sm:w-7 sm:h-7"

// Large icons
className="w-7 h-7 sm:w-8 sm:h-8"
```

## Contoh Implementasi

### Hero Section
```tsx
<section className="py-20 lg:py-32">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <div className="inline-flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-responsive-sm font-semibold mb-10 shadow-xl">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        Badge Text
      </div>
      
      <h1 className="text-hero-title font-bold mb-10">
        Hero Title
      </h1>
      
      <p className="text-hero-subtitle text-gray-700 max-w-5xl mx-auto">
        Hero subtitle description
      </p>
    </div>
  </div>
</section>
```

### Feature Card
```tsx
<Card className="p-responsive-md">
  <div className="inline-flex p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6">
    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
  </div>
  
  <h3 className="text-card-title font-bold mb-4">
    Feature Title
  </h3>
  
  <p className="text-card-description text-gray-600">
    Feature description
  </p>
</Card>
```

### Section Header
```tsx
<div className="text-center mb-16 sm:mb-20">
  <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-responsive-xs font-medium mb-8 shadow-xl">
    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
    Section Badge
  </div>
  
  <h2 className="text-section-title font-bold mb-8">
    Section Title
  </h2>
  
  <p className="text-section-subtitle text-gray-700 max-w-4xl mx-auto">
    Section subtitle
  </p>
</div>
```

## Best Practices

1. **Konsistensi**: Selalu gunakan utility classes yang telah didefinisikan
2. **Mobile First**: Semua ukuran dimulai dari mobile dan scale up
3. **Readability**: Pastikan text tetap readable di semua ukuran layar
4. **Hierarchy**: Gunakan hierarchy yang jelas untuk heading dan text
5. **Spacing**: Gunakan spacing yang konsisten untuk visual harmony

## Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 768px (md)
- **Desktop**: 768px - 1024px (lg)
- **Large Desktop**: > 1024px (xl)

## Testing

Pastikan untuk test di semua breakpoint:
1. Mobile (375px, 414px)
2. Tablet (768px, 1024px)
3. Desktop (1280px, 1440px)
4. Large Desktop (1920px+)