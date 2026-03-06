export default function Home() {
  return (
    <>
      <div className="py-24 px-12 max-w-3xl">
        <h1 className="mb-4 text-5xl font-semibold tracking-tight leading-tight">It works — welcome to the power of a full-stack React app</h1>
        <p className="text-2xl text-gray-500">
          Powered by Inertia and React, this setup blends server-driven routing with rich
          client-side interactivity — seamless, fast, and cohesive.
        </p>
        <h2 className="text-3xl font-bold underline">
          Hello world!
        </h2>
      </div>

      <div className="grid grid-cols-3 px-12 border-t border-gray-200">
        <a href="https://insiders.adonisjs.com/docs/v7-alpha/introduction" target="_blank" className="p-8 border-l border-r border-gray-200 hover:bg-gray-50">
          <h3 className="mb-2 text-xl font-semibold tracking-tight">Official Docs &nbsp;›</h3>
          <p className="text-gray-500">Comprehensive reference for building with AdonisJS</p>
        </a>

        <a href="https://adocasts.com/" target="_blank" className="p-8 border-r border-gray-200 hover:bg-gray-50">
          <h3 className="mb-2 text-xl font-semibold tracking-tight">Adocasts &nbsp;›</h3>
          <p className="text-gray-500">Guided video tutorials for everyday development</p>
        </a>

        <a href="https://discord.gg/vDcEjq6" target="_blank" className="p-8 border-r border-gray-200 hover:bg-gray-50">
          <h3 className="mb-2 text-xl font-semibold tracking-tight">Discord &nbsp;›</h3>
          <p className="text-gray-500">Connect with developers building with AdonisJS every day</p>
        </a>
      </div>
    </>
  )
}
