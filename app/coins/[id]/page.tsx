import { fetcher } from "@/lib/coingecko.actions";
import { formatCurrency } from "@/lib/utils";
import { link } from "fs";
import { ArrowRight, ArrowUp } from "lucide-react";
import Link from "next/link";

const CoinDetailPage = async ({ params }: NextPageProps) => {
  const { id } = await params;

  const coinData = await fetcher<CoinDetailsData>(`/coins/${id}`, {
    dex_pair_format: "contract_address",
  });

  const CoinDetails = [
    {
      label: "Market Cap",
      value: formatCurrency(coinData.market_data.market_cap.usd),
    },
    { label: "Market Cap Rank", value: `#${coinData.market_cap_rank}` },
    {
      label: "Total Volume",
      value: formatCurrency(coinData.market_data.total_volume.usd),
    },
    {
      label: "Website",
      value: "-",
      link: coinData.links.homepage,
      linkText: "Homepage",
    },
    {
      label: "Explorer",
      value: "-",
      link: coinData.links.blockchain_site[0],
      linkText: "Explorer",
    },
    {
      label: "Community",
      value: "-",
      link: coinData.links.subreddit_url[0],
      linkText: "Community",
    },
  ];

  return (
    <main id="coin-details-page">
      <section className="primary">
        <h1 className="text-3xl font-bold">
          Coin <strong>{id}</strong>
        </h1>

        <p>Trend Overview</p>

        <p>Recent Trades</p>

        <p>Exchange Listings</p>
      </section>

      <section className="secondary">
        <p>Converter</p>

        <div className="details">
          <h4>Coin Details</h4>

          <ul className="details-grid">
            {CoinDetails.map(({ label, value, link, linkText }, index) => (
              <li key={index}>
                <p className="label">{label}</p>

                {link ? (
                  <div className="link">
                    <Link href={link} target="_blank">
                      {linkText || label}
                    </Link>

                    <ArrowRight size={16} />
                  </div>
                ) : (
                  <p className="text-base font-medium">{value}</p>
                )}
              </li>
            ))}
          </ul>
        </div>

        <p>Top Gainers and losers</p>
      </section>
    </main>
  );
};

export default CoinDetailPage;
