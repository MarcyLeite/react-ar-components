type Props = {
	currentTime: number
}

const ARGeneralInfo = ({ currentTime }: Props) => {
	return (
		<div className="d-flex flex-column gap-1 pa-2">
			<span>{new Date(currentTime).toLocaleString()}</span>
		</div>
	)
}

export default ARGeneralInfo
