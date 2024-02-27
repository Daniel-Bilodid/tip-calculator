Vue.createApp({
  data() {
    return {
      percentages: [5, 10, 15, 25, 50],
      activePercentage: null,
      bill: null,
      tip: 0,
      total: 0,
      people: null,
      custom: null,
      inputValue: "",
    };
  },

  watch: {
    bill: "calculateTotal",
    custom: "customCalculate",
    people: "calculateTotal",
  },

  methods: {
    customCalculate() {
      if (this.custom) {
        this.activePercentage = null;

        this.tip = this.total * (this.custom / 100);
        this.tip = this.tip.toFixed(2);
      }
    },
    validateInput() {
      const cleanedValue = this.people.replace(/\D/g, "");

      if (this.people !== cleanedValue) {
        this.people = this.people.replace(/\D/g, "");
        this.inputError = true;
      } else {
        this.inputError = false;
      }
    },

    validateInputTotal() {
      const cleanedValue = this.bill.replace(/\D/g, "");

      if (this.bill !== cleanedValue) {
        this.bill = this.bill.replace(/\D/g, "");
        this.inputErrorTotal = true;
      } else {
        this.inputErrorTotal = false;
      }
    },

    calculateTotal() {
      if (this.bill && this.people) {
        this.total = this.bill / this.people;
      }
    },
    handleButtonClick(event) {
      const target = event.target;
      const percentage = parseInt(target.getAttribute("data-percentage"));

      if (percentage) {
        this.custom = null;

        this.activePercentage = percentage;

        this.tip = this.total * (percentage / 100);
        this.tip = this.tip.toFixed(2);
      }
    },
    resetCalc() {
      this.tip = 0;
      this.total = 0;
      this.bill = 0;
      this.people = 0;
      this.activePercentage = null;
      this.custom = null;
    },
    // customPercentage() {
    //   this.tip = this.total * (this.custom / 100);
    //   this.tip = this.tip.toFixed(2);
    // },
  },
}).mount("#app");
