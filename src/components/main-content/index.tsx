interface MainContentProps {
  children: React.ReactNode
}

export function MainContent(props: MainContentProps) {
  return (<div className="p-10 mx-auto overflow-y-auto mt-[80px]">{props.children}</div>)
}