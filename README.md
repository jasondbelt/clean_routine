# 🧼 Routine Clean

**Routine Clean** is a simple app that offers a stress-free way to keep your home tidy without the overwhelm.

Most people clean reactively—waiting until messes pile up—making the process exhausting and never-ending. Routine Clean helps you take control with easy daily systems and routines that match your lifestyle, reduce stress, and make your space feel cozy and clean.

---

## ✨ Features

- ✅ Add, edit, and delete rooms and their associated tasks  
- 📅 View a personalized cleaning schedule by day of the week  
- 🌦️ Check local weather by city to better plan your chores  
- 💬 Get motivational quotes to keep you inspired  
- 🔐 Secure authentication using JWT tokens  

---

## 🛠 Tech Stack

### Backend

Built with **Django + Django REST Framework**
and utilizes PostgreSQL

#### Dependencies (`requirements.txt`)

```
asgiref==3.8.1  
certifi==2025.1.31  
charset-normalizer==3.4.1  
Django==5.2  
django-cors-headers==4.7.0  
djangorestframework==3.16.0  
djangorestframework_simplejwt==5.5.0  
idna==3.10  
oauthlib==3.2.2  
pillow==11.2.1  
psycopg==3.2.6  
psycopg-binary==3.2.6  
PyJWT==2.9.0  
python-dotenv==1.1.0  
requests==2.32.3  
requests-oauthlib==2.0.0  
sqlparse==0.5.3  
urllib3==2.3.0
```

#### Installation

```bash
git clone https://github.com/jasondbelt/clean_routine.git
cd clean_routine
python -m venv venv
source venv/bin/activate     # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

---

### Frontend

Built with **React** and **Chakra UI**

#### Dependencies

```bash
npm install \
@chakra-ui/react@^2.10.7 \
@emotion/react@^11.14.0 \
@emotion/styled@^11.14.0 \
axios@^1.8.4 \
bootstrap@^5.3.5 \
framer-motion@^12.6.3 \
js-cookie@^3.0.5 \
react@^19.0.0 \
react-bootstrap@^2.10.9 \
react-dom@^19.0.0 \
react-icons@^5.5.0 \
react-router-dom@^7.5.0
```

---

## 🔗 Third-Party APIs

- **Quotes API** – [https://qapi.vercel.app](https://qapi.vercel.app)  
- **OpenWeatherMap API** – [https://openweathermap.org/api](https://openweathermap.org/api)

---

## 📄 Available Pages

### Public Pages

- **HomePage** – Displays inspirational quotes using the Free Quotes API  
- **AboutPage** – Highlights user features  
- **Login / Register Pages**  
- **Error404Page**

### Protected Pages (require login)

- **AddRoomsPage** – Create, view, update, and delete rooms  
- **AddTasksPage** – Manage tasks tied to each room also utilizes CRUD.  
- **SchedulePage** – View tasks by day of the week  
- **WeatherPage** – Search and view weather by city using OpenWeatherMap API  

---

## 🔧 Core Components

- **NavBar** – Dynamically updates links based on login status  
- **Protected Routes** – For unauthenticated users, pages requiring user authentication are automatically redirected to login page  

---

## 🚀 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📫 Contact

Created with 💙 by [@jasondbelt](https://github.com/jasondbelt)
