# Zachary Reece Personal Website Redesign

## Design Direction

### Working Title

**Philosophical Systems Brutalism**

Alternative descriptors:

- Editorial Techno-Organic Minimalism
- Warm Brutalist Systems Design
- Digital Field Notebook / Lab Archive
- Industrial-Natural Personal Brand System

This redesign should move the site away from generic neon-gradient developer-portfolio aesthetics and toward a handcrafted, intentional, editorial, systems-oriented identity. The goal is for the site to feel like a personal artifact: part portfolio, part intellectual archive, part field notebook, part systems diagram.

The site should not feel like a SaaS landing page, crypto site, AI startup template, or generic developer portfolio. It should feel authored by a specific person with a strong visual and intellectual identity.

---

## Core Identity

The website should represent the following synthesis:

> A disciplined technologist, philosophical systems thinker, physical practitioner, educator, and builder of intelligent learning systems.

The design should communicate:

- Technical depth
- Philosophical seriousness
- Product engineering maturity
- Handcrafted attention to detail
- Physical discipline and embodied practice
- Education and learning as a lifelong throughline
- Systems thinking, abstraction, and geometric order
- Warm human individuality rather than sterile corporate polish

The visual design should feel:

- Industrial
- Editorial
- Geometric
- Tactile
- Precise
- Warm
- Slightly brutalist
- Intellectually serious
- Hand-crafted rather than generated

---

## Problems With the Current Design

The current site uses a blue/purple neon gradient language that feels overly familiar and generic. It has good baseline execution but lacks specificity. It resembles many modern developer/AI portfolio templates.

Current issues:

- Blue/purple gradient feels clichéd and overused.
- Glowing borders and neon accents feel like default “AI/cyberpunk” styling.
- Cards feel like generic collapsible SaaS UI components.
- The site communicates competence but not depth or originality.
- Section taxonomy feels too literal: Professional, Education, Hobbies.
- Visual hierarchy relies too much on color effects rather than material, typography, and composition.
- The page does not yet feel like a crafted personal artifact.

The redesign should replace “effects” with “materials.”

Move away from:

- Neon gradients
- Generic dark-mode purple/blue
- Glow-heavy UI
- SaaS rectangles
- Default MUI smoothness
- “Portfolio template” structure

Move toward:

- Warm ink backgrounds
- Stone/paper/concrete texture
- Muted accent colors
- Fine construction lines
- Editorial spacing
- Geometric composition
- Diagrammatic motion
- Typographic hierarchy
- Artifact-like components

---

## Visual Inspiration

The strongest existing reference is the newest resume design.

Important qualities from the resume to transfer into the website:

- Muted grayscale base
- Diagrammatic/geometric composition
- Central symbolic graphic language
- Thin line work
- Editorial layout
- Balanced asymmetry
- Dense but carefully aligned information
- Artifact-like intentionality
- Minimal color dependence
- Personal brand rather than traditional resume

The website should not simply copy the resume visually, but it should feel like the same person designed both.

---

## Design Principles

### 1. Designed Artifact, Not Website Template

Every page should feel hand-composed. Avoid layouts that look like generated Tailwind/MUI boilerplate. Prefer spatial decisions that feel intentionally arranged.

Implementation guidance:

- Use a strong max-width content frame.
- Use asymmetrical but balanced grids.
- Use repeated line motifs and geometric anchors.
- Use section headers that feel like labels in a field notebook or technical diagram.
- Avoid generic dashboard spacing.

### 2. Material Over Effects

Use subtle texture and material cues instead of gradients and glows.

Acceptable materials:

- Warm paper grain
- Charcoal ink
- Smoked glass only if very subtle
- Concrete/stone texture
- Fine noise overlays
- Slightly metallic muted linework

Avoid:

- Large saturated gradients
- Heavy neon shadows
- Rainbow borders
- Excessive blur
- Glossy SaaS surfaces

### 3. Typography as Primary Identity

The redesign should lean heavily on typography. Headings should carry authority. Body copy should feel editorial and readable.

Preferred type direction:

- Headings: geometric, architectural sans-serif
- Body: readable humanist sans or restrained serif/sans pairing
- Code/metadata: mono, small caps, technical label style

Recommended font pairings:

Option A — safer web fonts:

