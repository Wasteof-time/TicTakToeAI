Using Node.js 20, Tailwind CSS v3.4.19, and Next.js v16.2.4

Tailwind CSS has been set up with the shadcn theme

Setup complete: /mnt/agents/output/app

Components (40+):
  accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb,
  button-group, button, calendar, card, carousel, chart, checkbox, collapsible,
  command, context-menu, dialog, drawer, dropdown-menu, empty, field, form,
  hover-card, input-group, input-otp, input, item, kbd, label, menubar,
  navigation-menu, pagination, popover, progress, radio-group, resizable,
  scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner,
  spinner, switch, table, tabs, textarea, toggle-group, toggle, tooltip

Usage:
  import { Button } from '@/components/ui/button'
  import { Card, CardHeader, CardTitle } from '@/components/ui/card'

Structure:
  src/app/             Next.js app router entries
  src/screens/         Client screen components used by routes
  src/components/      Shared UI/layout/game components
  src/hooks/           Custom hooks
  src/lib/             Shared utility helpers
  src/store/           Zustand state stores
  src/types/           Type definitions
  src/index.css        Global styles
  tailwind.config.js   Configures Tailwind's theme, plugins, etc.
  next.config.js       Main build and dev server settings for Next.js
  postcss.config.js    Config file for CSS post-processing tools