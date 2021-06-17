<template>
  <div class="descripcion">
    <div class="descripcion__info">
      <h2 class="subtitulo">Descripción del sistema</h2>
      <hr class="linea" />
      <p>
        E Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, quis
        in doloribus, recusandae explicabo id maiores labore incidunt ipsum quia
        dignissimos nihil accusamus tempore natus ea neque repellat, quam eos?
        Lorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
        assumenda ratione optio saepe, consectetur iste nostrum, ipsum
        aspernatur, impedit natus harum magni accusamus! Dignissimos labore,
        modi dolore aut necessitatibus explicabo.
      </p>
      <p>
        E Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, quis
        in doloribus, recusandae explicabo id maiores labore incidunt ipsum quia
        dignissimos nihil accusamus tempore natus ea neque repellat, quam eos?
        Lorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
        assumenda ratione optio saepe, consectetur iste nostrum, ipsum
        aspernatur, impedit natus harum magni accusamus! Dignissimos labore,
        modi dolore aut necessitatibus explicabo.
      </p>
    </div>
    <div class="desripcion__imagenes">
      <div>
        <img src="@/assets/coti.jpg" class="imagen__cotizacion" />
        <img src="@/assets/transhumant.jpg" class="imagen__transhumant" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginaPrincipal",
};
</script>

<style scoped>
.descripcion {
  padding: 30px;
  background: #ebebeb;
  width: 100%;
  height: 450px;
  display: flex;
}
.descripcion__info {
  width: 50%;
  height: 100%;
  text-align: left;
}
.subtitulo {
  font-weight: bold;
}
.linea {
  height: 2px;
  background-color: red;
  width: 70%;
}
.desripcion__imagenes {
  width: 50%;
  padding-top: 20px;
}
.imagen__cotizacion {
  width: 80%;
  height: 285px;
}
.imagen__transhumant {
  width: 80%;
  height: 100px;
}
</style>
