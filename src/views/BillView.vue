<template>
  <v-data-table
    :headers="headers"
    :items="bill"
    :sort-by="['status']"
    :sort-desc="[true]"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Bill</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogPay" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to Pay?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closePay">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="payItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        v-if="item.status == 'UNPAID'"
        small
        class="mr-2"
        @click="payItem(item)"

      >
        Pay
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      dialogPay: false,
      headers: [
        // {
        //   text: 'Id',
        //   align: 'start',
        //   value: 'id',
        // },
        { text: 'Year - Month', value: 'date' },
        { text: 'Status', value: 'status' },
        { text: 'Address', value: 'residence.address' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      // bill: [],
      editedIndex: -1,
      editedItem: {
        date: '',
        status: 0,
        address: 0,
      },
      defaultItem: {
        date: '',
        status: 0,
        address: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      bill() {
        const billGlobal = this.$store.state.bill.bill;
        const bill = billGlobal.map((item) => {
          // date
          const date = new Date(item.date);
          const year = date.getFullYear();
          const monthName = date.toLocaleString('default', { month: 'long' });
          item.date = `${year} - ${monthName}`;
          // status
          item.status = item.status === 0 ? 'UNPAID' : 'PAID';
          return item
        });
        return bill;
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      dialogPay (val) {
        val || this.closePay()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$store.dispatch('bill/fetchBill');
      },

      editItem (item) {
        this.editedIndex = this.bill.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.bill.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      payItem (item) {
        this.editedIndex = this.bill.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogPay = true
      },

      deleteItemConfirm () {
        this.bill.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      payItemConfirm () {
        this.$store.dispatch("bill/payBill", this.editedItem.id)
        this.closePay()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closePay () {
        this.dialogPay = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.initialize()
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.bill[this.editedIndex], this.editedItem)
        } else {
          this.bill.push(this.editedItem)
        }
        this.close()
      },
    },
    mounted() {
      if (!this.$store.state.user.isLogin) {
        this.$router.replace({ name: 'login' });
      }
    }
  }
</script>