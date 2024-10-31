import { useState } from 'react'

type ARTabProps = {
	tabs: string[]
}

const ARTab = ({ tabs: tabList }: ARTabProps) => {
	const [selectedIndex, setSelectedIndex] = useState(0)
	return (
		<div className="pa-1 ar-container w-min-content d-flex gap-1 elevate-2 pill">
			{tabList.map((tab, i) => (
				<button
					className={[
						'tab transparent',
						selectedIndex === i ? 'selected' : undefined,
					].join(' ')}
					key={i}
					onClick={() => setSelectedIndex(i)}
				>
					{tab}
				</button>
			))}
		</div>
	)
}

export default ARTab
