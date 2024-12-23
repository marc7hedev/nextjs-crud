import Link from 'next/link'
import { ModeToggle } from "./theme-toggle-button";
import { buttonVariants } from './ui/button';

function Navbar() {
    return <nav className="flex justify-between py-5">
        <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-100'> 
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
