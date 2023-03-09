import nextConnect from "next-connect"
import { Configuration, OpenAIApi } from "openai"
const fs = require("fs")
import multer from "multer"

//multer configuration
//maximum file size 10MB
//generates unique name with timestamp
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination: "./temp",
    filename: (req, file, cb) => {
      cb(
        null,
        `${file.fieldname}-${Date.now()}.${file.originalname.split(".").pop()}`
      )
    },
  }),
  //fileFilter allows only accepted file types
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [
      "mp3",
      "mp4",
      "mpeg",
      "mpga",
      "m4a",
      "wav",
      "webm",
    ]
    const fileType = file.originalname.split(".").pop().toLowerCase()
    if (!allowedExtensions.includes(fileType)) {
      return cb(
        new Error(
          "Only mp3, mp4, mpeg, mpga, m4a, wav, and webm files are allowed!"
        )
      )
    }
    cb(null, true)
  },
})

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const apiRoute = nextConnect()

apiRoute.use(upload.single("file"))

apiRoute.post(async (req, res) => {
  try {
    const response = await openai.createTranscription(
      fs.createReadStream(req.file.path),
      "whisper-1"
    )
    res.status(200).json({ result: response.data.text })
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: "An error occurred during your request:",
        },
      })
    }
  } finally {
    // Delete the file after transcription
    if (req.file) {
      fs.unlinkSync(req.file.path)
    }
  }
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
