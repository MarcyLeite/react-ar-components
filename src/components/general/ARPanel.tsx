import { PropsWithChildren } from 'react'

const ARPanel = ({
	children,
	pill: isPill,
	className,
}: PropsWithChildren<{ pill?: boolean; className?: string }>) => {
	className = className ? `${className} ` : ''
	const panelClassName = isPill ? 'bg-ar pa-2 border-round-pill' : 'pa-3 flex-column border-round'

	return (
		<div className={`${className}elevate-3 bg-ar d-flex gap-2 ${panelClassName}`}>
			{children}
		</div>
	)
}

export default ARPanel
