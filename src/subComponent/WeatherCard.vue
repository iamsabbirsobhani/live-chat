<template>
  <div v-if="cityName && cityTemp">
    <h2>{{ greetings }} {{ user.displayName }}</h2>
    <div class="card">
      <div class="first">
        <img :src="flag" alt="" />
        <h3>{{ country }}</h3>
        <h4>{{ cityName }}</h4>
        <h4>{{ region }}</h4>
        <h4>Postal code: {{ postal }}</h4>
      </div>
      <div class="second">
        <div class="temp-data">
          <lottie-player
            src="https://assets4.lottiefiles.com/temp/lf20_rpC1Rd.json"
            background="transparent"
            speed="1"
            style="height: 50px;"
            loop
            autoplay
          ></lottie-player>
          <h1 style="text-align: right;">{{ Math.ceil(cityTemp) }}&#176;C</h1>
        </div>
        <p>{{ timeCurrent }}</p>
        <Button
          label="More Info?"
          @click="openMaximizable"
          class="p-button-info"
        />
      </div>
    </div>
    <Dialog
      :header="user.displayName"
      v-model:visible="displayMaximizable"
      :style="{ width: '90vw' }"
      :maximizable="true"
      :modal="true"
    >
      <div class="p-m-0">
          <p>{{ wStatus }}</p>
        <p>
          Your continent: <span>{{ continentName }}</span>
        </p>
        <p>
          Your calling code: <span>{{ `+${callingCode}` }}</span>
        </p>
        <p>
          Language: <span>{{ lang }}</span>
        </p>
        <p>
          Native Language: <span>{{ langNative }}</span>
        </p>
        <p>
          Time Name: <span>{{ timeName }}</span>
        </p>
        <p>
          Time Zone: <span>{{ timeZone }}</span>
        </p>
        <p>
          Currency Name: <span> {{ crName }}</span>
        </p>
        <p>
          Currency Code: <span> {{ crCode }}</span>
        </p>
        <p>
          Currency Symbol: <span> {{ crSymbol }}</span>
        </p>
        <p>
          Currency Native: <span> {{ crNative }} </span>
        </p>
        <p>
          Currency Plural: <span> {{ crPlural }}</span>
        </p>
        <p>
          ip address: <span>{{ ip }}</span>
        </p>
        <p>
          Your autonomous system number(ASN): <span>{{ asn }}</span>
        </p>
        <p>
          Your ASN name : <span>{{ asnName }}</span>
        </p>
        <p>
          Your ASN route : <span>{{ asnRoute }}</span>
        </p>
        <p>
          Your latitude: : <span>{{ latitude }}</span>
        </p>
        <p>
          Your longitude: : <span>{{ longitude }}</span>
        </p>
      </div>
      <template #footer>
        <Button
          label="Okay"
          icon="pi pi-check"
          @click="closeMaximizable"
          autofocus
        />
      </template>
    </Dialog>
  </div>
  <el-skeleton style="margin: auto;" v-else />
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { format } from "date-fns";
import getUser from "@/composable/getUser.js";
import Dialog from "primevue/dialog";

