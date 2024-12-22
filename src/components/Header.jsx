function Header() {
  return (
    <header className="bg-gray-800 text-gray-200 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold font-poppins tracking-wide">
          Your Favourite Calendar
        </h1>
        <nav>
          <ul className="flex gap-6">
            <li>
              <a
                href="#"
                className="text-lg font-medium hover:text-blue-400 hover:underline transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-lg font-medium hover:text-blue-400 hover:underline transition-colors duration-200"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
