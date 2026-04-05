import styles from "./StockBar.module.css";

interface StockBarProps {
  stock: number;
  maxStock?: number;
}

export function StockBar({ stock, maxStock = 50 }: Readonly<StockBarProps>) {
  const safeStock = Math.max(stock, 0);
  const safeMaxStock = Math.max(maxStock, 1);

  let stockColorClass = styles.fillNormal;
  if (safeStock <= 10) {
    stockColorClass = safeStock > 0 ? styles.fillLow : styles.fillZero;
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-baseline gap-1">
        <span className="text-xs font-bold text-black">{stock}</span>
        <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">
          Unités
        </span>
      </div>
      <progress
        className={`${styles.stockBarProgress} ${stockColorClass}`}
        value={safeStock}
        max={safeMaxStock}
      />
    </div>
  );
}
