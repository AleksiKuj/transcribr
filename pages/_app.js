import Head from "next/head"
import { useState } from "react"
import "../styles/globals.css"
import Footer from "../components/Footer"
import FileForm from "../components/FileForm"
import Header from "../components/Header"
import ErrorNotification from "../components/ErrorNotification"

export default function App() {
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [error, setError] = useState("")

  return (
    <div className={` ${darkMode && "dark"}`}>
      <div
        className={` flex flex-col items-center min-h-screen app-container dark:bg-darkMode-200 `}
      >
        <Head>
          <title>Transcribr: Audio transcripts</title>
          <link rel="icon" href="/logo.png" />
        </Head>
        <main className=" flex flex-col  flex-grow items-center pt-6 w-11/12 max-w-3xl">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />

          {error && <ErrorNotification error={error} />}
          <FileForm
            loading={loading}
            setLoading={setLoading}
            setResult={setResult}
            result={result}
            setError={setError}
          />

          <div className=" m-2">
            <p className="whitespace-pre-line dark:text-darkMode-600">
              {result}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
