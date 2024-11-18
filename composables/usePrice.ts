import { ref, onMounted, onUnmounted } from "vue";

export const usePrice = (currency: string) => {
  const price = ref<string | null>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(true);
  let intervalId: NodeJS.Timeout | string; // Interval ID for periodic updates

  const fetchPrice = async () => {
    try {
      loading.value = true;
      const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${currency}`);
      if (!response.ok) {
        throw new Error("Failed to fetch Bitcoin price.");
      }
      const data = await response.json();
      price.value = parseFloat(data.price).toFixed(2);
      error.value = null;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "An unknown error occurred";
      }
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchPrice()
    intervalId = setInterval(fetchPrice, 3000) as unknown as string;
  })

  onUnmounted(() => {
    clearInterval(intervalId);
  })

  return {
    price, error, loading
  }
}