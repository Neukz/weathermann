import Moment from 'react-moment';
import { useAppSelector } from '../../hooks/reduxTypedHooks';

const Header = () => {
	const current = useAppSelector(state => state.weather.data?.current);

	return (
		<header className="text-center">
			{current?.name && current.sys.country && (
				<h1>
					{current.name}, {current.sys.country}
				</h1>
			)}

			<Moment
				className="text-muted"
				utc
				date={current?.dt! * 1000}
				add={{ seconds: current?.timezone }}
				format="D MMM, hLT"
			/>
		</header>
	);
};

export default Header;
