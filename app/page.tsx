import Image from "next/image";
import DataTable from "@/components/DataTable";
import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { fetcher } from "@/lib/coingecko.actions";
import { Suspense } from "react";
import CoinOverview from "@/components/home/CoinOverview";
import TrendingCoins from "@/components/home/TrendingCoins";
import {
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from "@/components/home/fallback";

const Page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense
          fallback={
            <div>
              <CoinOverviewFallback />
            </div>
          }
        >
          <CoinOverview />
        </Suspense>

        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>

      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
};
export default Page;
