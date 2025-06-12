An AI chat app built w/ Better Auth, Drizzle ORM, ShadCN, and Next.js App Router

TODO:
- /app/page.tsx
  - If not logged, immediately direct to /app/play/nixon/page.tsx
  - If logged in, direct to USER GAME DASHBOARD
- IMPLEMENT USER GAME DASHBOARD
  - Show list of games to play
  - Show list of games associated with user
- /app/play/[gameName]/page.tsx 
  - needs to respond to if you're logged in or not -- if logged in, when creating the game, ensure it's
    associated with the user who's currently logged in
