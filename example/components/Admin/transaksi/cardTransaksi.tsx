import InfoCard from "example/components/Cards/InfoCard";
import RoundIcon from "example/components/RoundIcon";
import {
  BellIcon,
  CartIcon,
  ChatIcon,
  EditIcon,
  MoneyIcon,
  PeopleIcon,
  TrashIcon,
} from "icons";

function CardTransaksi(){
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <InfoCard title="Transaksi Hari Ini" value="6389">
        {/* @ts-ignore */}
        <RoundIcon
          icon={MoneyIcon}
          iconColorClass="text-blue-500 dark:text-blue-100"
          bgColorClass="bg-blue-100 dark:bg-blue-500"
          className="mr-4"
        />
      </InfoCard>

      <InfoCard title="Total Transaksi" value="$ 46,760.89">
        {/* @ts-ignore */}
        <RoundIcon
          icon={CartIcon}
          iconColorClass="text-teal-500 dark:text-teal-100"
          bgColorClass="bg-teal-100 dark:bg-teal-500"
          className="mr-4"
        />
      </InfoCard>
    </div>
  );
}

export default CardTransaksi;