export default {
  components: { Dialog },
  setup() {
    const { user } = getUser();
    const greetings = ref(null);
    //   weather variables
    const cityName = ref(null);
    const cityTemp = ref(null);
    const sunrise = ref(null);
    const sunset = ref(null);
    const wStatus = ref(null);
    const wDescription = ref(null);
    const wIcon = ref(null);

    const displayMaximizable = ref(false);

    // geoLocation ipdata variables
    const country = ref(null);
    const flag = ref(null);
    const lang = ref(null);
    const langNative = ref(null);
    const region = ref(null);
    const continentName = ref(null);
    const ip = ref(null);
    const postal = ref(null);
    const callingCode = ref(null);

    const timeName = ref(null);
    const timeZone = ref(null);
    const timeCurrent = ref(null);
    const crName = ref(null);
    const crCode = ref(null);
    const crSymbol = ref(null);
    const crNative = ref(null);
    const crPlural = ref(null);

    const asn = ref(null);
    const asnName = ref(null);
    const asnRoute = ref(null);

    const latitude = ref(null);
    const longitude = ref(null);
    onMounted(() => {
      // https://home.openweathermap.org/ I have account
      fetch(
        "https://api.ipdata.co/?api-key=037253635bedffc03ba3dd3073b737ffdde4fbed82b1abac868bc363"
      )
        .then((res) => res.json())
        .then((data) => {
          // enter you logic when the fetch is successful
          // console.log(data.latitude);
          // console.log(data.longitude);
          console.log(data);
          country.value = data.country_name;
          flag.value = data.flag;
          lang.value = data.languages[0].name;
          langNative.value = data.languages[0].native;
          timeName.value = data.time_zone.name;
          timeZone.value = data.time_zone.abbr;
          timeCurrent.value = format(
            new Date(data.time_zone.current_time),
            "PPp"
          );

          if (
            timeCurrent.value.includes(`AM`) &&
            new Date().getHours() < 12 &&
            new Date().getHours() > 6
          ) {
            console.log("Good Morning");
            greetings.value = `Good Morning!`;
          } else if (
            timeCurrent.value.includes(`PM`) &&
            new Date().getHours() > 12 &&
            new Date().getHours() < 15
          ) {
            console.log("Good Noon");
            greetings.value = `Good Noon`;
          } else if (
            timeCurrent.value.includes(`PM`) &&
            new Date().getHours() > 15 &&
            new Date().getHours() < 17
          ) {
            console.log("Good After Noon");
            greetings.value = `Good Afternoon!`;
          } else if (
            timeCurrent.value.includes(`PM`) &&
            new Date().getHours() > 17 &&
            new Date().getHours() < 20
          ) {
            greetings.value = `Good Evening!`;
            console.log("Good Evening");
          } else {
            greetings.value = `Good Night!`;
            console.log("Good night");
          }
          crName.value = data.currency.name;
          crCode.value = data.currency.code;
          crSymbol.value = data.currency.symbol;
          crNative.value = data.currency.native;
          crPlural.value = data.currency.plural;
          region.value = data.region;
          ip.value = data.ip;
          continentName.value = data.continent_name;
          postal.value = data.postal;
          callingCode.value = data.calling_code;
          asn.value = data.asn.asn;
          asnName.value = data.asn.name;
          asnRoute.value = data.asn.route;
          latitude.value = data.latitude;
          longitude.value = data.longitude;

          // ipdata.co I have account
          return fetch(
            // `https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&appid=f4160958e410ad8ae77d0e3b11368deb`
            `https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&units=metric&appid=f4160958e410ad8ae77d0e3b11368deb`
          );
        })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cityName.value = data.name;
          cityTemp.value = data.main.temp;
          wStatus.value = data.weather.main;
          wDescription.value = data.weather.description;
          wIcon.value = data.weather.icon;
          sunrise.value = format(new Date(data.sys.sunrise), "PPp");
          sunset.value = format(new Date(data.sys.senset), "PPp");
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    const openMaximizable = () => {
      displayMaximizable.value = true;
    };
    const closeMaximizable = () => {
      displayMaximizable.value = false;
    };

    return {
      region,
      ip,
      continentName,
      postal,
      callingCode,
      cityName,
      country,
      flag,
      langNative,
      lang,

      greetings,

      asn,
      asnName,
      asnRoute,
      latitude,
      longitude,

      timeName,
      timeZone,
      timeCurrent,

      crName,
      crCode,
      crSymbol,
      crNative,
      crPlural,

      cityTemp,

      user,

      openMaximizable,
      closeMaximizable,
      displayMaximizable,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

.card {
  font-family: "Roboto", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.p-button-info {
  width: 100%;
}

.temp-data {
  display: flex;
  align-items: center;
  justify-content: center;
}

.first {
  line-height: 0.4;
  h4 {
    font-weight: normal;
  }
}
.second {
  line-height: 0.4;
  p {
    font-weight: bold;
  }
}

h2 {
  font-family: "Roboto", sans-serif;
  text-align: center;
  color: rgba(0, 57, 80, 0.397);
}

.p-m-0 {
  line-height: 1.3;
  p {
    font-weight: bold;
    font-size: 18px;
    color: rgb(66, 66, 66);
  }
  span {
    font-weight: normal;
    color: rgb(202, 125, 10);
  }
}
@media (max-width: 600px) {
  .first {
    line-height: 0.4;
    h4 {
      font-weight: normal;
    }
  }
  .second {
    line-height: 0.4;
    p {
      font-size: 12px;
    }
  }
}
</style>
