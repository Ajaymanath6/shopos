# Section Orbs Backup Code

This file contains the backup code for all section orbs that were temporarily removed. The orbs can be restored by adding this code back to the respective files.

## State Variables (AiShoppingPage.tsx)

```jsx
// Individual section orbs for inline positioning
const [showDescriptionOrb, setShowDescriptionOrb] = useState(false)
const [descriptionOrbExpanded, setDescriptionOrbExpanded] = useState(false)
const descriptionHoverTimeout = useRef<number | null>(null)

const [showHighlightsOrb, setShowHighlightsOrb] = useState(false)
const [highlightsOrbExpanded, setHighlightsOrbExpanded] = useState(false)
const highlightsHoverTimeout = useRef<number | null>(null)

const [showPricingOrb, setShowPricingOrb] = useState(false)
const pricingHoverTimeout = useRef<number | null>(null)

const [showOptionsOrb, setShowOptionsOrb] = useState(false)
const optionsHoverTimeout = useRef<number | null>(null)

const [showCartOrb, setShowCartOrb] = useState(false)
const cartHoverTimeout = useRef<number | null>(null)

const [showTrustOrb, setShowTrustOrb] = useState(false)
const trustHoverTimeout = useRef<number | null>(null)
```

## Handler Functions

```jsx
// Create handlers for each section
const descriptionHandlers = createSectionHandlers(setShowDescriptionOrb, descriptionHoverTimeout, descriptionOrbExpanded)
const highlightsHandlers = createSectionHandlers(setShowHighlightsOrb, highlightsHoverTimeout, highlightsOrbExpanded)
const pricingHandlers = createSectionHandlers(setShowPricingOrb, pricingHoverTimeout, false)
const optionsHandlers = createSectionHandlers(setShowOptionsOrb, optionsHoverTimeout, false)
const cartHandlers = createSectionHandlers(setShowCartOrb, cartHoverTimeout, false)
const trustHandlers = createSectionHandlers(setShowTrustOrb, trustHoverTimeout, false)
```

## Section Orb JSX Code

### Description Section
```jsx
{/* Inline Description Orb - positioned as overlay */}
{showDescriptionOrb && (
  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-1" style={{zIndex: 50}}>
    <SmartSuggestOrb 
      isVisible={showDescriptionOrb}
      onClose={() => {
        setShowDescriptionOrb(false)
        setDescriptionOrbExpanded(false)
        if (descriptionHoverTimeout.current) {
          clearTimeout(descriptionHoverTimeout.current)
          descriptionHoverTimeout.current = null
        }
      }}
      onExpanded={setDescriptionOrbExpanded}
      userLocation="Kerala"
      productCategory="tea"
      isOnProduct={true}
      mode="agent"
      showTooltipImmediately={true}
      customMessage="Tea brewing help!"
    />
  </div>
)}
```

### Product Highlights Section
```jsx
{/* Inline Product Highlights Orb - positioned as overlay */}
{showHighlightsOrb && (
  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-1" style={{zIndex: 50}}>
    <SmartSuggestOrb 
      isVisible={showHighlightsOrb}
      onClose={() => {
        setShowHighlightsOrb(false)
        setHighlightsOrbExpanded(false)
        if (highlightsHoverTimeout.current) {
          clearTimeout(highlightsHoverTimeout.current)
          highlightsHoverTimeout.current = null
        }
      }}
      onExpanded={setHighlightsOrbExpanded}
      userLocation="Kerala"
      productCategory="tea"
      isOnProduct={true}
      mode="agent"
      showTooltipImmediately={true}
      customMessage="Compare features!"
    />
  </div>
)}
```

### Pricing Section
```jsx
{/* Inline Pricing Orb - positioned as overlay */}
{showPricingOrb && (
  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-1" style={{zIndex: 50}}>
    <SmartSuggestOrb 
      isVisible={showPricingOrb}
      onClose={() => {
        setShowPricingOrb(false)
        if (pricingHoverTimeout.current) {
          clearTimeout(pricingHoverTimeout.current)
          pricingHoverTimeout.current = null
        }
      }}
      onExpanded={() => {}}
      userLocation="Kerala"
      productCategory="tea"
      isOnProduct={true}
      mode="agent"
      showTooltipImmediately={true}
      customMessage="Price comparison help!"
    />
  </div>
)}
```

