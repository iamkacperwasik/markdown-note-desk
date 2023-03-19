import type {GetServerSideProps} from "next"
import Head from "next/head"
import {CiSquarePlus} from "react-icons/ci"
import {HiOutlineDocumentText} from "react-icons/hi"
import {MdSearch} from "react-icons/md"
import {RiMoonFill, RiSunFill} from "react-icons/ri"

const Main = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      {/* Body */}
      <div className="h-screen select-text bg-zinc-50 text-slate-900">
        {/* Sidebar */}
        <div className="flex h-screen w-1/4 flex-col justify-between bg-zinc-100">
          <div className="p-8">
            {/* Profile */}
            <div className="flex h-[64px] items-end gap-4">
              {/* Avatar */}
              <div className="inline-block h-full min-h-[64px] w-[64px] min-w-[64px] rounded-lg bg-sky-600 shadow-sm" />

              {/* Personal info */}
              <div className="flex flex-col">
                <h2 className="text-2xl font-medium">Kacper Wąsik</h2>
                <p className="font-light">kacper@wasik.me</p>
              </div>
              {/* Personal info */}
            </div>
            {/* Profile */}

            {/* Search */}
            <label className="mt-4 flex items-center gap-4 py-4">
              {/* Icon */}
              <MdSearch className="w-min text-2xl text-zinc-400" />

              <input
                type="text"
                placeholder="Search"
                className="text-bold text-md w-full bg-zinc-100 py-[4px] text-zinc-100"
              />
            </label>
            {/* Search */}

            <hr />
          </div>

          {/* Documents */}
          <div className="flex h-full flex-col justify-between overflow-y-auto">
            <div>
              {/* Bookmarks */}
              <h2 className="mb-2 px-8 text-xl font-bold uppercase text-zinc-400">
                Bookmarks
              </h2>

              {/* Bookmark */}
              <div className="flex cursor-pointer items-center gap-4 bg-zinc-200 py-[5px] px-8">
                {/* Icon */}
                <HiOutlineDocumentText className="text-2xl text-zinc-400" />

                <p className="text-bold text-md w-full py-[4px] font-medium text-zinc-500">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              {/* Bookmark */}

              {/* Bookmark */}
              <div className="flex cursor-pointer items-center gap-4 py-[5px] px-8">
                {/* Icon */}
                <HiOutlineDocumentText className="text-2xl text-zinc-400" />

                <p className="text-bold text-md w-full py-[4px] font-medium text-zinc-500">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              {/* Bookmark */}

              {/* Bookmarks */}

              {/* Notes */}
              <h2 className="my-4 mb-2 px-8 text-xl font-bold uppercase text-zinc-400">
                Notes
              </h2>

              {/* Note */}
              <div className="flex cursor-pointer items-center gap-4 py-[5px] px-8">
                {/* Icon */}
                <HiOutlineDocumentText className="text-2xl text-zinc-400" />

                <p className="text-bold text-md w-full py-[4px] font-medium text-zinc-500">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              {/* Note */}
            </div>
            {/* Notes */}
          </div>
          {/* Documents */}

          {/* New note */}
          <div className="flex cursor-pointer items-center gap-4 py-4 px-8">
            {/* Icon */}
            <CiSquarePlus className="text-2xl text-sky-600" />

            <p className="text-bold text-md w-full py-[4px] font-medium text-sky-600">
              Add Note
            </p>
          </div>
          {/* New note */}

          <div className="px-8">
            <hr />

            {/* Theme switch */}
            <div className="flex gap-4 py-6 text-xl text-zinc-400">
              <RiSunFill className="cursor-pointer text-sky-600" />

              <RiMoonFill className="cursor-pointer" />
            </div>

            {/* Theme switch */}
          </div>
        </div>
        {/* Sidebar */}
      </div>
      {/* Body */}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // fetch all notes

  return {props: {}}
}

export default Main
