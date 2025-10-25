// Export all mobile components for easy importing - 2025 Edition
export * from './mobile-button'
export * from './mobile-card'
export * from './mobile-typography'
export * from './mobile-layout'
export * from './mobile-input'
export * from './mobile-tabs'
export * from './mobile-modal'
export * from './mobile-loading'
export * from './mobile-toast'
export * from './mobile-advanced'
export * from './mobile-pwa'
export * from './mobile-gestures'
export * from './mobile-utils'



// Re-export commonly used components with shorter names
export { 
  MobileButton as MBtn,
} from './mobile-button'

export {
  MobileCard as MCard,
  MobileCardHeader as MCardHeader,
  MobileCardContent as MCardContent,
  MobileCardTitle as MCardTitle,
  MobileCardDescription as MCardDescription,
} from './mobile-card'

export {
  MobileHeading as MHeading,
  MobileText as MText,
  MobileBadge as MBadge,
} from './mobile-typography'

export {
  MobileContainer as MContainer,
  MobileSection as MSection,
  MobileGrid as MGrid,
  MobileStack as MStack
} from './mobile-layout'

// Export optimized components
export {
  MobileContainerOptimized as MContainerOpt,
  MobileGridOptimized as MGridOpt,
  MobileIcon as MIcon,
  MobileTextOptimized as MTextOpt,
  MobileSpacer,
  MobileDivider
} from './mobile-utils'