import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  TimeScale
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import { enUS, es } from "date-fns/locale";
import { usePrefs } from "../prefs";
import { formatCompactUsd, formatUsd } from "../utils/format";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, TimeScale);

// Resolve a theme token (CSS variable holding RGB channels) to a canvas colour
const token = (name, alpha = 1) => `rgb(${getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim()} / ${alpha})`;

const CryptoPriceChart = ({ prices, name }) => {
  const { theme, t, locale } = usePrefs(); // re-render on theme change so token() re-reads the variables
  const first = prices[0]?.[1];
  const last = prices[prices.length - 1]?.[1];
  const trendName = last >= first ? "positive" : "negative";
  const lineColor = token(trendName);
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const chartData = {
    datasets: [
      {
        label: "USD",
        data: prices.map(([timestamp, price]) => ({ x: timestamp, y: price })),
        borderColor: lineColor,
        borderWidth: 2,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: lineColor,
        fill: true,
        // Gradient fades the trend colour into the card background
        backgroundColor: ({ chart }) => {
          const { ctx, chartArea } = chart;
          if (!chartArea) return "transparent";
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, token(trendName, 0.3));
          gradient.addColorStop(1, token(trendName, 0));
          return gradient;
        }
      }
    ]
  };

  const options = {
    animation: isReducedMotion ? false : { duration: 600 },
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        displayColors: false,
        backgroundColor: token("ink"),
        titleColor: token("page"),
        bodyColor: token("page"),
        padding: 10,
        cornerRadius: 10,
        callbacks: { label: (item) => formatUsd(item.parsed.y, locale) }
      }
    },
    adapters: { date: { locale: locale.startsWith("es") ? es : enUS } },
    scales: {
      x: {
        type: "time",
        time: { unit: "day", tooltipFormat: "PP", displayFormats: { day: "MMM d" } },
        grid: { display: false },
        border: { display: false },
        ticks: { color: token("subtle"), maxTicksLimit: 6, maxRotation: 0 }
      },
      y: {
        beginAtZero: false,
        grid: { color: token("line", 0.6) },
        border: { display: false },
        ticks: { color: token("subtle"), maxTicksLimit: 5, callback: (value) => formatCompactUsd(value, locale) }
      }
    }
  };

  return (
    <Line
      key={theme}
      role="img"
      aria-label={t("chart.summary", { name, from: formatUsd(first, locale), to: formatUsd(last, locale) })}
      data={chartData}
      options={options}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default CryptoPriceChart;
