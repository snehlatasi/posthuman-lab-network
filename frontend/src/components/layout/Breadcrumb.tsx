"use client";

import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="py-4 border-b border-bone-200/5 mb-8"
    >
      <ol className="flex flex-wrap items-center space-x-2.5 text-[10px] font-mono tracking-wider uppercase text-bone-200/30">
        <li>
          <Link 
            href="/" 
            className="hover:text-moss-400 transition-colors focus:outline-none focus:ring-1 focus:ring-moss-500/30 px-1 py-0.5 rounded"
          >
            Home
          </Link>
        </li>
        
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          
          return (
            <React.Fragment key={item.label}>
              <li role="presentation" className="select-none text-bone-200/15">
                /
              </li>
              <li>
                {isLast || !item.href ? (
                  <span 
                    aria-current="page" 
                    className="text-moss-400 font-semibold truncate max-w-[200px] inline-block"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    href={item.href}
                    className="hover:text-moss-400 transition-colors focus:outline-none focus:ring-1 focus:ring-moss-500/30 px-1 py-0.5 rounded"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
