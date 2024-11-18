<template>
  <div class="crypto-container-comp">
    <CryptoCustomChart currency="BTCUSDT" />
    <CryptoCustomChart currency="ETCUSDT" />
    <CryptoCustomChart currency="DOGEUSDT" />
    <CryptoCustomChart currency="XLMUSDT" />
  </div>
</template>

<style scoped>
.crypto-container-comp {
  border-radius: 10px;
  max-height: calc(100vh - 30px);
  overflow: auto;
}

/* For webkit browsers like Chrome, Edge, and Safari */
::-webkit-scrollbar {
  width: 6px;
  /* Scrollbar width */
}

::-webkit-scrollbar-track {
  background: transparent;
  /* Track color */
  border-radius: 6px;
  width: 2px;
  /* Rounded corners */
}

::-webkit-scrollbar-thumb {
  background: #f1f1f1;
  /* Thumb color */
  border-radius: 6px;
  /* Rounded corners */
  width: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
  /* Thumb color on hover */
}


/* Firefox scrollbar styles */
/* * {
  scrollbar-width: thin;
  /* Thin scrollbar */
  /* scrollbar-color: #f1f1f1 transparent; */
  /* Thumb and track colors */
/* }  */

/* $gunmetal: rgba(46, 51, 56, 1);
$sienna: rgba(120, 47, 18, 1);
$russet: rgba(121, 73, 42, 1);
$bronze: rgba(212, 126, 48, 1);
$gunmetal-2: rgba(33, 40, 46, 1); */
</style>