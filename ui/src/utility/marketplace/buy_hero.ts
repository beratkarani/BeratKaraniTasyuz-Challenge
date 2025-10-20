import { Transaction } from "@mysten/sui/transactions";

export const buyHero = (
  packageId: string,
  listHeroId: string,
  priceInSui: string
) => {
  const tx = new Transaction();

  // 1️⃣ SUI → MIST dönüşümü (1 SUI = 1,000,000,000 MIST)
  const priceInMist = BigInt(Number(priceInSui) * 1_000_000_000);

  // 2️⃣ Tam ödeme miktarı kadar coin oluşturma
  const [paymentCoin] = tx.splitCoins(tx.gas, [tx.pure.u64(priceInMist)]);

  // 3️⃣ Kahraman satın alma işlemi (marketplace üzerinden)
  tx.moveCall({
    target: `${packageId}::marketplace::buy_hero`,
    arguments: [
      tx.object(listHeroId), 
      paymentCoin,           
    ],
  });

  return tx;
};

