import { auth, signIn, signOut } from '@/auth'
import { RabbitIcon } from 'lucide-react';
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
    const session = await auth();

    return (
        <header className='px-5 py-3 bg-white shadow-sm'>
            <nav className='flex justify-between items-center text-black'>
                <Link href="/">
                    <RabbitIcon/>
                </Link>

                <div className="flex items-center gap-5 text-black">

                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form action={async () => {
                                "use server";

                                await signOut({ "redirectTo": "/" });
                            }}>
                                <button type='submit'>
                                    <span>Logout</span>
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            "use server"

                            await signIn('github')
                        }}>
                            <button type='submit'>
                                <span>Login</span>
                            </button>
                        </form>
                    )}

                </div>
            </nav>
        </header >
    )
}

export default Navbar