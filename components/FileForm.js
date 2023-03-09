import { useState } from "react"
import axios from "axios"
import { PulseLoader } from "react-spinners"
import Select from "react-select"

const FileForm = ({ loading, setLoading, setResult, result, setError }) => {
  const [file, setFile] = useState(null)
  const [type, setType] = useState("")

  const types = ["conversation", "poem", "song", "speech", "other"]

  const options = types.map((type) => ({
    value: type,
    label: type,
  }))
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    console.log(file)
  }
  const handleTypeChange = (e) => {
    //if valid option
    const optionExists = options.some((option) => option.value === e.value)

    if (optionExists) {
      setType(e.value)
      console.log(type)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append("file", file)

    try {
      console.log(formData)
      setLoading(true)
      const response = await axios.post("/api/transcribe", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
        naxContentLength: Infinity,
      })
      setResult(response.data.result)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error.message)
      } else if (error.response && error.response.data) {
        setError(error.response.data)
      }
      setLoading(false)
      setTimeout(() => {
        setError("")
      }, 5000)
    }
  }

  const editResult = async () => {
    try {
      setLoading(true)

      const response = await axios.post(
        "/api/edit",
        JSON.stringify({ result, type }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log(response)
      setResult(response.data.result)
      setLoading(false)
    } catch (error) {
      console.log("Error editing:", error)
      setError(error.message)
      if (error.response.status === 400) {
        setError("Could not edit text, the file might be too large.")
      }
      setLoading(false)
      setTimeout(() => {
        setError("")
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col w-full2 gap-5 items-center">
        <div className="flex flex-col ">
          <input
            type="file"
            id="file"
            name="file"
            accept=".mp3, .mp4, .mpeg, .mpga, .m4a, .wav, .webm"
            onChange={handleFileChange}
            className="dark:text-darkMode-600 hidden overflow-auto whitespace-normal  break-words w-5/6"
          />

          {/* Custom file input */}
          <div className="inline-block">
            <label
              htmlFor="file"
              className="leading-6 px-3 focus:bg-green-500 py-1 
            "
            >
              <div className="flex flex-row gap-2 items-end  hover:cursor-pointer">
                <span
                  className="bg-blue-500 rounded px-2 py-1 inline-block 
              hover:bg-blue-600 text-white dark:bg-darkMode-300 dark:text-darkMode-200"
                >
                  Choose file
                </span>
                <span className="text-darkMode-200 dark:text-white">
                  {file ? file.name : "No file selected."}
                </span>
              </div>
            </label>
          </div>

          <p className="text-xs text-slate-600  dark:text-darkMode-500">
            File uploads are currently limited to 10 MB and the following input
            file types are supported: mp3, mp4, mpeg, mpga, m4a, wav, and webm.
          </p>
        </div>

        <div className="flex flex-col w-full sm:flex-row gap-2 sm:gap-5 ">
          {/* transcribe button */}
          <button
            type="submit"
            disabled={loading || !file ? true : false}
            className={`leading-6 w-full sm:w-6/12 px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded dark:bg-darkMode-300 dark:text-darkMode-700 ${
              !loading && file ? "cursor-pointer" : "cursor-default"
            }`}
          >
            {loading ? (
              <PulseLoader
                color={"#FFFFFF"}
                loading={loading}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Generate transcription"
            )}
          </button>

          {/* edit button */}
          {result && (
            <>
              <button
                onClick={() => editResult()}
                type="button"
                disabled={loading || !result ? true : false}
                className={`leading-6 px-3 py-1 w-full sm:w-3/12  text-white bg-blue-500 hover:bg-blue-600 rounded dark:bg-darkMode-300 dark:text-darkMode-700 ${
                  !loading && result ? "cursor-pointer" : "cursor-default"
                }`}
              >
                {loading ? (
                  <PulseLoader
                    color={"#FFFFFF"}
                    loading={loading}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Fix result"
                )}
              </button>
              <p className="text-sm w-full sm:w-3/12 text-slate-600  dark:text-darkMode-500">
                "Fix result" attempts to make the result more readable but might
                not work for large files.
              </p>
            </>
          )}
        </div>

        {/* type select */}
        {result && (
          <div className="flex w-full justify-center pb-2">
            <Select
              options={options}
              value={type}
              onChange={handleTypeChange}
              noOptionsMessage={() => null}
              clearValueOnReset={false}
              id="long-value-select"
              instanceId="long-value-select"
              placeholder={type ? type : "Optional: select type"}
              className="w-3/6 px-1"
            />
          </div>
        )}
      </div>
    </form>
  )
}
export default FileForm
