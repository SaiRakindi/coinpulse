import LiveDataWrapper from "@/components/LiveDataWrapper";
import { fetcher, getPools } from "@/lib/coingecko.actions";
import { formatCurrency } from "@/lib/utils";
import { link } from "fs";
import { ArrowRight, ArrowUp } from "lucide-react";
import Link from "next/link";

const CoinDetailPage = async ({ params }: NextPageProps) => {
  const { id } = await params;

  const [coinData, coinOHLCData] = await Promise.all([
    await fetcher<CoinDetailsData>(`/coins/${id}`, {
      dex_pair_format: "contract_address",
    }),

    await fetcher<OHLCData>(`/coins/${id}/ohlc`, {
      vs_currency: "usd",
      days: 1,
      // interval: "hourly",
      precision: "full",
    }),
  ]);

  const platform = coinData.asset_platform_id
    ? coinData.detail_platforms?.[coinData.asset_platform_id]
    : null;

  const network = platform?.geckoterminal_url.split("/")[3] || null;

  const contractAddress = platform?.contract_address || null;

  const pool = await getPools(id, network, contractAddress);

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
      link: coinData.links?.subreddit_url
        ? coinData.links?.subreddit_url[0]
        : coinData.links?.homepage[0],
      linkText: "Community",
    },
  ];

  return (
    <main id="coin-details-page">
      <section className="primary">
        <LiveDataWrapper
          coinId={id}
          poolId={pool.id}
          coin={coinData}
          coinOHLCData={coinOHLCData}
        >
          <h4>Exchange Listings</h4>
        </LiveDataWrapper>

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
                    <Link
                      href={Array.isArray(link) ? link[0] : link}
                      target="_blank"
                    >
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
