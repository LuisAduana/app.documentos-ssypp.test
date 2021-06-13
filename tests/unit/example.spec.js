import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";

import componentStore from "./../../src/store/index";
import component from "./../../src/components/Mensajes";

Vue.use(Vuex);
const store = new Vuex.Store(component);

test("Cargando test... ", () => {
  const wrapper = mount(componentStore, {
    store
  });
  store.state.busquedaEnTabla = "Hola";

  expect(wrapper.text()).toBe("Hola");
});