- Headings: `Inter Tight`, `Sora`, or `Space Grotesk`
- Body: `Inter`, `IBM Plex Sans`, or `Source Sans 3`
- Mono: `IBM Plex Mono`, `JetBrains Mono`, or `Geist Mono`

Option B — more editorial:

- Headings: `Space Grotesk`
- Body: `IBM Plex Sans`
- Mono: `IBM Plex Mono`

Default recommendation:

- `Space Grotesk` for headings
- `IBM Plex Sans` for body
- `IBM Plex Mono` for metadata, labels, tags, code-like UI

### 4. Geometry Should Mean Something

Geometric elements should not be random decoration. They should imply systems, structure, knowledge graphs, diagrams, paths, orbitals, or construction lines.

Use:

- Thin lines
- Nodes and edges
- Topographic contours
- Axis lines
- Small glyphs
- Diagrams
- Crosshair markers
- Angular polygons
- Minimal coordinate-grid motifs

Avoid:

- Random blobs
- Unmotivated abstract squiggles
- Decorative gradients
- Generic cyber circles

### 5. Warm Brutalism

The site can be dark and structured, but it should not be cold. Use warm off-blacks, stone grays, muted rusts, ochres, moss, and bone tones.

The emotional temperature should be:

- Serious, but not sterile
- Masculine, but not aggressive
- Intellectual, but not academic-dead
- Artistic, but not decorative
- Modern, but not trendy

---

## Color System

### Palette Concept

Replace the current blue/purple neon palette with a warm industrial-natural palette.

Primary base colors:

- Charcoal ink
- Warm black
- Smoked graphite
- Bone / paper
- Stone gray

Accent colors:

- Ember rust
- Aged brass
- Muted moss
- Oxide red
- Soft clay
- Desaturated teal only as a very restrained technical accent

### CSS Variables

```css
:root {
  --zr-ink-950: #0f0f0d;
  --zr-ink-900: #151512;
  --zr-ink-850: #1b1a17;
  --zr-ink-800: #22211d;
  --zr-graphite-700: #34332e;
  --zr-stone-600: #555249;
  --zr-stone-500: #746f63;
  --zr-stone-400: #9a9384;
  --zr-bone-300: #c9c0ad;
  --zr-bone-200: #ded5c3;
  --zr-bone-100: #eee5d2;

  --zr-ember-500: #b85f3f;
  --zr-ember-400: #d07951;
  --zr-brass-500: #b49a63;
  --zr-brass-400: #c9ad71;
  --zr-moss-500: #77815f;
  --zr-moss-400: #929b73;
  --zr-oxide-500: #8d3f32;
  --zr-clay-500: #a86f53;
  --zr-teal-500: #4f8f8b;

  --zr-line-muted: rgba(238, 229, 210, 0.16);
  --zr-line-strong: rgba(238, 229, 210, 0.32);
  --zr-surface-wash: rgba(238, 229, 210, 0.045);
  --zr-surface-raised: rgba(238, 229, 210, 0.075);
}
```

### Color Usage Rules

- Background should be warm black / charcoal, not pure black.
- Body text should be bone/paper, not white.
- Secondary text should be stone gray/bone muted.
- Borders should be low-contrast warm lines.
- Accent colors should be sparse and meaningful.
- Ember/brass should replace the current blue/purple as the main identity accents.
- Teal should only be used as a restrained “technical signal” color, never as the dominant palette.

---

## Texture System

The app should use subtle global texture to create a handcrafted/material feel.

### Global Background

Layered background recommendation:

1. Base warm black.
2. Radial vignette from top center or upper left.
3. Very subtle paper/noise grain.
4. Optional faint construction-grid lines.

Example CSS:

```css
body {
  background:
    radial-gradient(circle at 50% 0%, rgba(180, 154, 99, 0.12), transparent 34rem),
    radial-gradient(circle at 85% 18%, rgba(184, 95, 63, 0.08), transparent 28rem),
    linear-gradient(180deg, #151512 0%, #0f0f0d 100%);
  color: #eee5d2;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  background-image:
    linear-gradient(rgba(238, 229, 210, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(238, 229, 210, 0.035) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(circle at center, black, transparent 72%);
}

body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.18;
  background-image: url("/textures/noise.png");
  mix-blend-mode: overlay;
}
```

If no image texture is available, create noise with CSS radial gradients or add a tiny generated base64 SVG noise texture.

---

## Layout System

### Overall Page Layout

