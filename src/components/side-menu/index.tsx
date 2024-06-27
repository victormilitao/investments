import { AlignJustify } from 'lucide-react'
import { useState } from 'react';

interface SideMenuProps {
  children: React.ReactNode
  className?: string
}

export function SideMenu({ children, className }: SideMenuProps) {
  const collapseMenuCss = "w-14 px-2"
  const expandedMenuCss = "w-full max-w-[280px] px-10"
  let menuCss = collapseMenuCss
  const [isExpanded, setIsExpanded] = useState(false);
  const visible = isExpanded ? "visible" : "invisible"

  const iconCss = "ml-auto"

  function handleMenu(): void {
    console.dir(isExpanded)
    setIsExpanded(!isExpanded)
  }

  menuCss = isExpanded ? expandedMenuCss : collapseMenuCss

  return (
    <div
      className={`${className} ${menuCss} py-10 lg:w-full lg:max-w-[280px] h-full bg-ds-black-500 lg:px-10`}
    >
      <div className={`${iconCss} visible lg:invisible hover:bg-ds-black-300 hover:cursor-pointer p-2 rounded-md max-w-10`}>
        <AlignJustify onClick={handleMenu} />
      </div>
      <div className={`${visible} lg:visible flex flex-col gap-3 fixed`}>
        {children}
      </div>
    </div>
  )
}
