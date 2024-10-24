import { useState } from 'react'
import ARPanel from './ARPanel'

type ARTabProps = {
	tabs: string[]
}

const ARTab = ({ tabs: tabList }: ARTabProps) => {
	const [selectedIndex, setSelectedIndex] = useState(0)
	return (
		<ARPanel pill className="w-min-content">
			{tabList.map((tab, i) => (
				<button className={selectedIndex !== i ? 'transparent' : ''} key={i}>
					{tab}
				</button>
			))}
		</ARPanel>
	)
}

export default ARTab
