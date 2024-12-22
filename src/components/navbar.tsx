import Link from 'next/link'
import { ModeToggle } from "./theme-toggle-button";

function Navbar() {
    return <nav className="flex justify-between">
        <h1>
            NextActionsCRUD
        </h1>

        <div>
            <Link href="/new">New Task</Link>
            <ModeToggle />
        </div>

    </nav>;
}

export default Navbar;
