const Result = ({
  translation,
  result,
  setShowTranslation,
  showTranslation,
}) => {
  return (
    <div className=" m-2">
      {/* JSON.parse turns string to boolean */}
      {translation && result && (
        <div
          className="flex flex-row justify-center gap-2"
          onChange={(e) => setShowTranslation(JSON.parse(e.target.value))}
        >
          <input
            type="radio"
            value={false}
            defaultChecked={!showTranslation}
            name="result"
          />
          Original
          <input
            type="radio"
            value={true}
            defaultChecked={showTranslation}
            name="result"
          />
          Translation
        </div>
      )}
      <p className="whitespace-pre-line dark:text-darkMode-600">
        {!showTranslation || !translation ? result : translation}
      </p>
    </div>
  )
}
export default Result
