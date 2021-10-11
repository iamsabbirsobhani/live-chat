<template>
  <div>
    <div v-if="geo.geoLocation.flag" class="g-flags">
      <img v-if="geo.geoLocation.flag" :src="geo.geoLocation.flag" alt="" />
      <p v-if="geo.geoLocation.emoji_flag">
        <span> {{ geo.geoLocation.emoji_flag }}</span>
      </p>
    </div>
    <p v-if="geo.geoLocation.country_name">
      Country: <span> {{ geo.geoLocation.country_name }}</span>
    </p>
    <p v-if="geo.geoLocation.region_code">
      Country Code: <span>{{ geo.geoLocation.country_code }}</span>
    </p>
    <p v-if="geo.geoLocation.region">
      Region: <span>{{ geo.geoLocation.region }}</span>
    </p>
    <p v-if="geo.geoLocation.region_code">
      Region Code: <span>{{ geo.geoLocation.region_code }}</span>
    </p>
    <p v-if="geo.geoLocation.city">
      City: <span>{{ geo.geoLocation.city }}</span>
    </p>
    <p v-if="geo.geoLocation.postal">
      Postal: <span>{{ geo.geoLocation.postal }}</span>
    </p>
    <p v-if="geo.geoLocation.continent_name">
      Continent: <span>{{ geo.geoLocation.continent_name }}</span>
    </p>
    <p v-if="geo.geoLocation.calling_code">
      Calling code: <span>{{ `+${geo.geoLocation.calling_code}` }}</span>
    </p>
    <div v-for="lang in geo.geoLocation.languages" :key="lang.native">
      <p v-if="lang.native">
        Language Native: <span>{{ lang.native }}</span>
      </p>
      <p v-if="lang.name">
        Language Name: <span>{{ lang.name }}</span>
      </p>
    </div>

    <div v-if="geo.geoLocation.asn">
      <p style="text-align: center;">
        <span> Autonomous System Number (ASN)</span>
      </p>

      <p v-if="geo.geoLocation.asn.route">
        ASN route: <span> {{ geo.geoLocation.asn.route }}</span>
      </p>
      <p v-if="geo.geoLocation.asn.asn">
        ASN No: <span> {{ geo.geoLocation.asn.asn }}</span>
      </p>
      <p v-if="geo.geoLocation.asn.name">
        ASN Name: <span> {{ geo.geoLocation.asn.name }} </span>
      </p>
      <p v-if="geo.geoLocation.asn.domain">
        ASN Domain/Host: <span>{{ geo.geoLocation.asn.domain }}</span>
      </p>
      <p v-if="geo.geoLocation.asn.type">
        ASN Type: <span> {{ geo.geoLocation.asn.type }}</span>
      </p>
    </div>

    <p v-if="geo.geoLocation.ip">
      IP Address: <span> {{ geo.geoLocation.ip }}</span>
    </p>

    <div v-if="geo.geoLocation.time_zone">
      <p style="text-align: center;"><span> Time Zone</span></p>

      <p v-if="geo.geoLocation.time_zone.name">
        Zone Name: <span> {{ geo.geoLocation.time_zone.name }}</span>
      </p>
      <p v-if="geo.geoLocation.time_zone.abbr">
        Time Zone: <span> {{ geo.geoLocation.time_zone.abbr }}</span>
      </p>
      <p v-if="geo.geoLocation.time_zone.current_time">
        Current Time/Last Seen:
        <span>
          {{ new Date(geo.geoLocation.time_zone.current_time).toString() }}
        </span>
      </p>
      <p v-if="geo.geoLocation.time_zone.offset">
        Time Plus: <span> {{ geo.geoLocation.time_zone.offset }}</span>
      </p>
    </div>

    <div v-if="geo.geoLocation.currency">
      <p style="text-align: center;"><span> Currency</span></p>
      <p v-if="geo.geoLocation.country_code">
        Currency Code: <span> {{ geo.geoLocation.country_code }}</span>
      </p>
      <p v-if="geo.geoLocation.currency.name">
        Currency Name: <span> {{ geo.geoLocation.currency.name }}</span>
      </p>
      <p v-if="geo.geoLocation.currency.plural">
        Currency Plural: <span> {{ geo.geoLocation.currency.plural }}</span>
      </p>
      <p v-if="geo.geoLocation.currency.native">
        Currency Native: <span> {{ geo.geoLocation.currency.native }}</span>
      </p>
      <p v-if="geo.geoLocation.currency.symbol">
        Currency Symbol: <span> {{ geo.geoLocation.currency.symbol }}</span>
      </p>
      <p v-if="geo.geoLocation.currency.code">
        Currency Code: <span> {{ geo.geoLocation.currency.code }}</span>
      </p>
    </div>
    <p v-if="geo.geoLocation.latitude">
      Latitude: <span> {{ geo.geoLocation.latitude }}</span>
    </p>
    <p v-if="geo.geoLocation.longitude">
      Longitude: <span> {{ geo.geoLocation.longitude }}</span>
    </p>
  </div>
</template>

<script>
import getProfile from "@/composable/getProfile.js";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  props: ["id", "geo"],
  setup(props) {
    // const { info } = getProfile("profiles", props.id);
    // const newI = ref(null);
    // watch(info, (newInfo) => {
    //   newI.value = newInfo;
    // });
    // return { info, newI };
  },
};
</script>

<style lang="scss" scoped>
.g-flags {
  display: flex;
  justify-content: space-between;
}
p {
  font-weight: bold;
}
span {
  font-weight: normal;
}
</style>
