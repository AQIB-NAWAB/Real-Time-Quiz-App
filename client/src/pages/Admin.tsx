import { useNavigate } from "react-router-dom"
import { useSocket } from "../context/socketContext"

const Admin = () => {
  const navigate = useNavigate()
  const { quizState, setQuizState, socket, quizes } = useSocket()

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAddQuiz = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit("create-quiz-request", quizState)
  }

  const getQuizStatus = (startTime: string, endTime: string) => {
    const now = new Date()
    const start = new Date(startTime)
    const end = new Date(endTime)
    return now >= start && now <= end ? "Active" : "Inactive"
  }

  const handleNavigate = (name: string) => {
    navigate(`/quiz/editor/${name}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium bg-black text-white rounded-md w-fit px-2 py-2">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-2xl font-bold mb-4 p-6 bg-gray-50 border-b">Quiz List</h2>
          <div className="overflow-x-auto overflow-y-scroll h-96">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quizes.map((quiz, i) => (
                  <tr
                    key={i}
                    onClick={() => handleNavigate(quiz.name)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quiz.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(quiz.startTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(quiz.endTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          getQuizStatus(quiz.startTime, quiz.endTime) === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {getQuizStatus(quiz.startTime, quiz.endTime)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-2xl font-bold mb-4 p-6 bg-gray-50 border-b">Add Quiz</h2>
          <form onSubmit={handleAddQuiz} className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Quiz Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={quizState.name}
                onChange={handleOnChange}
                placeholder="Enter quiz name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                value={quizState.startTime}
                onChange={handleOnChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                End Time
              </label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={quizState.endTime}
                onChange={handleOnChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Quiz
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Admin

