import nextConnect from "next-connect"
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const apiRoute = nextConnect()

apiRoute.post(async (req, res) => {
  try {
    const input = req.body.result
    const type = req.body.type || ""
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Fix spelling mistakes, add punctuation and line breaks where appropriate. ${
            type && `The text to fix is from a ${type}`
          }`,
        },
        { role: "user", content: input },
      ],
      max_tokens: 3000,
    })
    console.log(response.data.choices)
    res.status(200).json({ result: response.data.choices[0].message.content })
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else if (error.message) {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: `An error occurred during your request. ${error.message}`,
        },
      })
    } else {
      console.log("Unkown error", error)
      res.status(500).json({
        error: {
          message: `An error occurred during your request.`,
        },
      })
    }
  }
})

export default apiRoute
