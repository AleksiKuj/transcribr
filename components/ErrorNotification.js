const ErrorNotification = ({ error }) => {
  return (
    <div className="bg-red-200 w-full p-5 my-6 rounded-md">
      <p>Error: {error}</p>
    </div>
  )
}

export default ErrorNotification
