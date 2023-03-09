const Header = ({ darkMode, setDarkMode }) => {
  return (
    <div>
      <img src={!darkMode ? "/logo.png" : "/logo-dark.png"} />
      <div className="flex flex-row w-full justify-center gap-3 py-5">
        <h3 className="text-3xl leading-8 font-bold text-blue-500 dark:text-darkMode-300  ">
          Transcribr
        </h3>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="dark:text-darkMode-600"
        >
          {darkMode ? (
            <img src="/lightmode.png" width={"36px"} />
          ) : (
            <img src="/darkmode.png" width={"36px"} />
          )}
        </button>
      </div>
    </div>
  )
}
export default Header