The homepage should feel less like a stacked mobile app and more like an editorial personal index.

Recommended desktop structure:

- Top identity block with portrait, name, title fragments, and thesis statement.
- Main content organized as a two-column or asymmetric grid.
- A central/side geometric motif may anchor the first viewport.
- Sections should be named conceptually rather than generically.

Possible layout:

```text
┌───────────────────────────────────────────────┐
│ Header / Navigation                           │
├───────────────────────────────────────────────┤
│ Portrait + Identity     │ Thesis / Manifesto  │
│                         │ Tags / Coordinates  │
├─────────────────────────┴─────────────────────┤
│ Systems / Work       Research / Writing       │
│ Practice / Discipline  Archive / Field Notes  │
└───────────────────────────────────────────────┘
```

### Content Width

- Max content width: `1120px` to `1240px`
- Article/body width: `680px` to `760px`
- Use generous vertical rhythm.
- Avoid every component spanning the full width.

### Responsive Behavior

- Desktop: asymmetric grid.
- Tablet: two columns collapse gracefully.
- Mobile: single column, but maintain artifact feel through borders, labels, and type hierarchy.

---

## Section Taxonomy

Replace generic categories with more personally expressive ones.

Current:

- Professional
- Education
- Hobbies

Recommended:

### Primary Navigation

- **Work**
- **Writing**
- **Research**
- **Systems**
- **Practice**
- **Archive**

### Homepage Groupings

#### Systems Built

For professional work, software projects, AI tools, dev artifacts.

Includes:

- Projects
- GitHub
- Professional background
- Product engineering
- AI systems

#### Field Notes

For blog posts, essays, reflections, learning notes.

Includes:

- Aberrant Quiddity
- philosophical essays
- technical reflections
- research notes

#### Learning / Transmission

For courses, teaching, education, Flint, Udemy.

Includes:

- Courses
- education story
- talks
- React conference speaking

#### Disciplines

For embodied practice and personal interests.

Includes:

- Judo
- Brazilian Jiu-jitsu
- Hiking
- Travel
- Music festivals
- Comedy
- AI art

#### Research Threads

For long-running conceptual areas.

Includes:

- Multidimensional Computationalism
- FAKT++
- knowledge tracing
- learning systems
- AI + education

### Tone of Labels

Labels should feel like catalog/index labels. Use short, meaningful nouns.

Examples:

- Constructs
- Field Notes
- Disciplines
- Systems
- Expeditions
- Archives
- Transmission
- Research Threads
- Practices
- Instruments

---

## Component Design

### Cards

Cards should feel like index cards, field-note entries, lab drawers, or labeled artifacts.

Avoid generic rounded glowing cards.

Card style:

- Border: 1px solid warm muted line
- Background: transparent or subtle wash
- Border radius: modest, not pill-like
- Padding: comfortable but not bloated
- Hover: slight translate, border-color shift, subtle brass/ember line
- No neon glow
- Optional top/left rule line

Recommended card radius:

- `0px`, `2px`, `4px`, or `8px`
- Avoid `16px+` unless intentionally softening a specific object like the portrait

### Buttons

Buttons should feel like technical controls or printed labels.

Primary button:

- Bone text
- Ember/brass border
- Transparent or surface wash background
- Uppercase or small label style
- Mono font optional

Hover:

- Background becomes slightly warmer
- Border brightens
- Small mechanical movement, not bounce

### Tags / Chips

Current pills should be replaced with capsule-like labels or thin outlined tabs.

Style:

- Small uppercase mono
- Thin border
- Muted brass/stone/ember colors
- Minimal fill
- No gradient

Example tags:

- SOFTWARE ENGINEER
- MARTIAL ARTIST
- PHILOSOPHER
- PRODUCT BUILDER
- SYSTEMS THINKER

### Accordions

Accordions should feel like expandable archive drawers.

Style:

- Header row with thin top/bottom rules
- Small icon/glyph on left
- Chevron on right
- No heavy filled rounded block
- Expanded content should reveal cards in a grid or list

### Links

Links should use underlines or small glyphs, not neon color.

Style:

- Text color: bone
- Underline: brass or ember
- Hover: underline offset grows, color warms

### Portrait

The portrait can remain circular, but the border should change.

Avoid the blue/purple gradient ring.

New options:

1. Double-line brass/stone ring.
2. Cropped square/arched frame with thin construction lines.
3. Circle with offset geometric frame behind it.

