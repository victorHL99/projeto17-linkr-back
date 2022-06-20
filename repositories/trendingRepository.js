import db from "../config/db.js"

function getTrendingHashtags(limit) {
  return db.query(
    `
    SELECT h.id, h.name, COUNT(ph.hashtag_id) AS trend_count
    FROM posts_hashtags ph
    JOIN hashtags h ON h.id = ph.hashtag_id
    GROUP BY h.id, h.name
    ORDER BY trend_count DESC
    LIMIT $1
    `,
    [limit],
  )
}

export const trendingRepository = {
  getTrendingHashtags,
}
