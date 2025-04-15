const NavBar = () => {
    return (
        <header className="sticky top-0 z-10">
            <nav className="h-16 flex items-center justify-between px-4 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100/10">
                <h1 className="text-xl font-bold text-white">
                    <a href="#">Kittipan</a>
                </h1>
                <ul className="flex gap-8">
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#work">Work</a>
                    </li>
                    <li>
                        <a href="#about">About</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