Recommended:

- Use a circular portrait but with a double border:
  - inner: muted bone
  - outer: brass/stone
- Add a small coordinate/crosshair marker or registration mark near the portrait.

---

## Motion System

Motion should feel mechanical, diagrammatic, and restrained.

Use:

- Fade + slight upward reveal
- Clip-path reveals
- Line drawing animations
- Small mechanical accordion expansion
- Hover translate of 1–3px
- Slow parallax for background geometry only if subtle

Avoid:

- Bouncy motion
- Large scale transforms
- Excessive floating
- Glow pulses
- Particle effects

Motion duration:

- Fast interactions: 120–180ms
- Section reveals: 300–500ms
- Background diagram motion: very slow, 20s+

Easing:

```ts
const easing = 'cubic-bezier(0.2, 0, 0, 1)';
```

---

## Copywriting Direction

The site copy should be confident, precise, and reflective.

Avoid generic profile phrasing like:

- “I am passionate about...”
- “Welcome to my portfolio”
- “Full-stack developer building modern apps”

Use language like:

- “I build tools for learning, thought, and human capability.”
- “Software engineer by trade. Martial artist by choice. Philosopher by nature.”
- “This site is an index of systems built, disciplines practiced, and ideas under construction.”

Recommended homepage thesis:

> I build software systems at the intersection of learning, intelligence, and human capability. My work spans product engineering, AI tools, educational platforms, technical writing, and long-running philosophical research into computation, cognition, and reality.

---

## MUI Theme Implementation

Create a new theme file, for example:

`src/theme/zacharyTheme.ts`

or

`src/styles/theme.ts`

This theme is intended as a drop-in replacement for the existing MUI theme. It recolors and reshapes the app toward warm brutalist editorial design.

### Complete Drop-In MUI Theme

