<template>
  <v-data-table
    :headers="headers"
    :items="bill"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Residence</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <v-dialog
          v-model="dialogCreate"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Residence
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.address"
                      label="Address"
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
                @click="closeCreate"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="saveCreate"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
                  >
                    <v-select
                      v-model="selectedUser"
                      :items="dropdownUser"
                      label="Select Residents"
                    ></v-select>
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
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-account
      </v-icon>

      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
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
      dialogCreate: false,
      dialogDelete: false,
      dialogPay: false,
      headers: [
        // {
        //   text: 'Id',
        //   align: 'start',
        //   value: 'id',
        // },
        { text: 'Address', value: 'address' },
        { text: 'Residents', value: 'user.username' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      // bill: [],
      editedIndex: -1,
      editedItem: {
        address: '',
      },
      defaultItem: {
        address: '',
      },
      selectedUser: null,
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Residence' : 'Set Residents'
      },
      bill() {
        const list = this.$store.state.residence.list;
        const result = list.map((item) => {
          // status
          item.status = item.status === 0 ? 'UNOCCUPIED' : 'OCCUPIED';
          return item
        });
        return result;
      },
      dropdownUser() {
        const list = this.$store.state.user.user;
        const result = list.map((item) => {
          item.text = item.username;
          item.value = item.id;

          return item
        });
        return result;
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
        this.$store.dispatch('residence/fetchList');
      },

      editItem (item) {
        this.editedIndex = this.bill.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.getListUser()
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
        // this.bill.splice(this.editedIndex, 1)
        this.$store.dispatch("residence/deleteResidence", { id: this.editedItem.id })
        this.closeDelete()
      },

      payItemConfirm () {
        this.$store.dispatch("bill/payBill", this.editedItem.id)
        this.closePay()
      },

      getListUser () {
        this.$store.dispatch("user/getUser")
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.initialize()
        })
      },

      closeCreate () {
        this.dialogCreate = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.initialize()
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.initialize()
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
        this.$store.dispatch("residence/setResidents", {
          id: this.editedItem.id, 
          userId: this.selectedUser
        })
        this.close()
      },

      saveCreate () {
        this.$store.dispatch("residence/createResidence", {
          address: this.editedItem.address
        })
        this.closeCreate()
      },
    },
    mounted() {
      if (!this.$store.state.user.isLogin) {
        this.$router.replace({ name: 'login' });
      }
    }
  }
</script>