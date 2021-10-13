<template>
  <router-view/>
</template>

<style>
@font-face {
  font-family: "ubuntu";
  src: local("ubuntu"), url('common/assets/ubuntu.ttf') format("truetype");
}

@font-face {
  font-family: "roboto";
  src: local("roboto"), url('common/assets/roboto.ttf') format("truetype");
}

* {
  font-family: 'roboto', monospace;
  color: white;
}

body {
  height: 100vh;
  background-color: theme('colors.db.gray');
}

h1 {
  @apply text-4xl text-white text-center m-5 !important;
  font-family: 'ubuntu', sans-serif;
  letter-spacing: 3px;
}

h2 {
  @apply text-3xl text-white text-center m-5;
  font-family: 'ubuntu', sans-serif;
  letter-spacing: 2px;
}

h3 {
  @apply text-2xl text-white text-center m-5;
  font-family: 'ubuntu', sans-serif;
  letter-spacing: 1px;

}

p, input, label {
  @apply m-1;
}

a {
  @apply text-db-pink cursor-default;
}

a:hover {
  @apply cursor-pointer;
}

input {
  @apply bg-black border border-solid border-gray-500 flex-grow;
}

button {
  outline: none;
}
</style>
