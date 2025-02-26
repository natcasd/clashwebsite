# Clash Champions Clan Website

A dedicated website for the Clash Champions clan in Clash of Clans.

## Features

- **Clan Dashboard**: View overall clan statistics and performance
- **Member Tracking**: Monitor individual member contributions and activity
- **War Analytics**: Track war performance and statistics
- **Member Search**: Find clan members easily

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Data Fetching**: SWR, Axios
- **API**: Clash of Clans API

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn
- Clash of Clans API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/clashofclans.git
   cd clashofclans
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Clash of Clans API key:
   ```
   NEXT_PUBLIC_COC_API_KEY=your_api_key_here
   ```

4. Update the clan tag in `utils/api.ts` to match your clan:
   ```typescript
   // Replace with your actual clan tag
   const CLAN_TAG = '#2YVJJRGPG';
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
clashofclans/
├── components/        # Reusable UI components
│   ├── ui/            # Shadcn/UI components
├── pages/             # Next.js pages
├── public/            # Static assets
├── styles/            # Global styles
├── utils/             # Utility functions
├── lib/               # Library code
├── .env.local         # Environment variables (create this file)
└── README.md          # Project documentation
```

## API Integration

This project uses the official Clash of Clans API. To use the API, you need to:

1. Register at [developer.clashofclans.com](https://developer.clashofclans.com)
2. Create a new API key
3. Add the key to your `.env.local` file

## Customization

To customize this website for your clan:

1. Update the clan tag in `utils/api.ts`
2. Modify the clan name and description in the homepage
3. Update colors and branding in `tailwind.config.js`
4. Add your clan's logo and images in the `public` directory

## Deployment

This website can be deployed to Vercel, Netlify, or any other Next.js-compatible hosting service.

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Clash of Clans API](https://developer.clashofclans.com) for providing the data
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Shadcn/UI](https://ui.shadcn.com/) for UI components 