import nextConnect from "next-connect"
import * as deepl from "deepl-node"

const apiRoute = nextConnect()

const authKey = process.env.DEEPL_API_KEY
const translator = new deepl.Translator(authKey)

apiRoute.post(async (req, res) => {
  try {
    const input = req.body.result || ""
    const language = req.body.language || "en"

    const result = await translator.translateText(input, null, language)
    res.status(200).json({ result: result.text })
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else if (error.message) {
      console.error(`Error with API request: ${error.message}`)
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
