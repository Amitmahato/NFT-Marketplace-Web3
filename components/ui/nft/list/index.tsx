import { NftMeta } from "@_types/NFT";
import NftItem from "../item";

type NftListProps = { items: NftMeta[] };

const NftList: React.FC<NftListProps> = ({ items }) => {
  return (
    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
      {items.map((item) => (
        <div
          key={item.image}
          className="flex flex-col rounded-lg shadow-lg overflow-hidden"
        >
          <NftItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default NftList;
