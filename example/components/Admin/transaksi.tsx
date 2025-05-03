import InfoCard from 'example/components/Cards/InfoCard'
import RoundIcon from 'example/components/RoundIcon'
import Layout from 'example/containers/Layout'
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from 'icons';

<div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
  <InfoCard title="Total clients" value="6389">
    {/* @ts-ignore */}
    <RoundIcon
      icon={PeopleIcon}
      iconColorClass="text-orange-500 dark:text-orange-100"
      bgColorClass="bg-orange-100 dark:bg-orange-500"
      className="mr-4"
    />
  </InfoCard>

  <InfoCard title="Account balance" value="$ 46,760.89">
    {/* @ts-ignore */}
    <RoundIcon
      icon={MoneyIcon}
      iconColorClass="text-green-500 dark:text-green-100"
      bgColorClass="bg-green-100 dark:bg-green-500"
      className="mr-4"
    />
  </InfoCard>
</div>;