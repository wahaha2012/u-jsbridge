<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="register">Click Register Event</button>
    <button @click="emit">Click Emit Event</button>
    <p>{{registerStatus}}</p>
    <p>{{emitMsg}}</p>
  </div>
</template>

<script>
import jsBridge from '@/bridge/';

export default {
  name: 'hello',
  data() {
    return {
      msg: 'jsBridge demo in Vue',
      emitMsg: '',
      registerStatus: ''
    };
  },
  methods: {
    register() {
      jsBridge.call('helloWorld', (data) => {
        this.updateMsg(data);
      });
      this.updateEventStatus();
    },
    emit() {
      jsBridge.emit('helloWorld', {
        hello: 'bridge world'
      });
    },
    updateEventStatus() {
      this.registerStatus = 'bridge call sent and event registered';
      console.log('call jsBridge');
    },
    updateMsg(data) {
      console.log('bridge data:', data);
      // this.registerStatus = 'event unregistered';
      this.emitMsg = data;

      setTimeout(()=>{
        this.emitMsg = '';
      }, 2000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
