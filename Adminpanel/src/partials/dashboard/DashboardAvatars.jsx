import React from 'react';
import { Link } from 'react-router-dom';

import User01 from '../../images/avatar_1.jpg';
import User02 from '../../images/avatar_3.jpg';
import User03 from '../../images/avatar_4.jpg';
import User04 from '../../images/avatar_6.jpg';
import Image05 from '../../images/avatar_8.jpg';
import Image06 from '../../images/avatar_9.jpg';
import Image07 from '../../images/avatar_10.jpg';
import Image08 from '../../images/avatar_12.jpg';
import Image09 from '../../images/avatar_13.jpg';
import Image10 from '../../images/avatar_15.jpg';

function DashboardAvatars() {
  return (
    <ul className="flex flex-wrap justify-center sm:justify-start mb-8 sm:mb-0 -space-x-3 -ml-px">
      <li>
        <Link className="block" to="#0">
          <img className="w-9 h-9 rounded-full" src={User01} width="36" height="36" alt="User 01" />
        </Link>
      </li>
      <li>
        <Link className="block" to="#0">
          <img className="w-9 h-9 rounded-full" src={User02} width="36" height="36" alt="User 02" />
        </Link>
      </li>
      <li>
        <Link className="block" to="#0">
          <img className="w-9 h-9 rounded-full" src={User03} width="36" height="36" alt="User 03" />
        </Link>
      </li>
      <li>
        <Link className="block" to="#0">
          <img className="w-9 h-9 rounded-full" src={User04} width="36" height="36" alt="User 04" />
        </Link>
      </li>
      <li>
        <button className="flex justify-center items-center w-9 h-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500 shadow-sm transition duration-150 ml-2">
          <span className="sr-only">Add new user</span>
          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
        </button>
      </li>
    </ul>
  );
}

export default DashboardAvatars;
