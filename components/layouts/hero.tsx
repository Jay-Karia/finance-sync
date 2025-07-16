import { motion } from "motion/react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export default function Hero() {
  const HEADING = "Split Bills, Keep Friendships";

  return (
    <div>
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-yellow-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-yellow-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold text-slate-700 md:text-5xl lg:text-7xl dark:text-slate-300">
          {HEADING.split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center md:text-lg text-sm font-normal text-neutral-600 dark:text-neutral-400"
        >
          Track shared expenses effortlessly and settle up with friends. No more
          awkward conversations about who owes what - just simple, transparent
          expense splitting.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/new">
            <button className="w-60 transform rounded-lg bg-yellow-400 px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-500 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300 cursor-pointer">
              Create Group
            </button>
          </Link>
          <Link
            href="https://github.com/Jay-Karia/finance-sync"
            target="_blank"
          >
            <button className="flex items-center justify-center w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900 cursor-pointer">
              <FaGithub className="inline-block mr-2" />
              GitHub
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
