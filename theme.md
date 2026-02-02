# Project Design System & Theme

This document outlines the design tokens, layout structure, and interaction patterns used in the project. Use this guide to replicate the UI and UX in other projects.

## 1. Typography

**Font Family:** `Google Sans`

- **Fallback:** `system-ui, sans-serif`
- **Source:** [Google Fonts](https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap)

**Base Settings:**

- **Base Font Size:** `17px` (Defined on `html` for better legibility)
- **Line Height:** `1.6` (Defined on `body`)

**Heading Scales (Tailwind classes):**

- **H1:** `text-4xl`
- **H2:** `text-2xl`
- **H3:** `text-xl`
- **Body/Paragraph:** `text-base`
- **Small Text:** `text-sm`

## 2. Colors

### Palette Overview (OKLCH variables)

Theme colors are defined using CSS variables in `globals.css`, primarily using the OKLCH color space for modern vibrancy.

| Token | Light Mode Value (Approx) | Dark Mode Value (Approx) | Usage |
| :--- | :--- | :--- | :--- |
| `--background` | `oklch(1 0 0)` (White) | `oklch(0.145 0 0)` (Dark Gray) | Page background |
| `--foreground` | `oklch(0.145 0 0)` (Dark Gray) | `oklch(0.985 0 0)` (White) | Primary text color |
| `--primary` | `oklch(0.205 0 0)` (Deep Gray) | `oklch(0.922 0 0)` (Light Gray) | Primary actions/buttons |
| `--muted` | `oklch(0.97 0 0)` (Off White) | `oklch(0.269 0 0)` | Secondary backgrounds |
| `--border` | `oklch(0.922 0 0)` (Light Gray) | `oklch(1 0 0 / 10%)` | Borders |

### Specific Component Colors

**Sidebar (Hardcoded & Tokenized):**

- **Background:** `#FAFAFA` (Light mode override in component) or `var(--sidebar)`
- **Border:** `#E7E7E9` or `var(--sidebar-border)`
- **Active Item Background:** `#EFEFF0`
- **Active Item Text:** `#1C1C1D`
- **Inactive Item Text:** `#5B5B65`
- **Hover Interaction:** Text changes to `#1C1C1D`

## 3. Layout Structure

### Global Layout

The application uses a fixed sidebar layout with a fluid main content area.

**Sidebar:**

- **Width:** `w-64` (256px) fixed.
- **Position:** `fixed inset-y-0 z-30` (Stays in place on scroll).
- **Mobile:** Hidden on mobile (`hidden md:block`), accessible via Drawer/Sheet.

**Header:**

- **Height:** `h-14` (56px).
- **Position:** `sticky top-0 z-50`.
- **Effect:** Background blur (`bg-background/95 backdrop-blur`).

**Main Content:**

- **Container:** `flex-1` width with `md:pl-64` (padding-left matching sidebar width).
- **Structure:** `flex flex-col min-h-screen`.

### Z-Index Layers

- **Sidebar:** `z-30`
- **Header:** `z-50`
- **Modals/Sheets:** `z-50`+ (handled by Radix primitives)
- **Feedback Widget (Ruttl):** `z-999999`

## 4. Icons

**Library:** [`lucide-react`](https://lucide.dev/)

**Standard Sizes:**

- **Sidebar Icons:** `h-4 w-4` (16px)
- **Action Icons (Header/Buttons):** `h-5 w-5` (20px)

**Used Icons:**

- `LayoutDashboard`, `Briefcase`, `Users`, `MessageSquare`, `Settings`, `PlusCircle`, `UsersRound`, `BarChart3`, `Menu`, `Bell`, `RotateCcw`.

## 5. UI Elements

### Radius

- **Base Radius:** `0.625rem` (10px) - Defined as `--radius`.
- **Buttons/Inputs:** Uses `rounded-md` (usually maps to radius - 2px).
- **Cards/Containers:** Uses `rounded-lg` or `rounded-xl`.

### Buttons

- **Primary:** Solid background (Primary color), white text.
- **Ghost:** Transparent background, hover effect only. Used for navigation and tertiary actions.
- **Sizes:** Standard height `h-9` or `h-10`.

### Glassmorphism

Used primarily in the sticky header:

```css
bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
```

## 6. Implementation Notes

- **Tailwind Config:** The project uses `@theme inline` in `globals.css` (Tailwind v4 style) coupled with CSS variables for dynamic theming.
- **Reset:** Standard Tailwind reset applies.
- **Dark Mode:** Supported via `.dark` class strategies, changing CSS variable values.
