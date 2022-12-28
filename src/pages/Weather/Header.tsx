import dayjs from '../../utils/dayjs';
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

			<time className="text-muted">
				{dayjs
					.unix(current?.dt!)
					.add(current?.timezone!, 'second')
					.utc()
					.format('DD MMM, hh:mm A')}
			</time>
		</header>
	);
};

export default Header;