### Options Section
```jsx
{/* Inline Options Orb - positioned as overlay */}
{showOptionsOrb && (
  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-1" style={{zIndex: 50}}>
    <SmartSuggestOrb 
      isVisible={showOptionsOrb}
      onClose={() => {
        setShowOptionsOrb(false)
        if (optionsHoverTimeout.current) {
          clearTimeout(optionsHoverTimeout.current)
          optionsHoverTimeout.current = null
        }
      }}
      onExpanded={() => {}}
      userLocation="Kerala"
      productCategory="tea"
      isOnProduct={true}
      mode="agent"
      showTooltipImmediately={true}
      customMessage="Size selection help!"
    />
  </div>
)}
```

### Cart Section
```jsx
{/* Inline Cart Orb - positioned as overlay */}
{showCartOrb && (
  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-1" style={{zIndex: 50}}>
    <SmartSuggestOrb 
      isVisible={showCartOrb}
      onClose={() => {
        setShowCartOrb(false)
        if (cartHoverTimeout.current) {
          clearTimeout(cartHoverTimeout.current)
          cartHoverTimeout.current = null
        }
      }}
      onExpanded={() => {}}
      userLocation="Kerala"
      productCategory="tea"
      isOnProduct={true}
      mode="agent"
      showTooltipImmediately={true}
      customMessage="Purchase assistance!"
    />
  </div>
)}
```

### Trust Section
```jsx
{/* Inline Trust Orb - positioned as overlay */}
{showTrustOrb && (
  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-1" style={{zIndex: 50}}>
    <SmartSuggestOrb 
      isVisible={showTrustOrb}
      onClose={() => {
        setShowTrustOrb(false)
        if (trustHoverTimeout.current) {
          clearTimeout(trustHoverTimeout.current)
          trustHoverTimeout.current = null
        }
      }}
      onExpanded={() => {}}
      userLocation="Kerala"
      productCategory="tea"
      isOnProduct={true}
      mode="agent"
      showTooltipImmediately={true}
      customMessage="Policy questions?"
    />
  </div>
)}
```

## Section Container Props

Each section container needs these props:
```jsx
{...sectionHandlers}
```

Where `sectionHandlers` corresponds to:
- `descriptionHandlers` for Description section
- `highlightsHandlers` for Product Highlights section  
- `pricingHandlers` for Pricing section
- `optionsHandlers` for Options section
- `cartHandlers` for Cart section
- `trustHandlers` for Trust section

## Cleanup useEffect

```jsx
useEffect(() => {
  return () => {
    if (descriptionHoverTimeout.current) {
      clearTimeout(descriptionHoverTimeout.current)
    }
    if (highlightsHoverTimeout.current) {
      clearTimeout(highlightsHoverTimeout.current)
    }
    if (pricingHoverTimeout.current) {
      clearTimeout(pricingHoverTimeout.current)
    }
    if (optionsHoverTimeout.current) {
      clearTimeout(optionsHoverTimeout.current)
    }
    if (cartHoverTimeout.current) {
      clearTimeout(cartHoverTimeout.current)
    }
    if (trustHoverTimeout.current) {
      clearTimeout(trustHoverTimeout.current)
    }
  }
}, [])
```

## Activity Handler Updates

In the `handleActivity` function, these orbs need to be included:

```jsx
const anyOrbActive = showOrb || showDescriptionOrb || showHighlightsOrb || 
                    showPricingOrb || showOptionsOrb || showCartOrb || showTrustOrb
```

## Notes

- All section orbs use `mode="agent"` and `isOnProduct={true}`
- Each orb has custom messages (max 4 words as per user requirements)
- Orbs are positioned as absolute overlays to not affect section layout
- Tooltips are responsive and positioned to prevent viewport overflow
- 1-second delay before orbs appear on hover
- Only one orb visible at a time
