/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className='bg-gray-800 text-white'>
      <div className='container mx-auto flex flex-wrap items-center justify-between p-4'>
        {/* Logo */}
        <Link
          to='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'>
          <img
            src='./assets/icons/icon.jpg'
            className='h-16'
            alt='App Logo'
          />
          <span className='self-center text-2xl font-semibold whitespace-nowrap'>
            Pet Connect
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          data-collapse-toggle='navbar-dropdown'
          type='button'
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
          aria-controls='navbar-dropdown'
          aria-expanded='false'>
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div
          className='hidden font-medium flex flex-col p-4 md:p-0 mt-4 md:mt-0 md:block md:flex md:flex-row'
          id='navbar-dropdown'>
          <NavLink
            to='/'
            className='block py-2 px-3 hover:bg-gray-700 text-white md:hover:text-white md:p-2'>
            Home
          </NavLink>
          <NavLink
            to='/about'
            className='block py-2 px-3 hover:bg-gray-700 text-white md:hover:text-white md:p-2'>
            About
          </NavLink>
          <NavLink
            to='/mypets'
            className='block py-2 px-3 hover:bg-gray-700 text-white md:hover:text-white md:p-2'>
            My Pets
          </NavLink>
          <NavLink
            to='/favorite'
            className='block py-2 px-3 hover:bg-gray-700 text-white md:hover:text-white md:p-2'>
            Favorite
          </NavLink>

          {/* User Dropdown */}
          <div>
            {user ? (
              <>
                <button
                  id='dropdownNavbarLink'
                  data-dropdown-toggle='dropdownNavbar'
                  className='flex items-center justify-between w-full py-2 px-3 text-white'>
                  {user.firstName}
                  <svg
                    className='w-2.5 h-2.5 ms-2.5'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 10 6'>
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 1 4 4 4-4'
                    />
                  </svg>
                </button>
                <div
                  id='dropdownNavbar'
                  className='z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow'>
                  <ul
                    className='py-2 text-sm text-gray-700'
                    aria-labelledby='dropdownLargeButton'>
                    <li>
                      <Link
                        to='/profile'
                        className='block px-4 py-2 hover:bg-gray-100'>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/my-pets'
                        className='block px-4 py-2 hover:bg-gray-100'>
                        My Pets
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/settings'
                        className='block px-4 py-2 hover:bg-gray-100'>
                        Settings
                      </Link>
                    </li>
                  </ul>
                  <div className='py-1'>
                    <a
                      onClick={() => {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        window.location.href = '/';
                      }}
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                      Sign out
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='flex space-x-2'>
                  <Link
                    to='/login'
                    className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100'>
                    Login
                  </Link>
                  <Link
                    to='/register'
                    className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100'>
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
