import ChatBox from './components/chatBox'
import SideBar from './components/sideBar'

function App() {
  return (
    <main className='flex'>
      <SideBar />
      <div className='h-screen w-full px-12 py-10 transition-all duration-300 ease-in-out'>
        <ChatBox />
      </div>
    </main>
  )
}

export default App
