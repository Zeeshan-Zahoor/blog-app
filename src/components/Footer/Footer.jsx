import React from 'react'

import { Link } from "react-router-dom";
import Logo from '../Logo';

export default function Footer() {
  return (
    <section className="pt-12 pb-1 bg-white border-t">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Left column */}
          <div className="max-w-sm">
            <div className="mb-4">
              <Logo width="100px" />
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              A modern blog platform built with React and Appwrite where users
              can read, write, and share posts.
            </p>

            <p className="text-xs text-gray-400 mt-4">
              © {new Date().getFullYear()} Blog App. All rights reserved.
            </p>
          </div>

          {/* Right column */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-700 mb-4 tracking-wide">
              Company
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  className="text-gray-500 hover:text-black transition"
                  to="https://github.com/Zeeshan-Zahoor"
                >
                  Visit Us
                </Link>
              </li>
            </ul>
          </div>
          <div className='w-full'>
            <h1 className='text-center text-xs text-gray-500'>Made with ❤️ by Zeeshan</h1>
          </div>

        </div>
      </div>
    </section>
  );
}
