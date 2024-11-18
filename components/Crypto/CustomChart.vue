<template>
  <div class="card-crypto-chart">
    <p>{{ currency }} - {{ price }} $</p>
    <Chart type="line" :data="chartData" :options="option" class="h-[30rem]" />
    <div class="buttons-container">
      <button @click="setDay" :class="{ 'selected-button': selected === 'day' }">Day</button>
      <button @click="setWeek" :class="{ 'selected-button': selected === 'week' }">Week</button>
      <button @click="setMonth" :class="{ 'selected-button': selected === 'month' }">Month</button>
      <button @click="setSixMonth" :class="{ 'selected-button': selected === 'sixMonths' }"> 6 months</button>
      <button @click="setYear" :class="{ 'selected-button': selected === 'year' }">Year</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currency: {
    type: String,
    default: 'BTCUSDT', // Default currency is BTC
  },
});

const { price } = usePrice(props.currency)
const {
  chartData,
  option,
  selected,
  setDay,
  setWeek,
  setMonth,
  setSixMonth,
  setYear } = useTablePrices(props.currency)
</script>

<style lang="css" scoped>
.selected-button {
  --gunmetal: #2E3338ff;
  --sienna: #782F12ff;
  --russet: #79492Aff;
  --bronze: #D47E30ff;
  --gunmetal-2: #21282Eff;
}

button {
  background-color: transparent;
  border: transparent;
  cursor: pointer;
  padding: 4px 10px;
  /* background-color: #2E3338ff; */
  border-radius: 5px;
  /* border: solid 2px transparent; */
}

.selected-button {
  border: solid 2px var(--bronze);
  border-radius: 5px;
  /* box-sizing: content-box; */
}

.card-crypto-chart {
  margin: 10px;
  /* border: solid 1px white; */
  max-width: 300px;
  padding: 10px;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
}
</style>