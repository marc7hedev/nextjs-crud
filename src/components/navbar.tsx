import Link from 'next/link'
import { ModeToggle } from "./theme-toggle-button";
import { buttonVariants } from './ui/button';

function Navbar() {
    return <nav className="flex justify-between">
        <h1>
            NextActionsCRUD
        </h1>

        <div className='flex gap-x-2 items-center'>
            <Link href="/new" 
                className={buttonVariants({variant: "secondary"})}>
                    New Task
                </Link>
            <ModeToggle />
        </div>

    </nav>;
}

export default Navbar;