```ts
import { createTheme, alpha } from '@mui/material/styles';

const ink = {
  950: '#0f0f0d',
  900: '#151512',
  850: '#1b1a17',
  800: '#22211d',
};

const stone = {
  700: '#34332e',
  600: '#555249',
  500: '#746f63',
  400: '#9a9384',
};

const bone = {
  300: '#c9c0ad',
  200: '#ded5c3',
  100: '#eee5d2',
};

const accent = {
  ember: '#b85f3f',
  emberLight: '#d07951',
  brass: '#b49a63',
  brassLight: '#c9ad71',
  moss: '#77815f',
  mossLight: '#929b73',
  oxide: '#8d3f32',
  clay: '#a86f53',
  teal: '#4f8f8b',
};

const easing = 'cubic-bezier(0.2, 0, 0, 1)';

export const zacharyTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: ink[950],
      paper: ink[850],
    },
    primary: {
      main: accent.brass,
      light: accent.brassLight,
      dark: '#7f6b43',
      contrastText: ink[950],
    },
    secondary: {
      main: accent.ember,
      light: accent.emberLight,
      dark: accent.oxide,
      contrastText: bone[100],
    },
    success: {
      main: accent.moss,
      light: accent.mossLight,
      dark: '#545b43',
      contrastText: bone[100],
    },
    info: {
      main: accent.teal,
      light: '#77aaa7',
      dark: '#355f5c',
      contrastText: bone[100],
    },
    warning: {
      main: accent.brassLight,
      light: '#d8bf86',
      dark: '#8f7745',
      contrastText: ink[950],
    },
    error: {
      main: accent.oxide,
      light: '#a95547',
      dark: '#642d25',
      contrastText: bone[100],
    },
    text: {
      primary: bone[100],
      secondary: alpha(bone[200], 0.72),
      disabled: alpha(bone[200], 0.36),
    },
    divider: alpha(bone[100], 0.16),
    action: {
      active: bone[200],
      hover: alpha(bone[100], 0.06),
      selected: alpha(accent.brass, 0.14),
      disabled: alpha(bone[100], 0.28),
      disabledBackground: alpha(bone[100], 0.08),
      focus: alpha(accent.brass, 0.24),
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  typography: {
    fontFamily: [
      'IBM Plex Sans',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: ['Space Grotesk', 'IBM Plex Sans', 'sans-serif'].join(','),
      fontWeight: 500,
      letterSpacing: '-0.055em',
      lineHeight: 0.94,
      fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
    },
    h2: {
      fontFamily: ['Space Grotesk', 'IBM Plex Sans', 'sans-serif'].join(','),
      fontWeight: 500,
      letterSpacing: '-0.045em',
      lineHeight: 1,
      fontSize: 'clamp(2.4rem, 5.4vw, 5rem)',
    },
    h3: {
      fontFamily: ['Space Grotesk', 'IBM Plex Sans', 'sans-serif'].join(','),
      fontWeight: 500,
      letterSpacing: '-0.035em',
      lineHeight: 1.05,
      fontSize: 'clamp(1.9rem, 3.4vw, 3.25rem)',
    },
    h4: {
      fontFamily: ['Space Grotesk', 'IBM Plex Sans', 'sans-serif'].join(','),
      fontWeight: 500,
      letterSpacing: '-0.026em',
      lineHeight: 1.12,
      fontSize: 'clamp(1.45rem, 2.2vw, 2.25rem)',
    },
    h5: {
      fontFamily: ['Space Grotesk', 'IBM Plex Sans', 'sans-serif'].join(','),
      fontWeight: 600,
      letterSpacing: '-0.018em',
      lineHeight: 1.2,
      fontSize: '1.25rem',
    },
    h6: {
      fontFamily: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'].join(','),
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.095em',
      lineHeight: 1.35,
      fontSize: '0.76rem',
    },
    subtitle1: {
      color: alpha(bone[200], 0.82),
      lineHeight: 1.55,
      fontSize: '1.05rem',
    },
    subtitle2: {
      fontFamily: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'].join(','),
      color: alpha(bone[200], 0.68),
      lineHeight: 1.45,
      fontSize: '0.78rem',
      letterSpacing: '0.035em',
    },
    body1: {
      lineHeight: 1.72,
      fontSize: '1rem',
      color: alpha(bone[100], 0.9),
    },
    body2: {
      lineHeight: 1.65,
      fontSize: '0.9rem',
      color: alpha(bone[200], 0.72),
    },
    button: {
      fontFamily: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'].join(','),
      fontWeight: 600,
      letterSpacing: '0.075em',
      textTransform: 'uppercase',
      fontSize: '0.72rem',
    },
    caption: {
      fontFamily: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'].join(','),
      color: alpha(bone[200], 0.58),
      letterSpacing: '0.055em',
      lineHeight: 1.45,
      fontSize: '0.72rem',
    },
    overline: {
      fontFamily: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'].join(','),
      color: accent.brass,
      letterSpacing: '0.14em',
      lineHeight: 1.5,
      fontSize: '0.7rem',
      fontWeight: 600,
    },
  },
  shadows: [
    'none',
    '0 1px 0 rgba(238, 229, 210, 0.06)',
    '0 10px 30px rgba(0, 0, 0, 0.22)',
    '0 14px 42px rgba(0, 0, 0, 0.26)',
    '0 18px 58px rgba(0, 0, 0, 0.30)',
    ...Array(20).fill('0 18px 58px rgba(0, 0, 0, 0.30)'),
  ] as any,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          backgroundColor: ink[950],
          scrollBehavior: 'smooth',
        },
        body: {
          minHeight: '100vh',
          backgroundColor: ink[950],
          backgroundImage: [
            `radial-gradient(circle at 50% 0%, ${alpha(accent.brass, 0.12)}, transparent 34rem)`,
            `radial-gradient(circle at 88% 18%, ${alpha(accent.ember, 0.08)}, transparent 28rem)`,
            `linear-gradient(180deg, ${ink[900]} 0%, ${ink[950]} 100%)`,
          ].join(','),
          color: bone[100],
          textRendering: 'geometricPrecision',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        'body::before': {
          content: '""',
          position: 'fixed',
          inset: 0,
          zIndex: -2,
          pointerEvents: 'none',
          opacity: 0.34,
          backgroundImage: [
            `linear-gradient(${alpha(bone[100], 0.035)} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${alpha(bone[100], 0.035)} 1px, transparent 1px)`,
          ].join(','),
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(circle at center, black, transparent 72%)',
        },
        'body::after': {
          content: '""',
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          opacity: 0.22,
          backgroundImage: [
            `radial-gradient(circle at 20% 30%, ${alpha(bone[100], 0.05)} 0 1px, transparent 1px)`,
            `radial-gradient(circle at 70% 60%, ${alpha(bone[100], 0.04)} 0 1px, transparent 1px)`,
          ].join(','),
          backgroundSize: '5px 5px, 7px 7px',
          mixBlendMode: 'overlay',
        },
        '::selection': {
          backgroundColor: alpha(accent.brass, 0.35),
          color: bone[100],
        },
        a: {
          color: 'inherit',
          textDecorationColor: alpha(accent.brass, 0.65),
          textUnderlineOffset: '0.22em',
          transition: `color 160ms ${easing}, text-decoration-color 160ms ${easing}, text-underline-offset 160ms ${easing}`,
        },
        'a:hover': {
          color: bone[100],
          textDecorationColor: accent.emberLight,
          textUnderlineOffset: '0.32em',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: bone[100],
          backgroundImage: 'none',
          backgroundColor: alpha(ink[800], 0.76),
          border: `1px solid ${alpha(bone[100], 0.14)}`,
          boxShadow: '0 18px 58px rgba(0, 0, 0, 0.24)',
          backdropFilter: 'blur(8px)',
        },
        rounded: {
          borderRadius: 4,
        },
        elevation1: {
          boxShadow: '0 1px 0 rgba(238, 229, 210, 0.06)',
        },
        elevation2: {
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.22)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: alpha(bone[100], 0.045),
          border: `1px solid ${alpha(bone[100], 0.16)}`,
          borderRadius: 4,
          boxShadow: 'none',
          transition: `transform 180ms ${easing}, border-color 180ms ${easing}, background-color 180ms ${easing}`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 2,
            height: '100%',
            background: `linear-gradient(180deg, ${accent.brass}, ${alpha(accent.ember, 0.4)})`,
            opacity: 0.65,
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            borderColor: alpha(accent.brassLight, 0.5),
            backgroundColor: alpha(bone[100], 0.065),
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '18px 20px 8px',
        },
        title: {
          fontFamily: ['Space Grotesk', 'IBM Plex Sans', 'sans-serif'].join(','),
          fontWeight: 600,
          letterSpacing: '-0.018em',
        },
        subheader: {
          fontFamily: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'].join(','),
          color: alpha(bone[200], 0.58),
          fontSize: '0.72rem',
          letterSpacing: '0.055em',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '18px 20px',
          '&:last-child': {
            paddingBottom: 20,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 2,
          padding: '9px 14px',
          transition: `transform 140ms ${easing}, border-color 140ms ${easing}, background-color 140ms ${easing}, color 140ms ${easing}`,
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          color: ink[950],
          backgroundColor: accent.brass,
          border: `1px solid ${accent.brassLight}`,
          '&:hover': {
            backgroundColor: accent.brassLight,
          },
        },
        outlined: {
          color: bone[100],
          borderColor: alpha(accent.brass, 0.52),
          backgroundColor: alpha(bone[100], 0.03),
          '&:hover': {
            borderColor: accent.brassLight,
            backgroundColor: alpha(accent.brass, 0.09),
          },
        },
        text: {
          color: bone[100],
          '&:hover': {
            backgroundColor: alpha(bone[100], 0.06),
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: 26,
          borderRadius: 2,
          fontFamily: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'].join(','),
          fontSize: '0.66rem',
          fontWeight: 600,
          letterSpacing: '0.075em',
          textTransform: 'uppercase',
          color: alpha(bone[100], 0.86),
          backgroundColor: alpha(bone[100], 0.045),
          border: `1px solid ${alpha(bone[100], 0.16)}`,
        },
        outlined: {
          backgroundColor: 'transparent',
          borderColor: alpha(accent.brass, 0.42),
        },
        colorPrimary: {
          color: bone[100],
          backgroundColor: alpha(accent.brass, 0.13),
          borderColor: alpha(accent.brassLight, 0.42),
        },
        colorSecondary: {
          color: bone[100],
          backgroundColor: alpha(accent.ember, 0.13),
          borderColor: alpha(accent.emberLight, 0.42),
        },
        label: {
          paddingLeft: 9,
          paddingRight: 9,
        },
      },
    },
    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
        elevation: 0,
        square: true,
      },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderTop: `1px solid ${alpha(bone[100], 0.16)}`,
          borderBottom: `1px solid ${alpha(bone[100], 0.08)}`,
          '&::before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 54,
          padding: '0 4px',
          transition: `background-color 160ms ${easing}`,
          '&:hover': {
            backgroundColor: alpha(bone[100], 0.04),
          },
          '&.Mui-expanded': {
            minHeight: 54,
          },
        },
        content: {
          margin: '12px 0',
          '&.Mui-expanded': {
            margin: '12px 0',
          },
        },
        expandIconWrapper: {
          color: accent.brass,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '8px 0 22px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: alpha(bone[100], 0.16),
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: alpha(bone[100], 0.82),
          borderRadius: 2,
          transition: `background-color 140ms ${easing}, color 140ms ${easing}, transform 140ms ${easing}`,
          '&:hover': {
            color: bone[100],
            backgroundColor: alpha(bone[100], 0.07),
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(bone[100], 0.08),
          color: bone[100],
          border: `1px solid ${alpha(bone[100], 0.18)}`,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: ink[800],
          color: bone[100],
          border: `1px solid ${alpha(bone[100], 0.16)}`,
          borderRadius: 2,
          fontFamily: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'].join(','),
          fontSize: '0.68rem',
          letterSpacing: '0.04em',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: alpha(ink[850], 0.96),
          border: `1px solid ${alpha(bone[100], 0.16)}`,
          borderRadius: 4,
          boxShadow: '0 18px 58px rgba(0, 0, 0, 0.36)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: alpha(bone[100], 0.86),
          fontSize: '0.88rem',
          '&:hover': {
            backgroundColor: alpha(accent.brass, 0.08),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(accent.brass, 0.14),
            '&:hover': {
              backgroundColor: alpha(accent.brass, 0.18),
            },
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          backgroundColor: alpha(bone[100], 0.035),
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(bone[100], 0.18),
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(accent.brass, 0.42),
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: accent.brass,
          },
        },
        input: {
          color: bone[100],
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: alpha(bone[200], 0.66),
          '&.Mui-focused': {
            color: accent.brass,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: alpha(ink[950], 0.78),
          color: bone[100],
          borderBottom: `1px solid ${alpha(bone[100], 0.12)}`,
          boxShadow: 'none',
          backdropFilter: 'blur(12px)',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: accent.brass,
          height: 1,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'].join(','),
          fontSize: '0.72rem',
          letterSpacing: '0.075em',
          textTransform: 'uppercase',
          color: alpha(bone[200], 0.62),
          '&.Mui-selected': {
            color: bone[100],
          },
        },
      },
    },
  },
});

export default zacharyTheme;
```

