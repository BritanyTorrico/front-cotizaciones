<template>
    <div class="inbox">
        <div class="inbox-container">
            <div class="inbox-cards" :class="selectedRequest.name === '' ? 'full-screen' : 'side-view'">
                <div class="card-side">
                    <div class="desc">Solicitudes aceptadas:</div>
                    <div class="card-index" v-for="(req, i) in inboxData" :key="i">
                        <div
                            class="single-card-container "
                            v-on:click="startTransition(i)"
                            :class="selectedRequest.name == req.nombre_solicitud ? 'selected-card' : ''"
                        >
                            <CardCot
                                :name="req.nombre_solicitud"
                                :date="req.fecha_solicitud"
                                :author="req.nombrecompleto_solicitante"
                                :description="req.detalle_solicitud"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="inbox-form" :class="selectedRequest.name === '' ? 'no-selected' : ''">
              <div v-if="selectedRequest.name!=''">
              <transition
                enter-active-class="animate__animated animate__fadeInRight"
                leave-active-class="animate__animated animate__fadeOutRight"
              >
                  <div v-if="!changeCot">
                      <CotForm :request="selectedRequest" />
                  </div>
              </transition>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>