import { CSSProperties, ForwardedRef, forwardRef, MouseEvent, PropsWithChildren } from 'react'

type Props = {
	className?: string
	onClick?: (e: MouseEvent) => void
	style?: CSSProperties
}

const ARPanel = forwardRef(
	(
		{ children, className, onClick, style }: PropsWithChildren<Props>,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		className = className ? `${className} ` : ''
		return (
			<div
				onClick={(e) => {
					if (onClick) onClick(e)
				}}
				ref={ref}
				className={`${className}ar-container bg-ar`}
				style={{ ...(style ?? {}) }}
			>
				{children}
			</div>
		)
	}
)

export default ARPanel