---

## Required Font Imports

Add to app entry point or global CSS.

Recommended via Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

If using Next.js App Router, use `next/font/google` instead.

Example:

```ts
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';

export const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
});

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});
```

Then update the theme font stacks to use CSS variables if desired.

---

## Suggested Component Refactors

### Hero Section

Current hero centers portrait, name, tags, and profile text. This can remain conceptually, but should become less neon and more editorial.

New hero structure:

```text
[small overline] ZACHARY REECE / DENVER CO

[large heading]
Systems for learning,
intelligence, and human capability.

[portrait or geometric mark] [short manifesto]

[tags]
SOFTWARE ENGINEER / PRODUCT BUILDER / MARTIAL ARTIST / PHILOSOPHER
```

Implementation notes:

- Move name into a strong typographic header, not a glowing gradient wordmark.
- Consider making the thesis larger than the name.
- Portrait should be part of an editorial composition, not just centered avatar.
- Use a thin line system connecting portrait/name/tags.

### Profile Paragraph

Current profile is useful but too resume-like for homepage hero. Split into:

1. Short thesis paragraph on homepage.
2. Longer “About” page or expandable field-note section.

Homepage version:

```text
I build software systems at the intersection of learning, intelligence, and human capability. My work spans product engineering, AI tools, educational platforms, technical writing, and long-running philosophical research into computation, cognition, and reality.
```

