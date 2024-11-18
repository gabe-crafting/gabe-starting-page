import type { TooltipItem } from "chart.js";

// Type for a single candlestick (Kline) data
type Kline = [
    number,     // 0: Open time (timestamp in milliseconds)
    string,     // 1: Open price
    string,     // 2: High price
    string,     // 3: Low price
    string,     // 4: Close price
    string,     // 5: Volume
    number,     // 6: Close time (timestamp in milliseconds)
    string,     // 7: Quote asset volume
    number,     // 8: Number of trades
    string,     // 9: Taker buy base asset volume
    string,     // 10: Taker buy quote asset volume
    string      // 11: Ignore (unused field, reserved for future use)
];

// Type for the overall API response
type BinanceKlinesResponse = Kline[];

type ChartOptions = {
    responsive: boolean;
    interaction: {
        mode: 'index';
        intersect: boolean;
    };
    plugins: {
        legend: boolean;
        tooltip: {
            enabled: boolean;
            callbacks: {
                // Modify 'line' if using a different chart type
                title: (tooltipItems: TooltipItem<'line'>[]) => string;
                // Modify 'line' if using a different chart type
                label: (tooltipItem: TooltipItem<'line'>) => string;
            };
        };
    };
    scales: {
        x: {
            display: boolean;
            grid: {
                drawTicks: boolean;
                display: boolean;
                drawOnChartArea: boolean;
            };
        };
        y: {
            display: boolean;
            grid: {
                drawTicks: boolean;
                display: boolean;
            };
            beginAtZero: boolean;
            min: number;
            max: number;
        };
    };
};

const apiFactory = (currency: string) => ({
    today: `https://api.binance.com/api/v3/klines?symbol=${currency}&interval=3m&limit=288`,
    week: `https://api.binance.com/api/v3/klines?symbol=${currency}&interval=1h&limit=168`,
    month: `https://api.binance.com/api/v3/klines?symbol=${currency}&interval=1d&limit=31`,
    sixMonths: `https://api.binance.com/api/v3/klines?symbol=${currency}&interval=1d&limit=186`,
    year: `https://api.binance.com/api/v3/klines?symbol=${currency}&interval=1d&limit=365`,
    currentPrice: `https://api.binance.com/api/v3/ticker/price?symbol=${currency}`
})

export const useTablePrices = (currency: string) => {
    const chartData = ref();
    const option = ref<ChartOptions>();
    const apis = apiFactory(currency)
    const selected = ref<string>("day")

    const setDay = () => {
        setChartData(apis.today)
        selected.value = "day"
    };

    const setWeek = () => {
        setChartData(apis.week)
        selected.value = "week"
    };

    const setMonth = () => {
        setChartData(apis.month)
        selected.value = "month"
    };

    const setSixMonth = () => {
        setChartData(apis.sixMonths)
        selected.value = "sixMonths"
    };
    const setYear = () => {
        setChartData(apis.year)
        selected.value = "year"
    };

    const setChartData = async (api: string) => {
        try {
            const response = await fetch(api);
            const data = await response.json() as BinanceKlinesResponse;

            const labels = data.map((point) => {
                // openTime is the first value
                const date = new Date(point[0]);
                return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                });
            });

            // close price is the 5th value
            const prices = data.map((point) => parseFloat(point[4]));
            const min = Math.min(...prices);
            const max = Math.max(...prices);

            chartData.value = {
                labels,
                datasets: [
                    {
                        label: "Bitcoin Price (USD)",
                        fill: false,
                        borderColor: "white",
                        yAxisID: "y",
                        tension: 0.4,
                        data: prices,
                        pointRadius: 0,
                        pointHoverRadius: 0,
                    },
                ],
            };

            option.value = {
                responsive: true,
                interaction: {
                    mode: "index",
                    intersect: false,
                },
                plugins: {
                    legend: false,
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            title: function (tooltipItems) {
                                return tooltipItems[0].label;
                            },
                            label: function (tooltipItem) {
                                return `${tooltipItem.raw} $`;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        display: false,
                        grid: {
                            drawTicks: false,
                            display: false,
                            drawOnChartArea: true,
                        },
                    },
                    y: {
                        display: false,
                        grid: {
                            drawTicks: false, // Disable ticks
                            display: false,
                        },
                        beginAtZero: true,
                        min: min - min * 0.01,
                        max: max + max * 0.01,
                    },
                },
            };
        } catch (e) {
            console.warn("Error on fetch:", e);
        }
    };

    onMounted(() => {
        chartData.value = setChartData(apis.today);
    });

    return {
        chartData,
        option,
        setDay,
        setWeek,
        setMonth,
        setSixMonth,
        setYear,
        selected
    }
}