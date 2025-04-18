//ROOM_TASKS.jsx
// NOTE: NOT UTILIZED HERE, 
// DECIDED TO RE-DEFINE AND UTILIZE BACKEND ROUTES ON ROOMS/CALENDAR PAGES
// import axios from 'axios'

// define base urls for rooms and tasks from backend API
const BASE_URL = 'http://127.0.0.1:8000/'
const BASE_ROOMS_URL = `${BASE_URL}api/rooms/`
// path('roomname/<str:room_name>/', A_room.as_view(), name='room'),
const BASE_TASKS_URL = `${BASE_URL}/api/tasks/`
// path('day/<str:day>/', Tasks_by_day.as_view(), name='tasks_by_day'),
// path('room_id/<int:room_id>/', CR_all_room_tasks.as_view(), name='cr_all_room_tasks'),
// path('room_id/<int:room_id>/task_id/<int:task_id>/', RUD_room_tasks.as_view(), name='ud_room_tasks')