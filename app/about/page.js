export default function About() {
  return (
    <div className="min-h-screen py-12 px-4">
      {/* About Section */}
      <section className="max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-8 text-center">About Todo App</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg mb-6">
            Todo App is a modern task management application built with Next.js, MongoDB, and GitHub Authentication. 
            Our mission is to help users stay organized and productive by providing a simple yet powerful todo management system.
          </p>
          <p className="text-lg mb-6">
            We believe in creating tools that are both functional and user-friendly. 
            Our application focuses on essential features while maintaining a clean and intuitive interface.
          </p>
        </div>
      </section>



      {/* Features Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">User Authentication</h3>
            <p className="text-gray-300">
              Secure GitHub authentication ensures your todos are private and accessible only to you.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Task Management</h3>
            <p className="text-gray-300">
              Create, update, and delete tasks easily. Mark tasks as complete when finished.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Responsive Design</h3>
            <p className="text-gray-300">
              Access your todos from any device with our mobile-friendly interface.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 