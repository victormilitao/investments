import { AlignJustify, ArrowLeftToLine } from 'lucide-react'
import { useState } from 'react'

interface SideMenuProps {
  children: React.ReactNode
  className?: string
}

export function SideMenu({ children, className }: SideMenuProps) {
  const collapseMenuCss = 'w-14 px-2'
  const expandedMenuCss = 'w-[280px] max-w-[280px] px-10'
  const [isExpanded, setIsExpanded] = useState(true)
  const [menuCss, setMenuCss] = useState(expandedMenuCss)
  const visible = isExpanded ? 'visible' : 'invisible'

  function handleMenu(): void {
    setIsExpanded(!isExpanded)
    setMenuCss(isExpanded ? collapseMenuCss : expandedMenuCss)
  }

  return (
    <aside
      className={`${className} ${menuCss} py-3 h-full bg-ds-black-500 transition-all duration-300`}
    >
      <div className='fixed'>
        <div className='side-handle-icons flex'>
          {!isExpanded && (
            <div
              className={`hover:bg-ds-black-300 hover:cursor-pointer p-2 rounded-md max-w-10 `}
              onClick={handleMenu}
            >
              <AlignJustify />
            </div>
          )}
          {isExpanded && (
            <div
              className={`ml-auto hover:bg-ds-black-300 hover:cursor-pointer p-2 rounded-md max-w-10`}
              onClick={handleMenu}
            >
              <ArrowLeftToLine />
            </div>
          )}
        </div>
        <div className={`${visible} flex flex-col gap-3`}>{children}</div>
      </div>
    </aside>
  )
}
