<template>
  <div id="app">  
   <header>
      <h2>Dashboard</h2>
      <h1>Vue test Anastasiia Prygun</h1>
  </header>
    <router-view/>
  </div>
</template>

<style>
header {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    h1 {
        font-weight: 500;
        padding: 25px 20px;
        font-size: 30px;
        box-shadow: 0 2px 4px #adadad;
        border-radius: 3px;
        margin: 10px 10px;
    }
    h2 {
        padding: 20px 15px;
        font-size: 25px;
        font-weight: 500;
        box-shadow: 0 2px 4px #adadad;
        border-radius: 3px;
        margin: 0px;
    }
    
    </style>