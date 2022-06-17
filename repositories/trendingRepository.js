import db from "../config/db.js"

export async function getTrendingHashtags(limit) {
  return db.query(
    `
        SELECT h.name, COUNT(ph.hashtag_id) AS trend_count
        FROM posts_hashtags ph
        JOIN hashtags h ON h.id = ph.hashtag_id
        GROUP BY h.name
        ORDER BY trend_count DESC
        LIMIT $1
    `,
    [limit],
  )
}