Longer about version can preserve the Udemy/Flint story.

### Cards / Link Rows

Replace the current repeated glowing link rows with artifact rows.

Each row should have:

- Small mono index number, e.g. `01`
- Category label
- Title
- One-sentence description
- Optional glyph/icon
- Right-side arrow or coordinate marker

Example:

```text
01  SYSTEMS BUILT
    Projects
    Software, experiments, tools, and applied systems.
```

### Section Headers

Use overline + large heading or mono labels.

Example:

```tsx
<Typography variant="overline">Index / 01</Typography>
<Typography variant="h3">Systems Built</Typography>
```

### Footer

Footer should feel like an inscription or maker’s mark.

Example:

```text
ZACHARY REECE — SOFTWARE / LEARNING / SYSTEMS / DISCIPLINE
Denver, Colorado
```

Social icons should be small, monochrome, and line-based. No bright hover glow.

---

## Iconography

Prefer line icons with consistent stroke weight.

If using MUI icons, reduce visual weight through size/color.

Recommended icon treatment:

- Size: 16–20px
- Color: muted brass or stone
- No colored circular icon backgrounds unless very subtle
- Avoid emoji-like bright icons

Possible custom glyphs:

- Circle/node
- Crosshair
- Compass mark
- Mountain polygon
- Book/page
- Grappling knot/loop
- Bracket/terminal prompt
- Archive drawer

