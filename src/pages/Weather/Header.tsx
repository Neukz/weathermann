import Moment from 'react-moment';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { selectWeather } from '../../store';

const Header = () => {
	const { data } = useAppSelector(selectWeather);

	return (
		<header className="text-center">
			{data?.current.name && data.current.sys.country && (
				<h1>
					{data.current.name}, {data.current.sys.country}
				</h1>
			)}

			<Moment
				className="text-muted"
				utc
				date={data?.current.dt! * 1000}
				add={{ seconds: data?.current.timezone }}
				format="D MMM, hLT"
			/>
		</header>
	);
};

export default Header;
