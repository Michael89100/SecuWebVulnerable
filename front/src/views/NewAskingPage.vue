<template>
    <div class="flex justify-content-center align-items-center min-vh-100 mt-8">
        <Card class="form-card">
            <template #title>
                <h2 class="text-center">Formulaire</h2>
            </template>
            <template #content>
                <form @submit.prevent="submitForm">
                    <div class="p-fluid">
                        <div class="p-field">
                            <label for="title">Title</label>
                            <InputText id="title" v-model="form.title" />
                        </div>

                        <div class="p-field">
                            <label for="description">Description</label>
                            <Textarea id="description" v-model="form.description" rows="4" />
                        </div>

                        <h3>Choisir un créneau</h3>
                        <div class="timeslots">
                            <div
                                v-for="timeslot in timeslots"
                                :key="timeslot.start_date"
                                :class="{'timeslot': true, 'selected': selectedTimeslot === timeslot.start_date}"
                                @click="selectTimeslot(timeslot)">
                                {{ timeslot.display }}
                            </div>
                        </div>

                        <Button label="Soumettre" type="submit" class="p-mt-3 p-button-primary submit-button" />
                    </div>
                </form>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { useAskingStore } from "@/stores/askingStore.ts";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const mentor_id = ref(route.params.mentor_id).value


const form = ref({
    title: '',
    description: '',
    start_date: ''
});

const timeslots = ref([]);
const selectedTimeslot = ref('');
const askingStore = useAskingStore();

const fetchTakenTimeslots = async () => {
    try {
        await askingStore.askingByMentorId(mentor_id);
        const takenTimeslots = askingStore.mentorAsking.map(asking => ({
            start_date: new Date(new Date(asking.start_date).getTime() - 2 * 60 * 60 * 1000),
            end_date: new Date(new Date(asking.end_date).getTime() - 2 * 60 * 60 * 1000)
        }));
        generateAvailableTimeslots(takenTimeslots);
    } catch (error) {
        console.error('Error fetching taken timeslots:', error);
    }
};

const generateAvailableTimeslots = (takenTimeslots) => {
    const timeslotDuration = 60 * 60 * 1000;
    const availableTimeslots = [];
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(8, 0, 0, 0);

    while (availableTimeslots.length < 15) {
        if ((currentDate.getHours() >= 8 && currentDate.getHours() < 12) || (currentDate.getHours() >= 13 && currentDate.getHours() < 18)) {
            const endOfTimeslot = new Date(currentDate.getTime() + timeslotDuration);
            if (!takenTimeslots.some(slot => slot.start_date.getTime() === currentDate.getTime())) {
                availableTimeslots.push({
                    start_date: currentDate.toISOString(),
                    end_date: endOfTimeslot.toISOString(),
                    display: `${currentDate.toLocaleDateString()} ${currentDate.getHours()}h à ${endOfTimeslot.getHours()}h`
                });
            }
        }

        currentDate.setTime(currentDate.getTime() + timeslotDuration);

        if (currentDate.getHours() >= 18) {
            currentDate.setDate(currentDate.getDate() + 1);
            currentDate.setHours(8, 0, 0, 0);
        }
    }

    timeslots.value = availableTimeslots;
};

const selectTimeslot = (timeslot) => {
    const startDate = new Date(timeslot.start_date);
    startDate.setTime(startDate.getTime() + 2 * 60 * 60 * 1000);
    form.value.start_date = startDate.toISOString();
    selectedTimeslot.value = timeslot.start_date;
};

onMounted(fetchTakenTimeslots);

const submitForm = async () => {
    const transformedForm = {
        ...form.value,
        mentor_id: mentor_id,
    };
    try {
        await askingStore.newAsking(transformedForm);
        await router.push('/my-profil')
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};
</script>

<style scoped>
.form-card {
    width: 60vw;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
}

.text-center {
    text-align: center;
    color: #333;
}

.submit-button {
    width: 100%;
    margin-top: 30px;
}

button {
    width: 100%;
}

.min-vh-100 {
    min-height: 100vh;
}

.timeslots {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
}

.timeslot {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
}

.timeslot:hover {
    background-color: #f0f0f0;
}

.selected {
    background-color: #cce5ff;
}
</style>