---

## Page-Specific Guidance

### Home

Purpose: high-level identity and index.

Should include:

- Hero thesis
- Short bio
- Main index sections
- Featured writing/project links
- Current focus areas

### About

Purpose: narrative.

Should include:

- Early coding / self-taught story
- Teaching 20k+ students
- Cloudwell enterprise work
- Flint AI education work
- Physical practice / judo / BJJ
- Philosophy/research threads

Design should feel like an essay with side annotations.

### Projects

Purpose: systems built.

Use cards with:

- Problem
- System
- Stack
- Outcome
- Link

### Writing / Blog

Purpose: field notes.

Use editorial list layout:

- Date
- Title
- Topic tag
- Excerpt

Avoid standard blog card grid unless the cards are highly designed.

### Research

Purpose: long-running intellectual threads.

Could include:

- Multidimensional Computationalism
- FAKT++
- Knowledge tracing
- Learning science
- AI education

Use diagrammatic visual language.

---

## Accessibility Requirements

- Maintain sufficient color contrast.
- Do not rely only on color to communicate interactivity.
- Hover states must have focus equivalents.
- Keyboard focus should be visible with brass outline.
- Motion should respect `prefers-reduced-motion`.

Suggested focus style:

```css
*:focus-visible {
  outline: 1px solid #c9ad71;
  outline-offset: 3px;
}
```

Reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Implementation Plan for Coding Agent

### Phase 1 — Theme Replacement

1. Add new MUI theme file.
2. Import fonts.
3. Replace existing theme provider with `zacharyTheme`.
4. Add `CssBaseline` if not already present.
5. Remove old blue/purple gradient tokens.
6. Check all pages for unreadable text or broken contrast.

### Phase 2 — Global Texture and Layout

1. Add global background/grid/noise layers through `MuiCssBaseline` or global CSS.
2. Update root app layout max-width and spacing.
3. Remove heavy glow effects.
4. Replace saturated gradient borders with muted line/border system.

### Phase 3 — Component Refactor

1. Refactor hero into editorial/asymmetric composition.
2. Replace gradient name text with typographic hierarchy.
3. Replace pill tags with mono label chips.
4. Replace link cards with artifact/index rows.
5. Refactor accordions into archive-drawer style.
6. Update footer to maker’s-mark style.

### Phase 4 — Content Taxonomy

1. Rename current sections.
2. Reorganize links into more personal categories:
   - Systems Built
   - Field Notes
   - Learning / Transmission
   - Disciplines
   - Research Threads
3. Add short descriptions to each item.
4. Move longer resume-like bio into About page or lower section.

### Phase 5 — Refinement

1. Tune spacing manually.
2. Check mobile layout.
3. Reduce all colors by 10–20% saturation if anything feels trendy.
4. Ensure no component feels like default MUI.
5. Confirm final site feels like same visual identity as the new resume.

---

## Acceptance Criteria

The redesign is successful if the site feels:

- Authored rather than templated
- Editorial rather than SaaS
- Warm rather than neon
- Geometric rather than decorative
- Serious but personal
- Technical but human
- Connected to the new resume design language
- Clearly representative of Zachary Reece specifically

The redesign fails if it still feels like:

- AI startup template
- Generic dark developer portfolio
- Blue/purple gradient website
- Dribbble dashboard
- Crypto/web3 landing page
- Overdesigned personal brand gimmick

---

## Final Direction Summary

The new personal website should feel like a handcrafted digital artifact belonging to a systems-oriented engineer exploring intelligence, structure, learning, and human potential.

It should look less like a portfolio and more like an index into a mind, a body of work, and a set of disciplines under construction.

