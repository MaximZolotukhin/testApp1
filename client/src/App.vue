<script>
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      dataLeads: null,
      pipelines: null,
      users: null,
    }
  },
  methods: {
    async getDataLeads() {
      try {
        const response = await axios.get('http://localhost:3001/api/leads')
        this.dataLeads = response.data.leads // Обновляем данные в `dataLeads`
        console.log('Данные по лидам успешно получены')
      } catch (error) {
        console.error(error)
      }
    },
    async getPiplines() {
      try {
        const response = await axios.get('http://localhost:3001/apiPipelines')
        this.pipelines = response.data.pipelines[0]._embedded.statuses
        console.log('Данные по статусам успешно получены')
      } catch (error) {
        console.error(error)
      }
    },
    async getUsers() {
      try {
        const response = await axios.get('http://localhost:3001/apiUsers')
        this.users = response.data.users
        console.log('Данные по пользователям успешно получены')
        console.log(this.users)
      } catch (error) {
        console.error(error)
      }
    },
    formattedDate(date) {
      let readyDate = dayjs(date * 1000).format('YYYY-MM-DD HH:mm:ss')
      return readyDate
    },
  },
  mounted() {
    this.getPiplines()
    this.getDataLeads()
    this.getUsers()
  },
}

// users.find((value) => leads.responsible_user_id === value.id).name
</script>

<template>
  <div class="container">
    <h2>Тестовое задание</h2>
    <table class="leads_table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Бюджет</th>
          <th>Статус</th>
          <th>Ответвенный</th>
          <th>Дата создания</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="leads in dataLeads" :key="leads.id">
          <td>{{ leads.name === undefined ? '' : leads.name }}</td>
          <td>{{ leads.price }}</td>
          <td>
            {{ pipelines.find((value) => value.id === leads.status_id).name }}
          </td>
          <td>{{ users.find((value) => leads.responsible_user_id === value.id).name }}</td>
          <td>{{ formattedDate(leads.created_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
