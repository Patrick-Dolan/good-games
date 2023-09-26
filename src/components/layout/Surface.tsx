import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  type?: string;
}

function Surface({children, type}: Props) {
  return (
    <div className={`surface shadow elevation-1 ${type}`}>
      <div className="surface-container">
        {children}
      </div>
    </div>
  )
}

export default Surface;