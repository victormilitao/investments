interface MainContentProps {
  children: React.ReactNode
}

export function MainContent(props: MainContentProps) {
  return (<div className="flex-1 p-10 mx-auto overflow-auto">{props.children}</div>)
}