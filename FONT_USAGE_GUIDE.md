# How to Use Your Custom OTF Font

## Step 1: Add Your OTF Font File
1. Place your `.otf` font file in the `public/fonts/` directory
2. Rename the file references in `globals.css` to match your actual font filename

## Step 2: Update Font References
In `app/globals.css`, update these lines to match your font file name:
```css
src: url('/fonts/your-font-name.otf') format('opentype');
src: url('/fonts/your-font-name-bold.otf') format('opentype');
```

Replace `your-font-name.otf` with your actual font file name.

## Step 3: Use the Font in Your Components

### Using Tailwind Classes:
```tsx
// Use the custom font
<h1 className="font-custom text-4xl">Title with Custom Font</h1>

// Use Poppins (existing)
<p className="font-poppins text-lg">Text with Poppins</p>

// Use default system font
<span className="font-sans">Default system font</span>
```

### Using CSS Classes:
```tsx
// You can also use CSS directly
<h1 style={{ fontFamily: 'CustomFont, sans-serif' }}>
  Custom Font Title
</h1>
```

## Step 4: Example Usage in Components

### Example 1: Mixed Fonts in a Header
```tsx
export default function Header() {
  return (
    <div className="text-center">
      <h1 className="font-custom text-6xl font-bold text-gray-900 mb-4">
        Custom Font Heading
      </h1>
      <p className="font-poppins text-xl text-gray-600">
        Poppins subtitle text
      </p>
    </div>
  )
}
```

### Example 2: Custom Font with Different Weights
```tsx
export default function Article() {
  return (
    <article>
      <h1 className="font-custom font-bold text-4xl mb-6">
        Bold Custom Font Title
      </h1>
      <p className="font-custom font-normal text-lg leading-relaxed">
        Regular custom font paragraph text
      </p>
    </article>
  )
}
```

## Available Font Classes:
- `font-custom` - Your custom OTF font
- `font-poppins` - Poppins font (existing)
- `font-sans` - Default system sans-serif
- `font-mono` - Monospace font

## Font Weights Available:
- `font-normal` - Regular weight
- `font-bold` - Bold weight (if you have a bold version of your font)
- `font-semibold`, `font-medium`, etc. (if you add more font files)