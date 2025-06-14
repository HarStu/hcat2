import { db } from '@/db/drizzle'
import { gameConfigs } from '@/lib/games'
import { games } from '@/db/schema'

export async function pushGamesToServer() {
  for (const game of gameConfigs) {
    const insertGame: typeof games.$inferInsert = {
      ...game,
      score: 0
    }

    // upsert all games
    await db
      .insert(games)
      .values(insertGame)
      .onConflictDoUpdate({
        target: games.name,
        set: {
          description: insertGame.description,
          systemPrompt: insertGame.systemPrompt,
          aiName: insertGame.aiName,
          requiredTools: insertGame.requiredTools
        }
      })
  }
}

pushGamesToServer()
  .then(() => {
    console.log("Game Configs Synced")
    process.exit(0)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })