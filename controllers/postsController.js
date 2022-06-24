import urlMetadata from "url-metadata"
import dayjs from "dayjs"

import postsRepository from "../repositories/postsRepository.js"

import verboseConsoleLog from "../utils/verboseConsoleLog.js"

export async function getPosts(req, res) {
  const { limit, order, direction, from_time } = req.query
  const { userId } = res.locals

  const parsedTime = from_time
    ? dayjs(from_time).add(1, "second").format()
    : undefined

  try {
    const {rows, count} = await postsRepository.getPosts(
      limit,
      order,
      direction,
      parsedTime,
      userId,
      offset,
      )
    
     
      const total_pages = Math.ceil(count / limit) //total de paginas que podem ser renderizadas
      for (let i in rows) {
        const post = rows[i]
        try {
        const metadata = await urlMetadata(post.sharedUrl)

        post.previewTitle = metadata.title
        post.previewImage = metadata.image
        post.previewDescription = metadata.description
        post.previewUrl = metadata.url
      } catch (error) {
        verboseConsoleLog("Error:", error)
      }
    }

    return res.send(result.rows)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}

export async function getPostsFromUserById(req, res) {
  const { limit, order, direction } = req.query
  const { userId } = req.params

  try {
    const result = await postsRepository.getPostsFromUserById(
      limit,
      order,
      direction,
      userId,
    )

    for (let i in result.rows) {
      const post = result.rows[i]
      try {
        const metadata = await urlMetadata(post.sharedUrl)

        post.previewTitle = metadata.title
        post.previewImage = metadata.image
        post.previewDescription = metadata.description
        post.previewUrl = metadata.url
      } catch (error) {
        verboseConsoleLog("Error:", error)
      }
    }

    // verboseConsoleLog("Result:", result.rows)
    return res.send(result.rows)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}

export async function createPost(req, res) {
  const { sharedUrl, message } = req.body
  const { userId } = res.locals

  const hashtagExp = new RegExp("#([a-zA-ZãÃÇ-Üá-ú]*)", "gi")
  const hashtags = message?.match(hashtagExp)
  const uniqueHashtags = [...new Set(hashtags)]

  try {
    const foundHashtags = await postsRepository.getAllHashtags()

    let notFoundHastags = []
    let alreadyCreatedHashtags = []
    let allHashtagsId = []

    uniqueHashtags.forEach((hashtag, index) => {
      let hashtagText = hashtag.split("#")[1]

      const findResult = foundHashtags.rows.find((foundHashtag) => {
        return foundHashtag.name === hashtagText
      })
      if (!findResult) {
        notFoundHastags.push(hashtagText)
      } else {
        alreadyCreatedHashtags.push({ id: findResult.id })
      }
    })

    allHashtagsId = [...alreadyCreatedHashtags]

    try {
      if (notFoundHastags.length > 0) {
        const createdResult = await postsRepository.createHashtags(
          notFoundHastags,
        )
        allHashtagsId = [...alreadyCreatedHashtags, ...createdResult.rows]
      }

      try {
        const result = await postsRepository.createPost(
          userId,
          sharedUrl,
          message,
        )

        const lastPost = await postsRepository.getLastPost(message)
        const lastPostInfo = lastPost.rows[0]

        allHashtagsId.forEach(async (hashtagId) => {
          const createRelationHashtagPost =
            await postsRepository.createRelationHashtagPost(
              lastPostInfo.id,
              hashtagId.id,
            )
        })

        const createdPost = {
          ...{ ...lastPost.rows[0] },
        }
        if (result.rowCount === 1) {
          try {
            const metadata = await urlMetadata(sharedUrl)

            createdPost.previewTitle = metadata.title
            createdPost.previewImage = metadata.image
            createdPost.previewDescription = metadata.description
            createdPost.previewUrl = metadata.url

            return res.status(201).send({ ...createdPost })
          } catch (error) {
            verboseConsoleLog("Error:", error)
            return res.status(201).send({ ...createdPost })
          }
        } else return res.sendStatus(400)
      } catch (error) {
        verboseConsoleLog("Error:", error)
        return res.status(500).send(error.message)
      }
    } catch (error) {
      return res.send(error)
    }
  } catch (error) {}
}

export async function getPostsByHashtag(req, res) {
  const { hashtag } = req.params

  try {
    const result = await postsRepository.getPostsByHash(hashtag)

    return res.send(result.rows)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}

export async function deletePost(req, res) {
  const { id } = req.params
  try {
    await postsRepository.deletePostById(id)
    res.sendStatus(204)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}

export async function updatePost(req, res) {
  const { id } = req.params
  const { userId } = res.locals
  const { message } = req.body
  try {
    await postsRepository.updatePost(id, message, userId)
    res.sendStatus(204)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}
