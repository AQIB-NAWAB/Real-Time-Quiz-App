import { useState } from "react"
import { useSocket } from "../context/socketContext"
import { useNavigate } from "react-router-dom"

const Landing = () => {
  const { socket, name, setName } = useSocket()
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (name.trim().length > 3) {
      const data = {
        id: socket.id,
        username: name,
      }
      socket.emit("register", data)
      navigate("/quizes")
    } else {
      setError("Please enter a valid name (more than 3 characters)")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600 to-blue-500 text-white">
      <header className="py-6 px-4 text-center">
        <h1 className="text-4xl font-bold">QuizMaster</h1>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome to QuizMaster</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Test your knowledge, challenge your friends, and learn something new!
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Start Quizzing
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="py-4 px-4 text-center">
        <p className="text-sm">&copy; 2025 QuizMaster. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Landing

