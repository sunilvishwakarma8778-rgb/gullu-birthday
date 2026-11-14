# Gullu Birthday Surprise ❤️

A romantic, responsive React birthday surprise website made especially for Gullu.

## Run it

```bash
npm install
npm run dev
```

Open the localhost URL shown in your terminal.

## Add your 4–5 photos locally

Open `public/photos/` and add your own photos using these exact filenames:

- `gullu-1.jpg`
- `gullu-2.jpg`
- `gullu-3.jpg`
- `gullu-4.jpg`
- `gullu-5.jpg`

You can use JPG, JPEG, or PNG, but if you use another extension, update the matching image path in `src/App.jsx`.

The gallery has five photo slots. If you have only four photos, add four and replace or remove the fifth card in the `photos` array in `src/App.jsx`.

## Add background music

Put an MP3 file you have permission to use at:

`public/music/birthday.mp3`

Start music using the **Play music** button on the website. Browsers require a user interaction before audio can play.

## Personalize the message

Open `src/App.jsx` and edit:
- Photo captions in the `photos` array
- The birthday hero paragraph
- The love letter text
- The sign-off `Your favourite person`

## Build

```bash
npm run build
npm run preview
```

You can deploy the project by importing it into Vercel or Netlify.
# gullu-birthday
