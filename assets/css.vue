<template>
  <div />
</template>

<style>
/* Changes the mouse's cursor on Pointer */
.pointer {cursor: pointer;}

/* Zoom effect when overing */
h1, h2 {
  color: #E9C490;
}

/* Zoom effect when overing */
.zoom {
  transition: transform .2s;
}
.zoom:hover {
  transform: scale(1.2);
}
.zoom-sm {
  transition: transform .2s;
}
.zoom-sm:hover {
  transform: scale(1.1);
}
.zoom-xs {
  transition: transform .2s;
}
.zoom-xs:hover {
  transform: scale(1.05);
}
</style>
