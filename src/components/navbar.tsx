import Link from 'next/link'
import { ModeToggle } from "./theme-toggle-button";
import { buttonVariants } from './ui/button';

function Navbar() {
    return <nav className="flex justify-between py-5">
        <Link
            href="/"
        >
            <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-100'> 
                Marc7 System
            </h1>
        </Link>

        <div className='flex gap-x-2 items-center'>
            <Link href="/list" 
                className={buttonVariants({variant: "secondary"})}>
                    Lista
                </Link>
            <Link href="/new" 
                className={buttonVariants({variant: "secondary"})}>
                    Nueva tarea
                </Link>
            <ModeToggle />
        </div>

    </nav>;
}

export default Navbar;
